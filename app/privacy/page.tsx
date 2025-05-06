"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function PrivacyPolicy() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
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
            <Link href="/login" className="px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors duration-200">
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: May 6, 2025</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              At NexusChat ("we," "our," or "us"), we respect your privacy and are committed to protecting your
              personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our website, products, and services (collectively, the "Services").
            </p>
            <p className="mb-4">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
              please do not access or use our Services.
            </p>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will notify
              you of any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to
              periodically review this Privacy Policy to stay informed of updates.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="mb-4">We may collect several types of information from and about users of our Services:</p>

            <h3 className="text-xl font-medium mb-2">2.1 Personal Data</h3>
            <p className="mb-4">Personal Data is information that can be used to identify you individually, such as:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Billing information (credit card details, billing address)</li>
              <li>Profile information (profile picture, bio)</li>
              <li>User preferences and settings</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">2.2 Usage Data</h3>
            <p className="mb-4">We may also collect information about how you access and use our Services, such as:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Time and date of your visit</li>
              <li>Pages you view</li>
              <li>Time spent on pages</li>
              <li>Links you click</li>
              <li>Search terms you use</li>
              <li>Other actions you take on our Services</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">2.3 User Content</h3>
            <p>
              We collect and store the content you create, upload, or receive from others when using our Services,
              including your messages, files, images, and other materials.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Collect Information</h2>
            <p className="mb-4">We collect information in the following ways:</p>

            <h3 className="text-xl font-medium mb-2">3.1 Information You Provide</h3>
            <p className="mb-4">We collect information you provide when you:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Register for an account</li>
              <li>Complete your profile</li>
              <li>Subscribe to a paid plan</li>
              <li>Contact our support team</li>
              <li>Participate in surveys or promotions</li>
              <li>Post content or comments</li>
              <li>Use our chat features</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">3.2 Automated Collection</h3>
            <p className="mb-4">When you use our Services, we may automatically collect certain information through:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Cookies and similar tracking technologies</li>
              <li>Log files</li>
              <li>Web beacons</li>
              <li>Analytics tools</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">3.3 Third-Party Sources</h3>
            <p>We may receive information about you from third-party sources, such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Social media platforms, if you connect your account</li>
              <li>Payment processors</li>
              <li>Marketing partners</li>
              <li>Public databases</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
            <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Provide customer support</li>
              <li>Communicate with you about products, services, offers, promotions, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience</li>
              <li>Develop new products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>
              We may combine the information we collect from you with information we receive from third parties to help
              us improve our Services and to provide more tailored communications.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. How We Share Your Information</h2>
            <p className="mb-4">We may share your information in the following circumstances:</p>

            <h3 className="text-xl font-medium mb-2">5.1 Service Providers</h3>
            <p className="mb-4">
              We may share your information with third-party vendors, service providers, contractors, or agents who
              perform services for us or on our behalf, such as payment processing, data analysis, email delivery,
              hosting services, customer service, and marketing assistance.
            </p>

            <h3 className="text-xl font-medium mb-2">5.2 Business Transfers</h3>
            <p className="mb-4">
              If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of company
              assets, your information may be transferred as part of that transaction.
            </p>

            <h3 className="text-xl font-medium mb-2">5.3 Legal Requirements</h3>
            <p className="mb-4">
              We may disclose your information if required to do so by law or in response to valid requests by public
              authorities (e.g., a court or government agency).
            </p>

            <h3 className="text-xl font-medium mb-2">5.4 Protection of Rights</h3>
            <p className="mb-4">
              We may disclose your information to protect the rights, property, or safety of NexusChat, our
              users, or others.
            </p>

            <h3 className="text-xl font-medium mb-2">5.5 With Your Consent</h3>
            <p>We may share your information with third parties when you have given us your consent to do so.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our Services and to hold certain
              information. Cookies are files with a small amount of data that may include an anonymous unique
              identifier. Cookies are sent to your browser from a website and stored on your device.
            </p>
            <p className="mb-4">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly.
              </li>
              <li>
                <strong>Preference Cookies:</strong> These cookies remember your preferences and settings.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our
                website.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> These cookies track your online activity to help advertisers deliver
                more relevant advertising.
              </li>
            </ul>
            <p className="mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our Services.
            </p>
            <p>
              We also use web beacons (clear GIFs, pixel tags) to understand how users interact with our Services and to
              improve our marketing campaigns.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
            <p className="mb-4">
              We have implemented appropriate technical and organizational security measures designed to protect the
              security of any personal information we process. However, please also remember that we cannot guarantee
              that the internet itself is 100% secure.
            </p>
            <p>
              Although we will do our best to protect your personal information, transmission of personal information to
              and from our Services is at your own risk. You should only access the Services within a secure
              environment.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
            <p className="mb-4">
              We will retain your personal information only for as long as is necessary for the purposes set out in this
              Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal
              obligations, resolve disputes, and enforce our policies.
            </p>
            <p>
              When you delete your account, we may continue to retain certain information about you as required by law
              or for legitimate business purposes, including to help prevent fraud and abuse, enforce our agreements,
              and protect our legal rights.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Your Data Protection Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Right to Access:</strong> You have the right to request copies of your personal information.
              </li>
              <li>
                <strong>Right to Rectification:</strong> You have the right to request that we correct any information
                you believe is inaccurate or complete information you believe is incomplete.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You have the right to request that we erase your personal
                information, under certain conditions.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the
                processing of your personal information, under certain conditions.
              </li>
              <li>
                <strong>Right to Object to Processing:</strong> You have the right to object to our processing of your
                personal information, under certain conditions.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You have the right to request that we transfer the data we
                have collected to another organization, or directly to you, under certain conditions.
              </li>
            </ul>
            <p>
              If you would like to exercise any of these rights, please contact us at privacy@chatgptinterface.com. We
              will respond to your request within 30 days.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
            <p className="mb-4">
              Our Services are not intended for children under the age of 13. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and you are aware that your child has
              provided us with personal information, please contact us so that we can take necessary actions.
            </p>
            <p>
              If we become aware that we have collected personal information from children without verification of
              parental consent, we take steps to remove that information from our servers.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to, and maintained on, computers located outside of your state,
              province, country, or other governmental jurisdiction where the data protection laws may differ from those
              in your jurisdiction.
            </p>
            <p>
              If you are located outside the United States and choose to provide information to us, please note that we
              transfer the data, including personal information, to the United States and process it there. Your consent
              to this Privacy Policy followed by your submission of such information represents your agreement to that
              transfer.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Third-Party Links</h2>
            <p>
              Our Services may contain links to third-party websites and services that are not owned or controlled by
              NexusChat. We have no control over, and assume no responsibility for, the content, privacy
              policies, or practices of any third-party websites or services. You further acknowledge and agree that
              NexusChat shall not be responsible or liable, directly or indirectly, for any damage or loss
              caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods,
              or services available on or through any such websites or services.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mb-2">NexusChat</p>
            <p className="mb-2">123 AI Street, Suite 456</p>
            <p className="mb-2">San Francisco, CA 94107</p>
            <p className="mb-2">Email: privacy@chatgptinterface.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>

          <div className="mt-12 flex justify-between items-center">
            <Link href="/terms" className="text-blue-400 hover:text-blue-300 flex items-center">
              <span>Terms of Service</span>
              <ExternalLink className="h-4 w-4 ml-1" />
            </Link>
            <Link href="/contact" className="text-blue-400 hover:text-blue-300">
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 mt-24 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 NexusChat. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
