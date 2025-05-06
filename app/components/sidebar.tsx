"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  BookOpen,
  Search,
  FileText,
  X,
  Plus,
  Sparkles,
  BookMarked,
  Layers,
  ChevronDown,
  Zap,
  User2,
  Settings,
  LogOut,
  MessageSquare,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

type SidebarProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isMobile: boolean
  createNewChat: () => void
  conversations: {
    today: Conversation[]
    yesterday: Conversation[]
    previousDays: Conversation[]
  }
  activeConversation: Conversation | null
  selectConversation: (conversation: Conversation) => void
}

type Conversation = {
  id: string
  title: string
  messages: any[]
  lastUpdated: Date
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
  createNewChat,
  conversations,
  activeConversation,
  selectConversation,
}: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredConversations, setFilteredConversations] = useState(conversations)
  const [isSearching, setIsSearching] = useState(false)

  // Filter conversations based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(conversations)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = {
      today: conversations.today.filter((convo) => convo.title.toLowerCase().includes(query)),
      yesterday: conversations.yesterday.filter((convo) => convo.title.toLowerCase().includes(query)),
      previousDays: conversations.previousDays.filter((convo) => convo.title.toLowerCase().includes(query)),
    }

    setFilteredConversations(filtered)
  }, [searchQuery, conversations])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("chatgpt_user_logged_in")
    localStorage.removeItem("chatgpt_user_id")
    localStorage.removeItem("chatgpt_user_name")
    localStorage.removeItem("chatgpt_user_email")
    router.push("/login")
  }

  // Get user info from localStorage
  const userName = typeof window !== "undefined" ? localStorage.getItem("chatgpt_user_name") || "User" : "User"
  const userEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("chatgpt_user_email") || "user@example.com"
      : "user@example.com"

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 dark:bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative z-30 md:z-auto w-[280px] md:w-64 flex flex-col border-r border-gray-700/50 dark:border-gray-700/50 border-gray-200/70 h-full bg-gray-50 dark:bg-gray-900/90 backdrop-blur-sm transition-all duration-300 ease-in-out`}
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200">
              <BookOpen className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <button
                className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200"
                onClick={() => setIsSearching(!isSearching)}
              >
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200">
                <FileText className="h-5 w-5" />
              </button>
              <ThemeToggle />
              <button
                className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {isSearching && (
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            className="w-full p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20 transition-all duration-200 transform hover:scale-[1.02]"
            onClick={createNewChat}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>New chat</span>
          </button>

          <div className="space-y-2">
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>ChatGPT</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <div className="flex items-center p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200">
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mr-2"></div>
              <span>GPT-4o</span>
            </div>

            <div className="flex items-center p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <BookMarked className="h-5 w-5 mr-2 text-emerald-400" />
                  <span>Library</span>
                </div>
                <span className="text-xs bg-gray-300 dark:bg-gray-700 px-1.5 py-0.5 rounded-full text-gray-700 dark:text-gray-300">
                  3
                </span>
              </div>
            </div>

            <div className="flex items-center p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200">
              <div className="flex items-center">
                <Layers className="h-5 w-5 mr-2 text-indigo-400" />
                <span>Explore GPTs</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
          {/* Today's conversations */}
          {filteredConversations.today.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Today</h3>
              {filteredConversations.today.map((convo) => (
                <div
                  key={convo.id}
                  className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeConversation?.id === convo.id
                      ? "bg-gradient-to-r from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-700/80 shadow-md"
                      : "hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => selectConversation(convo)}
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <span className="truncate">{convo.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Yesterday's conversations */}
          {filteredConversations.yesterday.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Yesterday</h3>
              {filteredConversations.yesterday.map((convo) => (
                <div
                  key={convo.id}
                  className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeConversation?.id === convo.id
                      ? "bg-gradient-to-r from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-700/80 shadow-md"
                      : "hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => selectConversation(convo)}
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <span className="truncate">{convo.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Previous 7 days */}
          {filteredConversations.previousDays.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Previous 7 Days</h3>
              {filteredConversations.previousDays.map((convo) => (
                <div
                  key={convo.id}
                  className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeConversation?.id === convo.id
                      ? "bg-gradient-to-r from-gray-200/80 to-gray-300/80 dark:from-gray-800/80 dark:to-gray-700/80 shadow-md"
                      : "hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => selectConversation(convo)}
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <span className="truncate">{convo.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {searchQuery &&
            filteredConversations.today.length === 0 &&
            filteredConversations.yesterday.length === 0 &&
            filteredConversations.previousDays.length === 0 && (
              <div className="py-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200/50 dark:bg-gray-800/50 mb-4">
                  <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No conversations found</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Clear search
                </button>
              </div>
            )}
        </div>

        {/* Upgrade plan */}
        <div className="p-3 border-t border-gray-200/70 dark:border-gray-700/50">
          <div className="flex items-center p-2 rounded-lg bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-700/50 hover:from-gray-200/50 hover:to-gray-300/50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-colors duration-200">
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-400" />
              <div>
                <div className="text-sm font-medium">Upgrade plan</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">More access to the best models</div>
              </div>
            </div>
          </div>
        </div>

        {/* User profile */}
        <div className="p-3 border-t border-gray-200/70 dark:border-gray-700/50">
          <div className="relative">
            <button
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-2">
                <span className="text-sm font-medium text-white">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{userName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isProfileMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Profile dropdown menu */}
            {isProfileMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200/70 dark:border-gray-700/50 z-10 animate-fadeIn">
                <div className="p-1">
                  <Link
                    href="/my-account"
                    className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User2 className="h-4 w-4 mr-2" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                  <button
                    className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
