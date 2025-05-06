"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

// Types for our chat application
type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  attachments?: Attachment[]
}

type Attachment = {
  id: string
  type: "image" | "file"
  name: string
  url: string
  size?: number
}

type Conversation = {
  id: string
  title: string
  messages: Message[]
  lastUpdated: Date
}

type UserProfile = {
  name: string
  email: string
  avatar?: string
  theme: "dark" | "light"
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

import { useRouter } from "next/navigation"

export default function ChatGPTInterface() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("chatgpt_user_logged_in")

    if (isLoggedIn === "true") {
      // Redirect to dashboard if logged in
      router.push("/dashboard")
    } else {
      // Redirect to login if not logged in
      router.push("/login")
    }
  }, [router])

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
      },
    ],
    previousDays: [
      {
        id: "4",
        title: "NZ v PAK 2025 T20I",
        messages: [],
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: "5",
        title: "Google Colab Error 409",
        messages: [],
        lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: "6",
        title: "Math Problem Solving Guide",
        messages: [],
        lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "7",
        title: "Roman Urdu Translation Help",
        messages: [],
        lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
      {
        id: "8",
        title: "AI Engineering Skills",
        messages: [],
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ],
  })

  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Sam Johnson",
    email: "sam.johnson@example.com",
    avatar: undefined,
    theme: "dark",
  })

  // Input state
  const [inputValue, setInputValue] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [charCount, setCharCount] = useState(0)
  const MAX_CHAR_COUNT = 4000

  // UI state
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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

  // Check if viewport is mobile
  const [isMobile, setIsMobile] = useState(false)

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      }
    }

    // Set initial value
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [activeConversation?.messages, attachments])

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
      }

      recognition.start()
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [isRecording])

  // Function to create a new chat
  const createNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      lastUpdated: new Date(),
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
  }

  // Function to validate input
  const validateInput = (input: string): boolean => {
    // Check if input is empty or only whitespace and no attachments
    if (!input.trim() && attachments.length === 0) {
      setError("Message or attachment required")
      return false
    }

    // Check if input exceeds character limit
    if (input.length > MAX_CHAR_COUNT) {
      setError(`Message exceeds maximum character limit of ${MAX_CHAR_COUNT}`)
      return false
    }

    // Clear any previous errors
    setError(null)
    return true
  }

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!validateInput(inputValue)) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    }

    let updatedConversation: Conversation

    if (activeConversation) {
      // Update existing conversation
      updatedConversation = {
        ...activeConversation,
        messages: [...activeConversation.messages, userMessage],
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
        messages: [userMessage],
        lastUpdated: new Date(),
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

    // Simulate assistant response
    simulateAssistantResponse(updatedConversation)
  }

  // Function to simulate assistant response
  const simulateAssistantResponse = (conversation: Conversation) => {
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const lastMessage = conversation.messages[conversation.messages.length - 1]
      let responseContent = generateAssistantResponse(lastMessage.content)

      // Add response about attachments if there were any
      if (lastMessage.attachments && lastMessage.attachments.length > 0) {
        const attachmentTypes = lastMessage.attachments.map((a) => a.type).join(" and ")
        responseContent += ` I see you've shared ${lastMessage.attachments.length} ${attachmentTypes}(s) with me. I'll take a look at them.`
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
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
    }, 1500)
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
    setError(null) // Clear any errors when switching conversations
    setAttachments([]) // Clear any pending attachments

    // Close sidebar on mobile after selecting conversation
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  // Handle key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
      setError(null)
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
  }

  // Toggle voice recording
  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setInputValue("")
    }
  }

  // Format file size
  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return null
}
