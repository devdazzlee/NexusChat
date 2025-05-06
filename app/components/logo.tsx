import { Sparkles } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-sm opacity-70 animate-pulse"></div>
        <div
          className={`relative ${sizeClasses[size]} bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center`}
        >
          <Sparkles className="h-1/2 w-1/2 text-white" />
        </div>
      </div>
      {showText && (
        <div className={`ml-2 font-bold ${textSizeClasses[size]}`}>
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Nexus</span>
          <span>Chat</span>
        </div>
      )}
    </div>
  )
}
