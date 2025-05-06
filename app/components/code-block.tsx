"use client"

import { useState, useRef } from "react"
import { Check, Copy, Download } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "@/app/theme-provider"
import { Tooltip } from "./tooltip"

interface CodeBlockProps {
  code: string
  language: string
  fileName?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language, fileName, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = fileName || `code-snippet.${language}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="group relative rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden my-4">
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{fileName}</div>
          <div className="flex items-center space-x-2">
            <Tooltip content="Copy code">
              <button
                onClick={handleCopy}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Copy code"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </Tooltip>
            <Tooltip content="Download">
              <button
                onClick={handleDownload}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Download code"
              >
                <Download className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      )}
      <div ref={codeRef} className="relative">
        <SyntaxHighlighter
          language={language}
          style={theme === "dark" ? vscDarkPlus : vs}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            borderRadius: fileName ? "0" : "0.5rem",
          }}
        >
          {code}
        </SyntaxHighlighter>

        {!fileName && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Tooltip content={copied ? "Copied!" : "Copy code"}>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md bg-gray-800/80 dark:bg-gray-700/80 text-white hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Copy code"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  )
}
