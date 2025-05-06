"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Pause, Play, StopCircle, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void
  onCancel: () => void
}

export function VoiceRecorder({ onRecordingComplete, onCancel }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioURL, setAudioURL] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Request microphone access and set up recorder
  const setupRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)

        setAudioBlob(audioBlob)
        setAudioURL(audioUrl)
      }

      return true
    } catch (error) {
      console.error("Error accessing microphone:", error)
      return false
    }
  }

  // Start recording
  const startRecording = async () => {
    const isSetup = await setupRecorder()
    if (!isSetup) return

    if (mediaRecorderRef.current) {
      audioChunksRef.current = []
      mediaRecorderRef.current.start()
      setIsRecording(true)
      setIsPaused(false)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    }
  }

  // Pause recording
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause()
      setIsPaused(true)

      // Pause timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  // Resume recording
  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume()
      setIsPaused(false)

      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Handle submit recording
  const handleSubmit = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob)
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      if (audioURL) {
        URL.revokeObjectURL(audioURL)
      }
    }
  }, [audioURL])

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium mb-4">Voice Recorder</h3>

        {/* Recording time */}
        <div className="text-3xl font-mono mb-6">{formatTime(recordingTime)}</div>

        {/* Visualizer or waveform would go here */}
        <div className="w-full h-16 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 overflow-hidden">
          {isRecording && (
            <div className="h-full flex items-center justify-center">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 mx-0.5 bg-blue-500 rounded-full"
                  animate={{
                    height: isPaused ? "20%" : ["20%", `${Math.random() * 80 + 20}%`, "20%"],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          )}

          {!isRecording && audioURL && (
            <div className="h-full flex items-center justify-center">
              <audio ref={audioRef} src={audioURL} controls className="w-full h-8" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {!isRecording && !audioURL && (
            <button
              onClick={startRecording}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Start recording"
            >
              <Mic className="h-6 w-6" />
            </button>
          )}

          {isRecording && (
            <>
              {isPaused ? (
                <button
                  onClick={resumeRecording}
                  className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                  aria-label="Resume recording"
                >
                  <Play className="h-6 w-6" />
                </button>
              ) : (
                <button
                  onClick={pauseRecording}
                  className="p-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
                  aria-label="Pause recording"
                >
                  <Pause className="h-6 w-6" />
                </button>
              )}

              <button
                onClick={stopRecording}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                aria-label="Stop recording"
              >
                <StopCircle className="h-6 w-6" />
              </button>
            </>
          )}

          {audioURL && (
            <>
              <button
                onClick={startRecording}
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Record again"
              >
                <Mic className="h-6 w-6" />
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Use Recording
              </button>

              <button
                onClick={() => {
                  setAudioBlob(null)
                  setAudioURL(null)
                }}
                className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Delete recording"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Cancel button */}
        <button
          onClick={onCancel}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
