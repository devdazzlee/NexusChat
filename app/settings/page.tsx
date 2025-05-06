"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SettingsIcon, Monitor, Moon, Sun, Save, Check, AlertCircle, X, ArrowLeft } from "lucide-react"

export default function Settings() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    theme: "dark",
    fontSize: "medium",
    soundEffects: true,
    notifications: true,
    compactMode: false,
    autoSave: true,
    keyboardShortcuts: true,
    codeHighlighting: true,
    markdownSupport: true,
    spellCheck: true,
  })

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("chatgpt_user_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/login")
      return
    }

    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem("chatgpt_user_settings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Error parsing saved settings", e)
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [router])

  // Handle settings change
  const handleSettingChange = (setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      try {
        // Save settings to localStorage
        localStorage.setItem("chatgpt_user_settings", JSON.stringify(settings))

        setIsLoading(false)
        setSuccessMessage("Settings saved successfully")

        // Apply theme
        document.documentElement.classList.toggle("dark", settings.theme === "dark")

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      } catch (e) {
        setError("Failed to save settings. Please try again.")
        setIsLoading(false)
      }
    }, 1000)
  }

  // Reset settings to defaults
  const resetSettings = () => {
    const defaultSettings = {
      theme: "dark",
      fontSize: "medium",
      soundEffects: true,
      notifications: true,
      compactMode: false,
      autoSave: true,
      keyboardShortcuts: true,
      codeHighlighting: true,
      markdownSupport: true,
      spellCheck: true,
    }

    setSettings(defaultSettings)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              NexusChat
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/my-account"
              className="px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors duration-200"
            >
              My Account
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <SettingsIcon className="h-8 w-8 mr-3 text-blue-400" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{successMessage}</span>
              </div>
              <button onClick={() => setSuccessMessage(null)} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Appearance Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Appearance</h2>

              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSettingChange("theme", "light")}
                      className={`flex flex-col items-center p-4 rounded-lg border ${
                        settings.theme === "light"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <Sun className="h-6 w-6 mb-2" />
                      <span>Light</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSettingChange("theme", "dark")}
                      className={`flex flex-col items-center p-4 rounded-lg border ${
                        settings.theme === "dark"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <Moon className="h-6 w-6 mb-2" />
                      <span>Dark</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSettingChange("theme", "system")}
                      className={`flex flex-col items-center p-4 rounded-lg border ${
                        settings.theme === "system"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <Monitor className="h-6 w-6 mb-2" />
                      <span>System</span>
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label htmlFor="fontSize" className="block text-sm font-medium mb-2">
                    Font Size
                  </label>
                  <select
                    id="fontSize"
                    value={settings.fontSize}
                    onChange={(e) => handleSettingChange("fontSize", e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                {/* Compact Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Compact Mode</h3>
                    <p className="text-sm text-gray-400">Reduce spacing and padding for a more compact view.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.compactMode}
                      onChange={(e) => handleSettingChange("compactMode", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Notifications & Sounds</h2>

              <div className="space-y-6">
                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sound Effects</h3>
                    <p className="text-sm text-gray-400">Play sound effects for notifications and actions.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.soundEffects}
                      onChange={(e) => handleSettingChange("soundEffects", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-gray-400">Receive notifications for new messages and updates.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange("notifications", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Editor Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Editor</h2>

              <div className="space-y-6">
                {/* Auto Save */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto Save</h3>
                    <p className="text-sm text-gray-400">Automatically save your conversations.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.autoSave}
                      onChange={(e) => handleSettingChange("autoSave", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Keyboard Shortcuts</h3>
                    <p className="text-sm text-gray-400">Enable keyboard shortcuts for faster navigation.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.keyboardShortcuts}
                      onChange={(e) => handleSettingChange("keyboardShortcuts", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Code Highlighting */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Code Highlighting</h3>
                    <p className="text-sm text-gray-400">Highlight syntax in code blocks.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.codeHighlighting}
                      onChange={(e) => handleSettingChange("codeHighlighting", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Markdown Support */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Markdown Support</h3>
                    <p className="text-sm text-gray-400">Enable markdown formatting in messages.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.markdownSupport}
                      onChange={(e) => handleSettingChange("markdownSupport", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Spell Check */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Spell Check</h3>
                    <p className="text-sm text-gray-400">Check spelling in your messages.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.spellCheck}
                      onChange={(e) => handleSettingChange("spellCheck", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={resetSettings}
                className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors"
              >
                Reset to Defaults
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg flex items-center justify-center ${
                  isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
