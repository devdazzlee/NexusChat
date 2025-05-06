"use client"

import { useState, useEffect, useRef } from "react"
import { Command } from "cmdk"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Settings, User2, LogOut, MessageSquare, HelpCircle, FileText, Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/app/theme-provider"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  createNewChat: () => void
}

export function CommandPalette({ isOpen, onClose, createNewChat }: CommandPaletteProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          document.dispatchEvent(new CustomEvent("open-command-palette"))
        }
      }

      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, onClose])

  // Focus the input when the command palette is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSelect = (id: string) => {
    switch (id) {
      case "new-chat":
        createNewChat()
        break
      case "settings":
        router.push("/settings")
        break
      case "account":
        router.push("/my-account")
        break
      case "logout":
        localStorage.removeItem("chatgpt_user_logged_in")
        router.push("/login")
        break
      case "toggle-theme":
        setTheme(theme === "dark" ? "light" : "dark")
        break
      case "help":
        router.push("/help")
        break
      case "terms":
        router.push("/terms")
        break
      case "privacy":
        router.push("/privacy")
        break
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-xl rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
              <Command
                filter={(value, search, keywords) => {
                  if (value.toLowerCase().includes(search.toLowerCase())) return 1
                  return 0
                }}
              >
                <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                  <div className="flex items-center">
                    <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <Command.Input
                      ref={inputRef}
                      value={search}
                      onValueChange={setSearch}
                      placeholder="Search commands..."
                      className="w-full bg-transparent outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
                    />
                    <div className="ml-2 flex items-center gap-1">
                      <kbd className="hidden sm:inline-flex h-5 w-5 items-center justify-center rounded border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
                        ⌘
                      </kbd>
                      <kbd className="hidden sm:inline-flex h-5 w-5 items-center justify-center rounded border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
                        K
                      </kbd>
                    </div>
                  </div>
                </div>
                <Command.List className="max-h-[60vh] overflow-y-auto py-2 px-3">
                  <Command.Empty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    No results found.
                  </Command.Empty>

                  <Command.Group className="" heading="Actions">
                    <Command.Item
                      value="new-chat"
                      onSelect={() => handleSelect("new-chat")}
                      className="px-4 py-2 mx-2 rounded-md flex items-center gap-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    >
                      <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>New Chat</span>
                    </Command.Item>
                    <Command.Item
                      value="toggle-theme"
                      onSelect={() => handleSelect("toggle-theme")}
                      className="px-4 py-2 mx-2 rounded-md flex items-center gap-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    >
                      {theme === "dark" ? (
                        <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      )}
                      <span>Toggle Theme</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Navigation">
                    <Command.Item
                      value="settings"
                      onSelect={() => handleSelect("settings")}
                      className="px-4 py-2 mx-2 rounded-md flex items-center gap-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    >
                      <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>Settings</span>
                    </Command.Item>
                    <Command.Item
                      value="account"
                      onSelect={() => handleSelect("account")}
                      className="px-4 py-2 mx-2 rounded-md flex items-center gap-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    >
                      <User2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>My Account</span>
                    </Command.Item>
                    <Command.Item
                      value="help"
                      onSelect={() => handleSelect("help")}
                      className="px-4 py-2 mx-2 rounded-md flex items-center gap-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    >
                      <HelpCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>Help Center</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Legal">
                    <Command.Item
                      value="terms"
                      onSelect={() => handleSelect("terms")}
                      className="px-4 py-2 mx-2 rounded-md flex items-center gap-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    >
                      <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>Terms of Service</span>
                    </Command.Item>
                    <Command.Item
                      value="privacy"
                      onSelect={() => handleSelect("privacy")}
                      className="px-4 py-2 mx-2 rounded-md flex items-center gap-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    >
                      <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>Privacy Policy</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Account">
                    <Command.Item
                      value="logout"
                      onSelect={() => handleSelect("logout")}
                      className="px-4 py-2 mx-2 rounded-md flex items-center gap-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    >
                      <LogOut className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>Logout</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <span>Tip: Press </span>
                      <kbd className="inline-flex h-5 items-center justify-center rounded border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 px-1 text-xs">
                        Tab
                      </kbd>
                      <span> to navigate and </span>
                      <kbd className="inline-flex h-5 items-center justify-center rounded border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 px-1 text-xs">
                        Enter
                      </kbd>
                      <span> to select</span>
                    </div>
                    <div>
                      <span>Press </span>
                      <kbd className="inline-flex h-5 items-center justify-center rounded border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 px-1 text-xs">
                        Esc
                      </kbd>
                      <span> to close</span>
                    </div>
                  </div>
                </div>
              </Command>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
