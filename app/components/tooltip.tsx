"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  delay?: number
}

export function Tooltip({ content, children, position = "top", delay = 300 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const showTooltip = () => {
    setIsHovering(true)
    timerRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const hideTooltip = () => {
    setIsHovering(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // Position styles
  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "8px" }
      case "bottom":
        return { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px" }
      case "left":
        return { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "8px" }
      case "right":
        return { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "8px" }
      default:
        return { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "8px" }
    }
  }

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.15,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.15,
      },
    },
  }

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-800 rounded-md shadow-sm whitespace-nowrap"
            style={getPositionStyles()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
          >
            {content}
            <div
              className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45 ${
                position === "top"
                  ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                  : position === "bottom"
                    ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    : position === "left"
                      ? "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
                      : "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
