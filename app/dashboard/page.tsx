"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  ImageIcon,
  MoreHorizontal,
  Mic,
  ChevronDown,
  Send,
  X,
  Settings,
  File,
  Paperclip,
  Menu,
  MicOff,
  Sparkles,
  Code,
  FileAudio,
  Database,
  BarChart,
  Zap,
  Copy,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Edit,
  Repeat,
  Command,
  Keyboard,
  Wand2,
  Lightbulb,
  Bookmark,
  Cpu,
  Braces,
  Headphones,
  PanelLeft,
  Maximize,
  Minimize,
  Sparkle,
} from "lucide-react"
import { Sidebar } from "../components/sidebar"
import { Logo } from "../components/logo"
import { Tooltip } from "../components/tooltip"
import { Notification } from "../components/notification"
import { CommandPalette } from "../components/command-palette"
import { AIThinking } from "../components/ai-thinking"
import { CodeBlock } from "../components/code-block"
import { VoiceRecorder } from "../components/voice-recorder"
import { Confetti } from "../components/confetti"

// Types for our chat application
type Message = {
  id: string
  content: string
  role: "user" | "assistant" | "system"
  timestamp: Date
  attachments?: Attachment[]
  isCode?: boolean
  codeLanguage?: string
  reactions?: {
    liked?: boolean
    disliked?: boolean
  }
  isBookmarked?: boolean
}

type Attachment = {
  id: string
  type: "image" | "file" | "audio" | "video"
  name: string
  url: string
  size?: number
  thumbnail?: string
}

type Conversation = {
  id: string
  title: string
  messages: Message[]
  lastUpdated: Date
  folder?: string
  isPinned?: boolean
  model?: string
}

type UserProfile = {
  id: string
  name: string
  email: string
  avatar?: string
  theme: "dark" | "light"
  isPro?: boolean
  joinDate?: Date
  preferences?: {
    fontSize?: "sm" | "md" | "lg"
    messageAlignment?: "left" | "right"
    sendWithEnter?: boolean
    autoScroll?: boolean
    showTimestamps?: boolean
  }
}

type AIModel = {
  id: string
  name: string
  description: string
  icon: React.ElementType
  capabilities: string[]
  isAvailable: boolean
  isPro?: boolean
}

type Folder = {
  id: string
  name: string
  color?: string
  conversationIds: string[]
}

// Declare SpeechRecognition types
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
    start: (this: SpeechRecognition) => void
    stop: (this: SpeechRecognition) => void
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: SpeechRecognitionError
  }

  type SpeechRecognitionError =
    | "aborted"
    | "audio-capture"
    | "bad-grammar"
    | "language-not-supported"
    | "no-speech"
    | "network"
    | "not-allowed"
    | "service-not-allowed"
    | "timeout"

  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList extends Array<SpeechRecognitionResult> {
    item(index: number): SpeechRecognitionResult
  }

  interface SpeechRecognitionResult extends Array<SpeechRecognitionAlternative> {
    isFinal: boolean
  }

  interface SpeechRecognitionAlternative {
    readonly confidence: number
    readonly transcript: string
  }
}

export default function Dashboard() {
  const router = useRouter()

  // State for conversations
  const [conversations, setConversations] = useState<{
    today: Conversation[]
    yesterday: Conversation[]
    previousDays: Conversation[]
  }>({
    today: [
      {
        id: "1",
        title: "Best AI Crew Tools",
        messages: [
          {
            id: "m1",
            content: "What are the best AI crew tools?",
            role: "user",
            timestamp: new Date(),
          },
          {
            id: "m2",
            content:
              "Some of the best AI crew tools include OpenAI's GPT models, Midjourney for image generation, Runway for video editing, and Anthropic's Claude for text generation. These tools can help with various creative and analytical tasks.",
            role: "assistant",
            timestamp: new Date(),
          },
        ],
        lastUpdated: new Date(),
        model: "gpt-4o",
      },
      {
        id: "2",
        title: "Secrets to Getting Rich",
        messages: [
          {
            id: "m3",
            content: "What are some secrets to getting rich?",
            role: "user",
            timestamp: new Date(),
          },
          {
            id: "m4",
            content:
              "Building wealth typically involves consistent investing, developing multiple income streams, continuous learning, and maintaining financial discipline. There's no secret formula, but these principles have helped many build wealth over time.",
            role: "assistant",
            timestamp: new Date(),
          },
        ],
        lastUpdated: new Date(),
        model: "gpt-4o",
      },
    ],
    yesterday: [
      {
        id: "3",
        title: "AI Development Over Talk",
        messages: [
          {
            id: "m5",
            content: "How has AI development evolved over the years?",
            role: "user",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
          {
            id: "m6",
            content:
              "AI has evolved from rule-based systems to machine learning and now deep learning. Recent breakthroughs include large language models like GPT and multimodal models that can process text, images, and audio simultaneously.",
            role: "assistant",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        ],
        lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000),
        model: "gpt-3.5-turbo",
      },
    ],
    previousDays: [
      {
        id: "4",
        title: "NZ v PAK 2025 T20I",
        messages: [],
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        model: "gpt-3.5-turbo",
      },
      {
        id: "5",
        title: "Google Colab Error 409",
        messages: [],
        lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        model: "gpt-3.5-turbo",
      },
      {
        id: "6",
        title: "Math Problem Solving Guide",
        messages: [],
        lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        model: "gpt-4o",
      },
      {
        id: "7",
        title: "Roman Urdu Translation Help",
        messages: [],
        lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        model: "gpt-4o",
      },
      {
        id: "8",
        title: "AI Engineering Skills",
        messages: [],
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        model: "gpt-4o",
      },
    ],
  })

  // Folders state
  const [folders, setFolders] = useState<Folder[]>([
    { id: "f1", name: "Work", color: "#3B82F6", conversationIds: ["1", "9"] },
    { id: "f2", name: "Personal", color: "#10B981", conversationIds: ["2"] },
    { id: "f3", name: "Research", color: "#8B5CF6", conversationIds: ["3", "6"] },
  ])

  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "1",
    name: "User",
    email: "user@example.com",
    avatar: undefined,
    theme: "dark",
    isPro: false,
    joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    preferences: {
      fontSize: "md",
      messageAlignment: "left",
      sendWithEnter: true,
      autoScroll: true,
      showTimestamps: true,
    },
  })

  // Input state
  const [inputValue, setInputValue] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info" | "warning"
    message: string
    isVisible: boolean
  } | null>(null)
  const [charCount, setCharCount] = useState(0)
  const MAX_CHAR_COUNT = 4000

  // UI state
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [isMessageActionsOpen, setIsMessageActionsOpen] = useState<string | null>(null)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isVoiceRecorderOpen, setIsVoiceRecorderOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const [isCustomInstructionsOpen, setIsCustomInstructionsOpen] = useState(false)
  const [customInstructions, setCustomInstructions] = useState("")
  const [isCodeMode, setIsCodeMode] = useState(false)
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false)
  const [showWelcomeTour, setShowWelcomeTour] = useState(false)

  // Active conversation state
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)

  // Check if viewport is mobile
  const [isMobile, setIsMobile] = useState(false)

  // Models available
  const availableModels: AIModel[] = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      description: "Most capable model for complex tasks",
      icon: Sparkles,
      capabilities: ["Text generation", "Code generation", "Creative writing", "Problem solving"],
      isAvailable: true,
    },
    {
      id: "gpt-4",
      name: "GPT-4",
      description: "Advanced reasoning capabilities",
      icon: Sparkles,
      capabilities: ["Text generation", "Code generation", "Creative writing", "Problem solving"],
      isAvailable: true,
    },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      description: "Fast and efficient for most tasks",
      icon: Zap,
      capabilities: ["Text generation", "Basic code", "Creative writing"],
      isAvailable: true,
    },
    {
      id: "claude-3",
      name: "Claude 3",
      description: "Anthropic's latest model",
      icon: Sparkles,
      capabilities: ["Text generation", "Code generation", "Creative writing", "Problem solving"],
      isAvailable: true,
      isPro: true,
    },
    {
      id: "code-llama",
      name: "Code Llama",
      description: "Specialized for code generation",
      icon: Code,
      capabilities: ["Code generation", "Code explanation", "Debugging"],
      isAvailable: true,
      isPro: true,
    },
    {
      id: "dall-e-3",
      name: "DALL-E 3",
      description: "Image generation model",
      icon: ImageIcon,
      capabilities: ["Image generation", "Visual creativity", "Design assistance"],
      isAvailable: true,
      isPro: true,
    },
    {
      id: "whisper",
      name: "Whisper",
      description: "Speech to text model",
      icon: FileAudio,
      capabilities: ["Speech recognition", "Audio transcription", "Language detection"],
      isAvailable: true,
    },
  ]

  // Suggested prompts
  const suggestedPrompts = [
    {
      category: "Coding",
      prompts: [
        "Create a React component for a responsive navigation bar",
        "Explain how async/await works in JavaScript",
        "Write a Python function to analyze sentiment in text",
        "Help me debug this code: [paste your code here]",
      ],
    },
    {
      category: "Writing",
      prompts: [
        "Write a short story about a time traveler",
        "Help me draft an email to request a meeting with my boss",
        "Create an outline for a blog post about artificial intelligence",
        "Rewrite this paragraph to make it more engaging: [paste text here]",
      ],
    },
    {
      category: "Business",
      prompts: [
        "Create a marketing strategy for a new mobile app",
        "What are effective strategies for launching a SaaS product?",
        "Help me write a business proposal for a potential client",
        "Generate ideas for increasing customer engagement",
      ],
    },
    {
      category: "Learning",
      prompts: [
        "Explain quantum computing in simple terms",
        "Create a study plan for learning Spanish in 3 months",
        "What are the key concepts in machine learning?",
        "Help me understand the causes of the French Revolution",
      ],
    },
  ]

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("chatgpt_user_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/login")
      return
    }

    // Load user profile from localStorage
    const userId = localStorage.getItem("chatgpt_user_id") || "1"
    const userName = localStorage.getItem("chatgpt_user_name") || "User"
    const userEmail = localStorage.getItem("chatgpt_user_email") || "user@example.com"
    const userIsPro = localStorage.getItem("chatgpt_user_is_pro") === "true"

    setUserProfile({
      id: userId,
      name: userName,
      email: userEmail,
      avatar: undefined,
      theme: "dark",
      isPro: userIsPro,
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      preferences: {
        fontSize: "md",
        messageAlignment: "left",
        sendWithEnter: true,
        autoScroll: true,
        showTimestamps: true,
      },
    })

    // Check if first time user
    const isFirstTime = localStorage.getItem("chatgpt_first_time_user") !== "false"
    if (isFirstTime) {
      setIsFirstTimeUser(true)
      setShowWelcomeTour(true)
      localStorage.setItem("chatgpt_first_time_user", "false")
    }

    // Load settings if available
    const savedSettings = localStorage.getItem("chatgpt_user_settings")
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        if (settings.theme) {
          setUserProfile((prev) => ({
            ...prev,
            theme: settings.theme,
          }))
        }
      } catch (e) {
        console.error("Error parsing saved settings", e)
      }
    }

    // Load custom instructions if available
    const savedInstructions = localStorage.getItem("chatgpt_custom_instructions")
    if (savedInstructions) {
      setCustomInstructions(savedInstructions)
    }

    // Show welcome notification for first time users
    if (isFirstTime) {
      setTimeout(() => {
        setNotification({
          type: "success",
          message: "Welcome to NexusChat! We're excited to have you here.",
          isVisible: true,
        })
      }, 1000)
    }
  }, [router])

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Set initial value
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current && userProfile.preferences?.autoScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [activeConversation?.messages, attachments, userProfile.preferences?.autoScroll])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }, [inputValue])

  // Update character count
  useEffect(() => {
    setCharCount(inputValue.length)
  }, [inputValue])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Speech recognition for voice input
  useEffect(() => {
    let recognition: SpeechRecognition | null = null

    if (isRecording && "webkitSpeechRecognition" in window) {
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      recognition = new window.webkitSpeechRecognition() as SpeechRecognition
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")

        setInputValue(transcript)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error", event.error)
        setIsRecording(false)
        setNotification({
          type: "error",
          message: `Speech recognition error: ${event.error}`,
          isVisible: true,
        })
      }

      recognition.start()
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [isRecording])

  // Listen for command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle fullscreen mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Function to create a new chat
  const createNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      lastUpdated: new Date(),
      model: selectedModel,
    }

    setConversations((prev) => ({
      ...prev,
      today: [newConversation, ...prev.today],
    }))

    setActiveConversation(newConversation)
    setAttachments([])

    // Focus on textarea after creating new chat
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, 100)

    // Close sidebar on mobile after creating new chat
    if (isMobile) {
      setIsSidebarOpen(false)
    }

    // Show notification
    setNotification({
      type: "success",
      message: "New chat created",
      isVisible: true,
    })
  }

  // Function to validate input
  const validateInput = (input: string): boolean => {
    // Check if input is empty or only whitespace and no attachments
    if (!input.trim() && attachments.length === 0) {
      setNotification({
        type: "error",
        message: "Message or attachment required",
        isVisible: true,
      })
      return false
    }

    // Check if input exceeds character limit
    if (input.length > MAX_CHAR_COUNT) {
      setNotification({
        type: "error",
        message: `Message exceeds maximum character limit of ${MAX_CHAR_COUNT}`,
        isVisible: true,
      })
      return false
    }

    return true
  }

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!validateInput(inputValue)) return

    // Add system message with custom instructions if it's the first message
    const messagesToAdd: Message[] = []

    if (activeConversation && activeConversation.messages.length === 0 && customInstructions) {
      messagesToAdd.push({
        id: `system-${Date.now()}`,
        content: customInstructions,
        role: "system",
        timestamp: new Date(),
      })
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
      isCode: isCodeMode,
    }

    messagesToAdd.push(userMessage)

    let updatedConversation: Conversation

    if (activeConversation) {
      // Update existing conversation
      updatedConversation = {
        ...activeConversation,
        messages: [...activeConversation.messages, ...messagesToAdd],
        lastUpdated: new Date(),
      }

      // Update title if it's the first message
      if (activeConversation.messages.length === 0) {
        updatedConversation.title = inputValue.slice(0, 30) + (inputValue.length > 30 ? "..." : "")
      }
    } else {
      // Create new conversation if none is active
      updatedConversation = {
        id: Date.now().toString(),
        title: inputValue.slice(0, 30) + (inputValue.length > 30 ? "..." : ""),
        messages: messagesToAdd,
        lastUpdated: new Date(),
        model: selectedModel,
      }
    }

    // Update state with the new conversation
    setActiveConversation(updatedConversation)

    // Update conversations list
    setConversations((prev) => {
      const updatedToday = activeConversation
        ? prev.today.map((c) => (c.id === activeConversation.id ? updatedConversation : c))
        : [updatedConversation, ...prev.today]

      return {
        ...prev,
        today: updatedToday,
      }
    })

    // Clear input and attachments
    setInputValue("")
    setAttachments([])
    setIsCodeMode(false)

    // Simulate assistant response
    simulateAssistantResponse(updatedConversation)
  }

  // Function to simulate assistant response
  const simulateAssistantResponse = (conversation: Conversation) => {
    setIsTyping(true)
    setIsAIThinking(true)

    // Simulate typing delay
    setTimeout(() => {
      setIsAIThinking(false)

      const lastMessage = conversation.messages.find((m) => m.role === "user")
      if (!lastMessage) return

      let responseContent = generateAssistantResponse(lastMessage.content)
      let isCode = false
      let codeLanguage = ""

      // Check if the message is asking for code
      if (
        lastMessage.isCode ||
        lastMessage.content.toLowerCase().includes("code") ||
        lastMessage.content.toLowerCase().includes("function") ||
        lastMessage.content.toLowerCase().includes("component") ||
        lastMessage.content.toLowerCase().includes("class") ||
        lastMessage.content.toLowerCase().includes("javascript") ||
        lastMessage.content.toLowerCase().includes("python") ||
        lastMessage.content.toLowerCase().includes("react")
      ) {
        isCode = true

        // Determine language
        if (
          lastMessage.content.toLowerCase().includes("javascript") ||
          lastMessage.content.toLowerCase().includes("react")
        ) {
          codeLanguage = "javascript"
          responseContent = `Here's a JavaScript solution for your request:\n\n\`\`\`javascript\n// Example code\nfunction calculateTotal(items) {\n  return items.reduce((total, item) => {\n    return total + (item.price * item.quantity);\n  }, 0);\n}\n\n// Usage\nconst cart = [\n  { name: 'Product 1', price: 10, quantity: 2 },\n  { name: 'Product 2', price: 15, quantity: 1 },\n  { name: 'Product 3', price: 5, quantity: 3 }\n];\n\nconst total = calculateTotal(cart);\nconsole.log('Total:', total);\n\`\`\`\n\nThis function takes an array of items with price and quantity properties and calculates the total cost. Let me know if you need any clarification or have questions about the implementation!`
        } else if (lastMessage.content.toLowerCase().includes("python")) {
          codeLanguage = "python"
          responseContent = `Here's a Python solution for your request:\n\n\`\`\`python\n# Example code\ndef calculate_total(items):\n    return sum(item['price'] * item['quantity'] for item in items)\n\n# Usage\ncart = [\n    {'name': 'Product 1', 'price': 10, 'quantity': 2},\n    {'name': 'Product 2', 'price': 15, 'quantity': 1},\n    {'name': 'Product 3', 'price': 5, 'quantity': 3}\n]\n\ntotal = calculate_total(cart)\nprint(f'Total: {total}')\n\`\`\`\n\nThis function takes a list of items with price and quantity keys and calculates the total cost. Let me know if you need any clarification or have questions about the implementation!`
        } else {
          codeLanguage = "javascript"
          responseContent = `Here's a solution for your request:\n\n\`\`\`javascript\n// Example code\nfunction processData(data) {\n  const results = [];\n  \n  for (const item of data) {\n    if (item.value > 10) {\n      results.push({\n        id: item.id,\n        processed: item.value * 2\n      });\n    }\n  }\n  \n  return results;\n}\n\n// Test data\nconst testData = [\n  { id: 1, value: 5 },\n  { id: 2, value: 12 },\n  { id: 3, value: 8 },\n  { id: 4, value: 15 }\n];\n\nconsole.log(processData(testData));\n\`\`\`\n\nThis function filters items with a value greater than 10 and transforms them by doubling the value. Let me know if you need any modifications or have questions!`
        }
      }

      // Add response about attachments if there were any
      if (lastMessage.attachments && lastMessage.attachments.length > 0) {
        const attachmentTypes = lastMessage.attachments.map((a) => a.type).join(" and ")
        responseContent += `\n\nI see you've shared ${lastMessage.attachments.length} ${attachmentTypes}(s) with me. I'll take a look at them.`
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
        isCode,
        codeLanguage,
      }

      const updatedConversation = {
        ...conversation,
        messages: [...conversation.messages, assistantMessage],
        lastUpdated: new Date(),
      }

      setActiveConversation(updatedConversation)

      setConversations((prev) => {
        const updatedToday = prev.today.map((c) => (c.id === updatedConversation.id ? updatedConversation : c))

        return {
          ...prev,
          today: updatedToday,
        }
      })

      setIsTyping(false)

      // Show confetti for first-time users after first response
      if (isFirstTimeUser && conversation.messages.length <= 2) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }, 2500)
  }

  // Function to generate a simple response
  const generateAssistantResponse = (userMessage: string): string => {
    const responses = [
      "I understand your question about " + userMessage.slice(0, 20) + "... Let me help with that.",
      "That's an interesting question. Based on my knowledge, I can provide some insights on this topic.",
      "Thanks for asking. Here's what I know about this subject.",
      "I'd be happy to help with your question. Here's some information that might be useful.",
      "Great question! Here's my response based on the latest information I have.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Function to select a conversation
  const selectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation)
    setNotification(null) // Clear any notifications when switching conversations
    setAttachments([]) // Clear any pending attachments

    // Close sidebar on mobile after selecting conversation
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  // Handle key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && userProfile.preferences?.sendWithEnter) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle input change with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Clear error if input is valid
    if ((value.trim() || attachments.length > 0) && value.length <= MAX_CHAR_COUNT) {
      setNotification(null)
    }
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Simulate file upload
    setIsUploading(true)
    setUploadProgress(0)

    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Process each file
    Array.from(files).forEach((file) => {
      // Create object URL for preview
      const url = URL.createObjectURL(file)

      // Add to attachments
      const newAttachment: Attachment = {
        id: Date.now().toString(),
        type: type === "image" ? "image" : "file",
        name: file.name,
        url: url,
        size: file.size,
      }

      setAttachments((prev) => [...prev, newAttachment])
    })

    // Reset file input
    e.target.value = ""

    // Show notification
    setNotification({
      type: "success",
      message: "File uploaded successfully",
      isVisible: true,
    })
  }

  // Handle removing an attachment
  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id))
  }

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setUserProfile((prev) => ({
      ...prev,
      avatar: url,
    }))

    // Show notification
    setNotification({
      type: "success",
      message: "Avatar updated successfully",
      isVisible: true,
    })
  }

  // Toggle voice recording
  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false)
    } else {
      setIsVoiceRecorderOpen(true)
    }
  }

  // Handle voice recording complete
  const handleVoiceRecordingComplete = (audioBlob: Blob) => {
    // Create object URL for preview
    const url = URL.createObjectURL(audioBlob)

    // Add to attachments
    const newAttachment: Attachment = {
      id: Date.now().toString(),
      type: "audio",
      name: "Voice recording.mp3",
      url: url,
      size: audioBlob.size,
    }

    setAttachments((prev) => [...prev, newAttachment])
    setIsVoiceRecorderOpen(false)

    // Show notification
    setNotification({
      type: "success",
      message: "Voice recording added",
      isVisible: true,
    })
  }

  // Format file size
  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("chatgpt_user_logged_in")
    localStorage.removeItem("chatgpt_user_id")
    localStorage.removeItem("chatgpt_user_name")
    localStorage.removeItem("chatgpt_user_email")
    router.push("/login")
  }

  // Copy message to clipboard
  const copyMessageToClipboard = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        // Show success notification
        setNotification({
          type: "success",
          message: "Message copied to clipboard",
          isVisible: true,
        })
      })
      .catch(() => {
        setNotification({
          type: "error",
          message: "Failed to copy message",
          isVisible: true,
        })
      })

    setIsMessageActionsOpen(null)
  }

  // Delete message
  const deleteMessage = (messageId: string) => {
    if (!activeConversation) return

    const updatedMessages = activeConversation.messages.filter((msg) => msg.id !== messageId)

    const updatedConversation = {
      ...activeConversation,
      messages: updatedMessages,
    }

    setActiveConversation(updatedConversation)

    setConversations((prev) => ({
      ...prev,
      today: prev.today.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
      yesterday: prev.yesterday.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
      previousDays: prev.previousDays.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
    }))

    setIsMessageActionsOpen(null)

    // Show notification
    setNotification({
      type: "info",
      message: "Message deleted",
      isVisible: true,
    })
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mainContainerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  // Toggle message bookmark
  const toggleMessageBookmark = (messageId: string) => {
    if (!activeConversation) return

    const updatedMessages = activeConversation.messages.map((msg) => {
      if (msg.id === messageId) {
        return {
          ...msg,
          isBookmarked: !msg.isBookmarked,
        }
      }
      return msg
    })

    const updatedConversation = {
      ...activeConversation,
      messages: updatedMessages,
    }

    setActiveConversation(updatedConversation)

    setConversations((prev) => ({
      ...prev,
      today: prev.today.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
      yesterday: prev.yesterday.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
      previousDays: prev.previousDays.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
    }))

    setIsMessageActionsOpen(null)

    // Show notification
    setNotification({
      type: "success",
      message: "Message bookmarked",
      isVisible: true,
    })
  }

  // Toggle message reaction
  const toggleMessageReaction = (messageId: string, reaction: "liked" | "disliked") => {
    if (!activeConversation) return

    const updatedMessages = activeConversation.messages.map((msg) => {
      if (msg.id === messageId) {
        const currentReaction = msg.reactions || {}

        if (reaction === "liked") {
          return {
            ...msg,
            reactions: {
              ...currentReaction,
              liked: !currentReaction.liked,
              disliked: false,
            },
          }
        } else {
          return {
            ...msg,
            reactions: {
              ...currentReaction,
              disliked: !currentReaction.disliked,
              liked: false,
            },
          }
        }
      }
      return msg
    })

    const updatedConversation = {
      ...activeConversation,
      messages: updatedMessages,
    }

    setActiveConversation(updatedConversation)

    setConversations((prev) => ({
      ...prev,
      today: prev.today.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
      yesterday: prev.yesterday.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
      previousDays: prev.previousDays.map((c) => (c.id === activeConversation.id ? updatedConversation : c)),
    }))

    setIsMessageActionsOpen(null)
  }

  // Save custom instructions
  const saveCustomInstructions = () => {
    localStorage.setItem("chatgpt_custom_instructions", customInstructions)
    setIsCustomInstructionsOpen(false)

    // Show notification
    setNotification({
      type: "success",
      message: "Custom instructions saved",
      isVisible: true,
    })
  }

  // Extract code from message content
  const extractCodeFromMessage = (content: string): { code: string; language: string } | null => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const match = codeBlockRegex.exec(content)

    if (match) {
      return {
        language: match[1] || "plaintext",
        code: match[2].trim(),
      }
    }

    return null
  }

  // Render message content with code blocks
  const renderMessageContent = (message: Message) => {
    if (message.isCode) {
      const codeData = extractCodeFromMessage(message.content)

      if (codeData) {
        return (
          <>
            <p className="mb-4">{message.content.split("```")[0].trim()}</p>
            <CodeBlock
              code={codeData.code}
              language={codeData.language || message.codeLanguage || "javascript"}
              showLineNumbers={true}
            />
            {message.content.split("```").length > 2 && (
              <p className="mt-4">{message.content.split("```").pop()?.trim()}</p>
            )}
          </>
        )
      }
    }

    return <p>{message.content}</p>
  }

  return (
    <div
      ref={mainContainerRef}
      className="flex h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-white overflow-hidden"
    >
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
        createNewChat={createNewChat}
        conversations={conversations}
        activeConversation={activeConversation}
        selectConversation={selectConversation}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full md:w-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/30 backdrop-blur-sm">
          <div className="flex items-center">
            <button
              className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <PanelLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="ml-2 flex items-center">
              <Logo size="sm" showText={!isMobile} />
              <button
                className="ml-3 flex items-center font-medium hover:bg-gray-200/70 dark:hover:bg-gray-800/70 rounded-lg px-3 py-1.5"
                onClick={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
              >
                <span>{availableModels.find((m) => m.id === selectedModel)?.name || "GPT-4o"}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>

              {/* Model selector dropdown */}
              {isModelSelectorOpen && (
                <div className="absolute top-12 left-16 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-72 overflow-hidden animate-fadeIn">
                  <div className="p-2">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-2">Select a model</div>
                    <div className="space-y-1 mt-1">
                      {availableModels.map((model) => (
                        <button
                          key={model.id}
                          className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                            selectedModel === model.id
                              ? "bg-gray-100 dark:bg-gray-700"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          } ${model.isPro && !userProfile.isPro ? "opacity-50" : ""}`}
                          onClick={() => {
                            if (model.isPro && !userProfile.isPro) {
                              setNotification({
                                type: "warning",
                                message: "This model requires a Pro subscription",
                                isVisible: true,
                              })
                              return
                            }
                            setSelectedModel(model.id)
                            setIsModelSelectorOpen(false)
                          }}
                          disabled={model.isPro && !userProfile.isPro}
                        >
                          <model.icon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                          <div>
                            <div className="font-medium flex items-center">
                              {model.name}
                              {model.isPro && (
                                <span className="ml-2 text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-1.5 py-0.5 rounded-full">
                                  PRO
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{model.description}</div>
                          </div>
                          {selectedModel === model.id && (
                            <div className="ml-auto">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Tooltip content="Command palette (⌘K)">
              <button
                className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 mr-1"
                onClick={() => setIsCommandPaletteOpen(true)}
              >
                <Command className="h-5 w-5" />
              </button>
            </Tooltip>
            <Tooltip content="Toggle fullscreen">
              <button
                className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 mr-1"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </Tooltip>
            <Tooltip content="Custom instructions">
              <button
                className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 mr-1"
                onClick={() => setIsCustomInstructionsOpen(true)}
              >
                <Wand2 className="h-5 w-5" />
              </button>
            </Tooltip>
            <Link
              href="/pricing"
              className="flex items-center px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 mr-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Zap className="h-4 w-4 mr-1 text-yellow-500" />
              <span className="hidden sm:inline">Upgrade</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 mr-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Settings className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <Link
              href="/my-account"
              className="relative h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md cursor-pointer"
            >
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar || "/placeholder.svg"}
                  alt="User avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-white">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
              {userProfile.isPro && (
                <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full h-3 w-3 border border-white dark:border-gray-900"></div>
              )}
            </Link>
          </div>
        </div>

        {/* Chat area */}
        <div ref={chatContainerRef} className="flex-1 flex flex-col p-4 overflow-y-auto scrollbar-thin">
          {activeConversation ? (
            // Show chat messages if there's an active conversation
            <div className="flex-1 flex flex-col">
              {activeConversation.messages.map(
                (message) =>
                  message.role !== "system" && (
                    <div
                      key={message.id}
                      className={`mb-6 ${message.role === "assistant" ? "pr-8" : "pl-8"} animate-fadeIn relative group`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 shadow-md ${
                            message.role === "assistant"
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                              : "bg-gradient-to-r from-blue-500 to-purple-500"
                          }`}
                        >
                          <span className="text-sm font-medium text-white">
                            {message.role === "assistant" ? "AI" : "U"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm leading-relaxed">{renderMessageContent(message)}</div>

                          {/* Attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {message.attachments.map((attachment) => (
                                <div
                                  key={attachment.id}
                                  className="rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100/50 dark:bg-gray-800/50"
                                >
                                  {attachment.type === "image" ? (
                                    <div>
                                      <img
                                        src={attachment.url || "/placeholder.svg"}
                                        alt={attachment.name}
                                        className="w-full h-auto max-h-48 object-cover"
                                      />
                                      <div className="p-2 text-xs">{attachment.name}</div>
                                    </div>
                                  ) : attachment.type === "audio" ? (
                                    <div className="p-3">
                                      <div className="flex items-center mb-2">
                                        <Headphones className="h-5 w-5 mr-2 text-blue-500" />
                                        <div className="text-sm font-medium">{attachment.name}</div>
                                      </div>
                                      <audio controls className="w-full">
                                        <source src={attachment.url} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                      </audio>
                                    </div>
                                  ) : (
                                    <div className="p-3 flex items-center">
                                      <File className="h-8 w-8 mr-3 text-blue-400" />
                                      <div>
                                        <div className="text-sm font-medium truncate max-w-[200px]">
                                          {attachment.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                          {formatFileSize(attachment.size)}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Message reactions */}
                          {message.role === "assistant" && (
                            <div className="flex items-center mt-2 space-x-2">
                              <button
                                className={`p-1 rounded-md ${
                                  message.reactions?.liked
                                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                                onClick={() => toggleMessageReaction(message.id, "liked")}
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </button>
                              <button
                                className={`p-1 rounded-md ${
                                  message.reactions?.disliked
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                                onClick={() => toggleMessageReaction(message.id, "disliked")}
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </button>
                              <button
                                className={`p-1 rounded-md ${
                                  message.isBookmarked
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                                onClick={() => toggleMessageBookmark(message.id)}
                              >
                                <Bookmark className="h-4 w-4" />
                              </button>
                              <button
                                className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                onClick={() => copyMessageToClipboard(message.content)}
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                          )}

                          {userProfile.preferences?.showTimestamps && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Message actions */}
                      <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                          onClick={() =>
                            setIsMessageActionsOpen(isMessageActionsOpen === message.id ? null : message.id)
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                        {isMessageActionsOpen === message.id && (
                          <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-48 z-10 animate-fadeIn">
                            <div className="py-1">
                              <button
                                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => copyMessageToClipboard(message.content)}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                <span>Copy</span>
                              </button>
                              {message.role === "assistant" && (
                                <>
                                  <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => toggleMessageReaction(message.id, "liked")}
                                  >
                                    <ThumbsUp className="h-4 w-4 mr-2" />
                                    <span>{message.reactions?.liked ? "Unlike" : "Like"}</span>
                                  </button>
                                  <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => toggleMessageReaction(message.id, "disliked")}
                                  >
                                    <ThumbsDown className="h-4 w-4 mr-2" />
                                    <span>{message.reactions?.disliked ? "Remove dislike" : "Dislike"}</span>
                                  </button>
                                  <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Repeat className="h-4 w-4 mr-2" />
                                    <span>Regenerate</span>
                                  </button>
                                </>
                              )}
                              <button
                                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => toggleMessageBookmark(message.id)}
                              >
                                <Bookmark className="h-4 w-4 mr-2" />
                                <span>{message.isBookmarked ? "Remove bookmark" : "Bookmark"}</span>
                              </button>
                              <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Share2 className="h-4 w-4 mr-2" />
                                <span>Share</span>
                              </button>
                              {message.role === "user" && (
                                <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <Edit className="h-4 w-4 mr-2" />
                                  <span>Edit</span>
                                </button>
                              )}
                              <button
                                className="flex items-center w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => deleteMessage(message.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ),
              )}

              {isTyping && (
                <div className="mb-6 pr-8 animate-fadeIn">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mr-4 shadow-md">
                      <span className="text-sm font-medium text-white">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex space-x-1">
                        <div
                          className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isAIThinking && (
                <div className="mb-4">
                  <AIThinking isThinking={true} message="Thinking about your request" />
                </div>
              )}
            </div>
          ) : (
            // Show welcome message if no conversation is active
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="mb-6">
                <Logo size="lg" showText={true} />
              </div>
              <h1 className="text-4xl font-medium mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Welcome to NexusChat!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-8">
                Your AI-powered assistant for intelligent conversations. Ask me anything about AI, coding, writing,
                research, or any topic you're curious about.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full px-4">
                <div
                  className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 hover:shadow-md transition-shadow hover:scale-[1.02] transform duration-200 cursor-pointer"
                  onClick={() => {
                    setInputValue("Write a React component for a responsive navigation bar")
                    setTimeout(() => {
                      if (textareaRef.current) {
                        textareaRef.current.focus()
                      }
                    }, 100)
                  }}
                >
                  <h3 className="font-medium mb-2 flex items-center">
                    <Code className="h-5 w-5 mr-2 text-blue-500" />
                    <span>Code Generation</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "Write a React component for a responsive navigation bar"
                  </p>
                </div>

                <div
                  className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 hover:shadow-md transition-shadow hover:scale-[1.02] transform duration-200 cursor-pointer"
                  onClick={() => {
                    setInputValue("Write a short story about a time traveler who visits ancient Rome")
                    setTimeout(() => {
                      if (textareaRef.current) {
                        textareaRef.current.focus()
                      }
                    }, 100)
                  }}
                >
                  <h3 className="font-medium mb-2 flex items-center">
                    <Sparkle className="h-5 w-5 mr-2 text-purple-500" />
                    <span>Creative Writing</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "Write a short story about a time traveler who visits ancient Rome"
                  </p>
                </div>

                <div
                  className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 hover:shadow-md transition-shadow hover:scale-[1.02] transform duration-200 cursor-pointer"
                  onClick={() => {
                    setInputValue("How can I analyze customer feedback data to identify trends?")
                    setTimeout(() => {
                      if (textareaRef.current) {
                        textareaRef.current.focus()
                      }
                    }, 100)
                  }}
                >
                  <h3 className="font-medium mb-2 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-green-500" />
                    <span>Data Analysis</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "How can I analyze customer feedback data to identify trends?"
                  </p>
                </div>

                <div
                  className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 hover:shadow-md transition-shadow hover:scale-[1.02] transform duration-200 cursor-pointer"
                  onClick={() => {
                    setInputValue("What are effective strategies for launching a SaaS product?")
                    setTimeout(() => {
                      if (textareaRef.current) {
                        textareaRef.current.focus()
                      }
                    }, 100)
                  }}
                >
                  <h3 className="font-medium mb-2 flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-orange-500" />
                    <span>Business Strategy</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "What are effective strategies for launching a SaaS product?"
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center">
                <Keyboard className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Pro tip: Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-xs">⌘</kbd> +{" "}
                  <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-xs">K</kbd> to open the
                  command palette
                </span>
              </div>
            </div>
          )}

          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className="w-full max-w-3xl mx-auto mb-4">
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="relative rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-100/50 dark:bg-gray-800/50 group"
                  >
                    {attachment.type === "image" ? (
                      <div className="w-24 h-24 relative">
                        <img
                          src={attachment.url || "/placeholder.svg"}
                          alt={attachment.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          className="absolute top-1 right-1 bg-gray-900/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveAttachment(attachment.id)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : attachment.type === "audio" ? (
                      <div className="p-2 w-48">
                        <div className="flex items-center">
                          <Headphones className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium truncate">{attachment.name}</div>
                          </div>
                          <button
                            className="ml-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveAttachment(attachment.id)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <audio controls className="w-full mt-2 h-8">
                          <source src={attachment.url} type="audio/mpeg" />
                        </audio>
                      </div>
                    ) : (
                      <div className="p-2 w-32">
                        <div className="flex items-center">
                          <File className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium truncate">{attachment.name}</div>
                          </div>
                          <button
                            className="ml-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveAttachment(attachment.id)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload progress */}
          {isUploading && (
            <div className="w-full max-w-3xl mx-auto mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Uploading...</span>
                  <span className="text-sm">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="w-full max-w-3xl mx-auto mt-auto">
            <div className="relative">
              {/* Suggestions button */}
              {!activeConversation?.messages.length && (
                <div className="absolute -top-12 left-0 right-0 flex justify-center">
                  <button
                    onClick={() => setIsSuggestionsOpen(!isSuggestionsOpen)}
                    className="bg-white dark:bg-gray-800 rounded-full px-4 py-1.5 text-sm flex items-center shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>Suggestions</span>
                    <ChevronDown
                      className={`h-4 w-4 ml-2 transition-transform ${isSuggestionsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              )}

              {/* Suggestions panel */}
              {isSuggestionsOpen && (
                <div className="absolute -top-64 left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-h-60 overflow-y-auto animate-fadeIn">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Suggested prompts</h3>
                    <button
                      onClick={() => setIsSuggestionsOpen(false)}
                      className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {suggestedPrompts.map((category) => (
                      <div key={category.category}>
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {category.category}
                        </h4>
                        <div className="space-y-1">
                          {category.prompts.map((prompt, i) => (
                            <button
                              key={i}
                              className="w-full text-left text-sm p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => {
                                setInputValue(prompt)
                                setIsSuggestionsOpen(false)
                                setTimeout(() => {
                                  if (textareaRef.current) {
                                    textareaRef.current.focus()
                                  }
                                }, 100)
                              }}
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-gray-300 dark:border-gray-700/50 bg-white dark:bg-gray-900/70 backdrop-blur-sm p-2 shadow-lg transition-all duration-300 focus-within:border-purple-500/50 focus-within:shadow-purple-500/10">
                <textarea
                  ref={textareaRef}
                  className={`w-full bg-transparent outline-none resize-none p-2 max-h-[150px] scrollbar-thin text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    userProfile.preferences?.fontSize === "sm"
                      ? "text-sm"
                      : userProfile.preferences?.fontSize === "lg"
                        ? "text-lg"
                        : "text-base"
                  }`}
                  placeholder={
                    isRecording ? "Listening..." : isCodeMode ? "Enter code or coding question..." : "Ask anything..."
                  }
                  rows={1}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  disabled={isRecording}
                ></textarea>

                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center">
                    <Tooltip content="Attach file">
                      <button
                        className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="h-5 w-5" />
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "file")}
                        />
                      </button>
                    </Tooltip>
                    <Tooltip content="Attach image">
                      <button
                        className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200"
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <ImageIcon className="h-5 w-5" />
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "image")}
                        />
                      </button>
                    </Tooltip>
                    <Tooltip content={isCodeMode ? "Normal mode" : "Code mode"}>
                      <button
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          isCodeMode
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "hover:bg-gray-200/70 dark:hover:bg-gray-800/70"
                        }`}
                        onClick={() => setIsCodeMode(!isCodeMode)}
                      >
                        <Code className="h-5 w-5" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Search">
                      <button className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 flex items-center">
                        <Search className="h-5 w-5" />
                        <span className="ml-1 text-sm hidden sm:inline">Search</span>
                      </button>
                    </Tooltip>
                    <Tooltip content="More options">
                      <button className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </Tooltip>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`text-xs mr-2 ${charCount > MAX_CHAR_COUNT ? "text-red-500" : "text-gray-500 dark:text-gray-400"} hidden sm:inline`}
                    >
                      {charCount}/{MAX_CHAR_COUNT}
                    </span>
                    <Tooltip content="Voice input">
                      <button
                        className={`p-2 rounded-full transition-all duration-200 ${
                          isRecording ? "bg-red-500 hover:bg-red-600" : "hover:bg-gray-200/70 dark:hover:bg-gray-800/70"
                        }`}
                        onClick={toggleVoiceRecording}
                      >
                        {isRecording ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5" />}
                      </button>
                    </Tooltip>
                    <Tooltip content="Send message">
                      <button
                        className={`p-2 rounded-full transition-all duration-200 ${
                          inputValue.trim() || attachments.length > 0
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-md shadow-purple-500/20"
                            : "hover:bg-gray-200/70 dark:hover:bg-gray-800/70 text-gray-400 dark:text-gray-500"
                        }`}
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() && attachments.length === 0}
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Command palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        createNewChat={createNewChat}
      />

      {/* Voice recorder */}
      {isVoiceRecorderOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <VoiceRecorder
              onRecordingComplete={handleVoiceRecordingComplete}
              onCancel={() => setIsVoiceRecorderOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Custom instructions modal */}
      {isCustomInstructionsOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-purple-500" />
                <span>Custom Instructions</span>
              </h2>
              <button
                className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsCustomInstructionsOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Custom instructions help NexusChat understand how you want it to respond. These instructions will be
              applied to all your future conversations.
            </p>

            <div className="mb-4">
              <textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Example: I'm a developer working on a React project. I prefer code examples with TypeScript. Please provide detailed explanations with your answers."
                className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col space-y-2 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Sparkle className="h-5 w-5 text-purple-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Be specific about your preferences</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    "I prefer concise answers with bullet points" or "I like detailed explanations with examples"
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Cpu className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Mention your technical background</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    "I'm a beginner programmer" or "I have 10 years of experience in machine learning"
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Braces className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Specify code formatting preferences</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    "Always include comments in code" or "I prefer Python over JavaScript examples"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsCustomInstructionsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                onClick={saveCustomInstructions}
              >
                Save Instructions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          isVisible={notification.isVisible}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Confetti effect */}
      {showConfetti && <Confetti duration={3000} />}
    </div>
  )
}
