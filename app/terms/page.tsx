"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function TermsOfService() {
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
            <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
            <p className="text-gray-400">Last updated: May 6, 2025</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to NexusChat ("we," "our," or "us"). These Terms of Service ("Terms") govern your access
              to and use of our website, products, and services (collectively, the "Services").
            </p>
            <p className="mb-4">
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
              Terms, you may not access or use the Services.
            </p>
            <p>
              We may modify these Terms at any time. If we do so, we will notify you by posting the modified Terms on
              the Site or through other communications. It is important that you review the Terms whenever we modify
              them because if you continue to use the Services after we have modified the Terms, you are agreeing to be
              bound by the modified Terms.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p className="mb-4">
              You must be at least 13 years of age to access or use our Services. By accessing or using our Services,
              you represent and warrant that you are at least 13 years of age and have the legal capacity to enter into
              these Terms.
            </p>
            <p>
              If you are accessing or using our Services on behalf of a company, organization, or other entity, you
              represent and warrant that you have the authority to bind that entity to these Terms, in which case "you"
              will refer to that entity.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p className="mb-4">
              To access certain features of our Services, you may be required to register for an account. When you
              register for an account, you agree to provide accurate, current, and complete information about yourself.
            </p>
            <p className="mb-4">
              You are responsible for safeguarding your account credentials and for any activity that occurs under your
              account. You agree to notify us immediately of any unauthorized use of your account or any other breach of
              security.
            </p>
            <p>
              We reserve the right to disable your account at any time, including if we believe that you have violated
              these Terms.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payments</h2>
            <p className="mb-4">
              Some of our Services require payment of fees. If you choose to subscribe to a paid Service, you agree to
              pay all fees associated with the Service.
            </p>
            <p className="mb-4">
              We use third-party payment processors to bill you through a payment account linked to your account. The
              processing of payments will be subject to the terms, conditions, and privacy policies of the payment
              processor, in addition to these Terms.
            </p>
            <p className="mb-4">
              Subscription fees are billed in advance on a monthly or annual basis, depending on the subscription plan
              you select. Unless otherwise stated, subscriptions automatically renew at the end of each billing period.
            </p>
            <p>
              You may cancel your subscription at any time, but no refunds will be provided for any unused portion of
              your current billing period.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
            <p className="mb-4">
              Our Services may allow you to create, upload, post, send, receive, and store content, including messages,
              text, photos, and other materials (collectively, "User Content").
            </p>
            <p className="mb-4">
              You retain all rights in and to your User Content. By creating, uploading, posting, sending, receiving, or
              storing User Content on or through our Services, you grant us a worldwide, non-exclusive, royalty-free
              license to use, host, store, reproduce, modify, adapt, create derivative works from, publish, transmit,
              and distribute your User Content for the purpose of operating, developing, providing, promoting, and
              improving the Services.
            </p>
            <p>
              You represent and warrant that you have all rights necessary to grant us the license above and that your
              User Content does not violate any law or infringe the rights of any third party.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Prohibited Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                Use the Services in any manner that could interfere with, disrupt, negatively affect, or inhibit other
                users from fully enjoying the Services;
              </li>
              <li>
                Use the Services in any way that could damage, disable, overburden, or impair the functioning of the
                Services;
              </li>
              <li>Violate any applicable law or regulation;</li>
              <li>
                Upload, post, or transmit any User Content that is illegal, harmful, threatening, abusive, harassing,
                tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially,
                ethnically, or otherwise objectionable;
              </li>
              <li>
                Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a
                person or entity;
              </li>
              <li>
                Upload, post, or transmit any unsolicited or unauthorized advertising, promotional materials, "junk
                mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation;
              </li>
              <li>
                Upload, post, or transmit any material that contains software viruses or any other computer code, files,
                or programs designed to interrupt, destroy, or limit the functionality of any computer software or
                hardware or telecommunications equipment;
              </li>
              <li>
                Attempt to gain unauthorized access to the Services, other accounts, computer systems, or networks
                connected to the Services;
              </li>
              <li>
                Use any robot, spider, crawler, scraper, or other automated means to access the Services or to collect
                or harvest data from the Services;
              </li>
              <li>Use the Services to send altered, deceptive, or false source-identifying information.</li>
            </ul>
            <p>
              We reserve the right to investigate and take appropriate legal action against anyone who, in our sole
              discretion, violates this provision, including removing the offending content from the Services,
              suspending or terminating the account of such violators, and reporting the violator to law enforcement
              authorities.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p className="mb-4">
              The Services and all content and materials included on the Services, including, but not limited to, text,
              graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software,
              are the property of NexusChat or its licensors and are protected by copyright, trademark, and
              other intellectual property laws.
            </p>
            <p>
              You may not use, reproduce, distribute, modify, create derivative works of, publicly display, publicly
              perform, republish, download, store, or transmit any of the material on our Services, except as it is
              created and owned by you, or as may be otherwise expressly permitted in writing by NexusChat.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
            <p className="mb-4">
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p className="mb-4">
              CHATGPT INTERFACE DOES NOT WARRANT THAT THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR
              THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY
              TO YOU.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              IN NO EVENT WILL CHATGPT INTERFACE, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES,
              AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF
              OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, INCLUDING ANY DIRECT, INDIRECT,
              SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY,
              PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED
              SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE),
              BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY FOR CERTAIN TYPES OF DAMAGES, SO THE ABOVE
              LIMITATION MAY NOT APPLY TO YOU.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless NexusChat, its affiliates, licensors, and
              service providers, and its and their respective officers, directors, employees, contractors, agents,
              licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages,
              judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of
              or relating to your violation of these Terms or your use of the Services, including, but not limited to,
              your User Content, any use of the Services' content, services, and products other than as expressly
              authorized in these Terms, or your use of any information obtained from the Services.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and bar access to the Services immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
              not limited to a breach of the Terms.
            </p>
            <p>
              If you wish to terminate your account, you may simply discontinue using the Services, or you may contact
              us at support@chatgptinterface.com.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California,
              without giving effect to any principles of conflicts of law. Any dispute arising from or relating to the
              subject matter of these Terms shall be finally settled by arbitration in San Francisco, California, using
              the English language in accordance with the Arbitration Rules and Procedures of JAMS then in effect, by
              one commercial arbitrator with substantial experience in resolving intellectual property and commercial
              contract disputes.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p className="mb-4">If you have any questions about these Terms, please contact us at:</p>
            <p className="mb-2">NexusChat</p>
            <p className="mb-2">123 AI Street, Suite 456</p>
            <p className="mb-2">San Francisco, CA 94107</p>
            <p className="mb-2">Email: legal@chatgptinterface.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>

          <div className="mt-12 flex justify-between items-center">
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300 flex items-center">
              <span>Privacy Policy</span>
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
