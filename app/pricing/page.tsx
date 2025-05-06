"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, X, CreditCard, Zap, Shield, MessageSquare, FileText, Upload, Clock, Database } from "lucide-react"

export default function Pricing() {
  const router = useRouter()
  const [isAnnual, setIsAnnual] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("chatgpt_user_logged_in") === "true"
    setIsLoggedIn(loggedIn)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSubscribe = (plan: string) => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // For demo purposes, just redirect to account page
    router.push("/my-account?tab=billing")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            NexusChat
          </Link>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
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
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Choose the Perfect Plan for Your Needs
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Unlock the full potential of AI with our flexible pricing plans designed for everyone from individuals to
            enterprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${isAnnual ? "text-white" : "text-gray-400"}`}>Annual</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!isAnnual}
                onChange={() => setIsAnnual(!isAnnual)}
              />
              <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className={`ml-3 ${!isAnnual ? "text-white" : "text-gray-400"}`}>Monthly</span>

            {isAnnual && (
              <span className="ml-4 bg-green-500/20 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 flex flex-col h-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Free</h2>
              <p className="text-gray-400 mb-4">Perfect for getting started</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-400 ml-2">/forever</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Basic chat functionality</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Up to 100 messages per day</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Standard response time</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Access to basic AI model</span>
              </li>
              <li className="flex items-start text-gray-500">
                <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>File uploads</span>
              </li>
              <li className="flex items-start text-gray-500">
                <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Advanced AI models</span>
              </li>
              <li className="flex items-start text-gray-500">
                <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
            </ul>

            <button
              onClick={() => handleSubscribe("free")}
              className="w-full py-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
            >
              {isLoggedIn ? "Current Plan" : "Get Started"}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl border border-blue-700/50 p-8 flex flex-col h-full relative overflow-hidden transform scale-105 shadow-xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-4 py-1 rounded-bl-lg">POPULAR</div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Pro</h2>
              <p className="text-gray-300 mb-4">For power users and professionals</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">${isAnnual ? "19" : "24"}</span>
                <span className="text-gray-300 ml-2">/{isAnnual ? "month" : "month"}</span>
              </div>
              {isAnnual && <p className="text-green-400 text-sm mt-2">Billed annually (${19 * 12}/year)</p>}
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Unlimited</strong> messages
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Faster response time</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>File uploads up to 100MB</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Access to GPT-4</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Standard support</span>
              </li>
              <li className="flex items-start text-gray-400">
                <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Custom AI model training</span>
              </li>
            </ul>

            <button
              onClick={() => handleSubscribe("pro")}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              {isLoggedIn ? "Upgrade to Pro" : "Get Started"}
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 flex flex-col h-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
              <p className="text-gray-400 mb-4">For teams and businesses</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">${isAnnual ? "99" : "119"}</span>
                <span className="text-gray-400 ml-2">/{isAnnual ? "month" : "month"}</span>
              </div>
              {isAnnual && <p className="text-green-400 text-sm mt-2">Billed annually (${99 * 12}/year)</p>}
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Custom AI model training</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Unlimited file uploads</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>API access</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Team management</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Advanced analytics</span>
              </li>
            </ul>

            <button
              onClick={() => handleSubscribe("enterprise")}
              className="w-full py-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Compare All Features</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-center">Free</th>
                  <th className="py-4 px-6 text-center bg-blue-900/20">Pro</th>
                  <th className="py-4 px-6 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                    <span>Daily Messages</span>
                  </td>
                  <td className="py-4 px-6 text-center">100</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">Unlimited</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                    <span>AI Models</span>
                  </td>
                  <td className="py-4 px-6 text-center">Basic</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">GPT-4</td>
                  <td className="py-4 px-6 text-center">GPT-4 + Custom</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-green-400" />
                    <span>File Uploads</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-gray-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">Up to 100MB</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-purple-400" />
                    <span>Response Time</span>
                  </td>
                  <td className="py-4 px-6 text-center">Standard</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">Fast</td>
                  <td className="py-4 px-6 text-center">Priority</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-400" />
                    <span>Support</span>
                  </td>
                  <td className="py-4 px-6 text-center">Community</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">Standard</td>
                  <td className="py-4 px-6 text-center">Priority</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-orange-400" />
                    <span>History Retention</span>
                  </td>
                  <td className="py-4 px-6 text-center">7 days</td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">Unlimited</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-blue-400" />
                    <span>API Access</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-gray-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">Limited</td>
                  <td className="py-4 px-6 text-center">Full Access</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-green-400" />
                    <span>Custom Branding</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-gray-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-900/10">
                    <X className="h-5 w-5 text-gray-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold mb-3">Can I change plans at any time?</h3>
              <p className="text-gray-300">
                Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes to your subscription
                will take effect immediately.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold mb-3">How does the billing work?</h3>
              <p className="text-gray-300">
                For monthly plans, you'll be billed every month on the date you subscribed. For annual plans, you'll be
                billed once a year. We accept all major credit cards and PayPal.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-gray-300">
                We offer a 7-day free trial for our Pro plan. You can cancel anytime during the trial period and you
                won't be charged.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold mb-3">What happens if I exceed my plan limits?</h3>
              <p className="text-gray-300">
                If you exceed your plan limits, you'll be notified and given the option to upgrade to a higher plan. We
                won't automatically charge you for overages.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the power of AI with our platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={isLoggedIn ? "/my-account?tab=billing" : "/signup"}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors text-lg font-medium"
            >
              {isLoggedIn ? "Upgrade Now" : "Sign Up Free"}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors text-lg font-medium"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 mt-24 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">NexusChat</h3>
              <p className="text-gray-400">Powerful AI assistant for all your needs. Get started for free today.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/enterprise" className="text-gray-400 hover:text-white">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-gray-400 hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-gray-400 hover:text-white">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 NexusChat. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
