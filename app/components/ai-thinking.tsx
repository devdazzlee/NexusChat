"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain } from "lucide-react"

interface AIThinkingProps {
  isThinking: boolean
  message?: string
}

export function AIThinking({ isThinking, message = "Thinking..." }: AIThinkingProps) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    if (!isThinking) return

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isThinking])

  return (
    <AnimatePresence>
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 rounded-lg px-3 py-2 max-w-max"
        >
          <Brain className="h-4 w-4 animate-pulse" />
          <span>
            {message}
            <span className="inline-block w-6">{dots}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
