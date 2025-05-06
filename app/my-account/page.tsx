"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User,
  Lock,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Save,
  Upload,
  X,
  Check,
  AlertCircle,
  Menu,
} from "lucide-react"

export default function MyAccount() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // User profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: undefined as string | undefined,
    phone: "",
    bio: "",
  })

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

    setProfile({
      name: userName,
      email: userEmail,
      avatar: undefined,
      phone: "+1 (555) 123-4567",
      bio: "AI enthusiast and technology lover.",
    })
  }, [router])

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
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

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setProfile((prev) => ({
      ...prev,
      avatar: url,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      // Update localStorage
      localStorage.setItem("chatgpt_user_name", profile.name)
      localStorage.setItem("chatgpt_user_email", profile.email)

      setIsLoading(false)
      setSuccessMessage("Profile updated successfully")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }, 1000)
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("chatgpt_user_logged_in")
    localStorage.removeItem("chatgpt_user_id")
    localStorage.removeItem("chatgpt_user_name")
    localStorage.removeItem("chatgpt_user_email")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="p-2 rounded-lg hover:bg-gray-800/70 transition-colors duration-200 md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/dashboard"
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
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed md:relative z-30 md:z-auto w-[280px] md:w-64 flex-shrink-0 bg-gray-900/90 backdrop-blur-sm border-r border-gray-800 h-[calc(100vh-73px)] md:h-auto md:translate-x-0 transition-all duration-300 ease-in-out`}
        >
          {/* Mobile overlay */}
          {isSidebarOpen && isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <div className="p-4 h-full overflow-y-auto">
            <div className="flex flex-col items-center mb-8 p-4">
              <div className="relative mb-4">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar || "/placeholder.svg"}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-medium">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-2 cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-400 text-sm">{profile.email}</p>
            </div>

            <nav>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "profile"
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span>Profile Information</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "security"
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <Lock className="h-5 w-5 mr-3" />
                    <span>Security</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("billing")}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "billing"
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    <span>Billing & Plans</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "notifications"
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <Bell className="h-5 w-5 mr-3" />
                    <span>Notifications</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("privacy")}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "privacy"
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    <span>Privacy & Data</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("help")}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === "help"
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <HelpCircle className="h-5 w-5 mr-3" />
                    <span>Help & Support</span>
                  </button>
                </li>
              </ul>
            </nav>

            <div className="mt-8 pt-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-8 mt-8 md:mt-0 z-10">
          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center justify-between">
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
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Profile Information */}
          {activeTab === "profile" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-6 py-2 rounded-lg flex items-center ${
                        isLoading
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Security</h1>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium mb-2">
                        Current Password
                      </label>
                      <input
                        id="current-password"
                        type="password"
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                        Confirm New Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
                <p className="text-gray-400 mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Enable 2FA</span>
                </button>
              </div>
            </div>
          )}

          {/* Billing & Plans */}
          {activeTab === "billing" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Billing & Plans</h1>

              {/* Current Plan */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold">Current Plan</h2>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                        Free Plan
                      </span>
                    </div>
                    <p className="mt-2 text-gray-400">You are currently on the free plan with limited features.</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Upgrade Plan
                  </button>
                </div>
              </div>

              {/* Available Plans */}
              <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Free Plan */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-semibold">Free</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Basic chat functionality</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Up to 100 messages per day</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Standard response time</span>
                    </li>
                    <li className="flex items-center text-gray-500">
                      <X className="h-4 w-4 mr-2" />
                      <span>File uploads</span>
                    </li>
                    <li className="flex items-center text-gray-500">
                      <X className="h-4 w-4 mr-2" />
                      <span>Advanced AI models</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                    Current Plan
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gradient-to-b from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl border border-blue-700/50 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                  <h3 className="text-lg font-semibold">Pro</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-bold">$19</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Everything in Free</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Unlimited messages</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Faster response time</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>File uploads up to 100MB</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Access to GPT-4</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors">
                    Upgrade to Pro
                  </button>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-semibold">Enterprise</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Custom AI model training</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Unlimited file uploads</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>API access</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                    Contact Sales
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
                <p className="text-gray-400 mb-4">Add a payment method to upgrade your plan.</p>
                <button className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Add Payment Method</span>
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Notifications</h1>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-lg font-semibold mb-4">Email Notifications</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <h3 className="font-medium">New Features & Updates</h3>
                      <p className="text-sm text-gray-400">Receive emails about new features and updates.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <h3 className="font-medium">Security Alerts</h3>
                      <p className="text-sm text-gray-400">Get notified about security issues and login attempts.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <h3 className="font-medium">Marketing & Promotions</h3>
                      <p className="text-sm text-gray-400">Receive promotional offers and marketing emails.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium">Chat Notifications</h3>
                      <p className="text-sm text-gray-400">Get notified when you receive new messages.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Data */}
          {activeTab === "privacy" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Privacy & Data</h1>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Data Privacy Settings</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <h3 className="font-medium">Data Collection</h3>
                      <p className="text-sm text-gray-400">Allow us to collect usage data to improve our services.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <h3 className="font-medium">Chat History</h3>
                      <p className="text-sm text-gray-400">Store your chat history for future reference.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium">Personalization</h3>
                      <p className="text-sm text-gray-400">
                        Allow us to personalize your experience based on your usage.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-lg font-semibold mb-4">Data Management</h2>
                <p className="text-gray-400 mb-4">Manage your personal data and export or delete your information.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
                    <span>Export My Data</span>
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30 flex items-center justify-center">
                    <span>Delete My Account</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help & Support */}
          {activeTab === "help" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

              {/* FAQs */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>

                <div className="space-y-4">
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="font-medium mb-2">How do I upgrade my plan?</h3>
                    <p className="text-gray-400">
                      You can upgrade your plan by going to the Billing & Plans section in your account settings and
                      selecting the plan that best suits your needs.
                    </p>
                  </div>

                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="font-medium mb-2">Can I download my chat history?</h3>
                    <p className="text-gray-400">
                      Yes, you can export your chat history from the Privacy & Data section in your account settings.
                    </p>
                  </div>

                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="font-medium mb-2">How do I reset my password?</h3>
                    <p className="text-gray-400">
                      You can reset your password in the Security section of your account settings, or by clicking on
                      "Forgot Password" on the login page.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">What AI models are available?</h3>
                    <p className="text-gray-400">
                      The available AI models depend on your subscription plan. Free users have access to basic models,
                      while Pro and Enterprise users can access more advanced models like GPT-4.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
                <p className="text-gray-400 mb-4">
                  Need help with something not covered in the FAQs? Contact our support team.
                </p>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        placeholder="What do you need help with?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                        placeholder="Describe your issue in detail..."
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center"
                    >
                      <span>Submit Ticket</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
