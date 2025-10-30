"use client"

import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react"
import { Mic, Paperclip, SendHorizonal, X, Square } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { addMessage, setAiFetching, setChatId } from "@/store/Reducers/chatSlice"
import { uIdProvider } from "@/feature/uid"
import { getAiResponse } from "@/service/api.project"
import { addTabs } from "@/store/Reducers/chatTabs"

interface SelectedImage {
  id: number
  url: string | ArrayBuffer | null
  name: string
}

export default function ChatInput({ projectId }: { projectId: string }) {
  const [message, setMessage] = useState<string>("")
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recordingTime, setRecordingTime] = useState<number>(0)
  const [isListening, setIsListening] = useState<boolean>(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recognitionRef = useRef<any>(null)
  const recordingIntervalRef = useRef<NodeJS.Timer | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const currentChatId = useAppSelector(state => state.bricksChat).chatId

  const dispatch = useAppDispatch()
  // Smooth textarea height adjustment
  useEffect(() => {
    const textarea = textareaRef.current
    const wrapper = wrapperRef.current
    if (!textarea || !wrapper) return

    textarea.style.height = "auto"
    const newHeight = Math.min(textarea.scrollHeight, 160)
    textarea.style.height = `${newHeight}px`
    wrapper.style.alignItems = newHeight > 48 ? "flex-end" : "center"
  }, [message])

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current as any)
      }
      setRecordingTime(0)
    }
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current as any)
    }
  }, [isRecording])

  // Cleanup
  useEffect(() => {
    return () => stopSpeechRecognition()
  }, [])

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
  }

  const setupSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => setIsListening(true)

    recognition.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " "
        } else {
          interimTranscript += transcript
        }
      }

      if (finalTranscript) {
        setMessage(prev => prev + finalTranscript)
      }
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
    }

    recognition.onend = () => {
      setIsListening(false)
      if (isRecording) {
        try {
          recognition.start()
        } catch (e) {
          console.error("Error restarting recognition:", e)
        }
      }
    }

    recognitionRef.current = recognition
    try {
      recognition.start()
    } catch (e) {
      console.error("Error starting recognition:", e)
    }
  }

  const handleMicClick = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop()
      }
      setIsRecording(false)
      stopSpeechRecognition()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream

        const mediaRecorder = new MediaRecorder(stream)
        const audioChunks: BlobPart[] = []

        mediaRecorder.ondataavailable = e => audioChunks.push(e.data)
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" })
        }

        mediaRecorder.start()
        mediaRecorderRef.current = mediaRecorder
        setIsRecording(true)

        // Speech-to-text
        setupSpeechRecognition()
      } catch (err) {
        console.error("Microphone access denied:", err)
        alert("Microphone access is required for voice input")
      }
    }
  }

  const handleSend = async () => {
    setMessage("");

    if (!message.trim() && selectedImages.length === 0) return;

    // Dispatch user's message first
    dispatch(addMessage({
      chatId: currentChatId,
      message: {
        id: uIdProvider(),
        role: "user",
        content: message,
        ...(selectedImages[0] && selectedImages[0].url && { image: selectedImages[0].url })
      }
    }));

    dispatch(setAiFetching(true));

    const result = await getAiResponse(projectId, currentChatId, message);

    if (result) {
      if (!currentChatId && result?.chat?._id) {
        dispatch(addTabs(result.chat))
        dispatch(setChatId(result.chat._id));
      }

      dispatch(addMessage({
        chatId: result.chat._id,
        message: result.message,
      }));
    }

    dispatch(setAiFetching(false));

    setSelectedImages([]);
  };


  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setSelectedImages([
        {
          id: Date.now(),
          url: event.target?.result as string,
          name: file.name,
        },
      ])
    }
    reader.readAsDataURL(file)

    e.target.value = "" // reset input
  }


  const removeImage = (id: number) => {
    setSelectedImages(prev => prev.filter(img => img.id !== id))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="absolute w-full max-w-3xl mx-auto px-4 pb-4 bottom-0 left-0 right-0 bg-[#212121]">
      {/* Image Previews */}
      {selectedImages.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedImages.map(img => (
            <div key={img.id} className="relative group">
              <img
                src={img.url as string}
                alt={img.name}
                className="w-20 h-20 object-cover rounded-lg border border-[#424242]"
              />
              <button
                onClick={() => removeImage(img.id)}
                className="absolute -top-2 -right-2 bg-[#ececec] text-[#0d0d0d] rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Recording Indicator */}
      {isRecording && (
        <div className="mb-3 flex items-center justify-between bg-[#2f2f2f] border border-[#424242] rounded-lg px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[#ececec] text-sm font-medium">
              {isListening ? "Listening..." : "Recording"}
            </span>
          </div>
          <span className="text-[#8e8e8e] text-sm">{formatTime(recordingTime)}</span>
        </div>
      )}

      {/* Input Bar */}
      <div
        ref={wrapperRef}
        className="relative flex items-center gap-2 bg-[#2f2f2f] border border-[#424242] rounded-3xl px-3 py-2 shadow-lg focus-within:border-[#565656] transition-all duration-200"
      >
        {/* Attach Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-[#ececec] hover:bg-[#3e3e3e] rounded-lg transition-colors duration-200 flex-shrink-0"
          aria-label="Attach file"
        >
          <Paperclip size={20} />
        </button>

        {/* Textarea */}
        <div className="flex-1 flex items-end">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message ChatGPT"
            rows={1}
            disabled={isRecording}
            className="w-full resize-none bg-transparent text-[#ececec] placeholder-[#8e8e8e] outline-none text-[15px] overflow-y-auto py-1.5 max-h-[160px] leading-relaxed disabled:opacity-50 hide-scrollbar"
          />
        </div>

        {/* Mic & Send Buttons */}
        <button
          type="button"
          onClick={handleMicClick}
          className={`p-[5px] rounded-lg transition-colors duration-200 flex-shrink-0 ${isRecording
            ? "bg-red-500 text-white hover:bg-red-600"
            : "text-[#ececec] hover:bg-[#3e3e3e]"
            }`}
          aria-label={isRecording ? "Stop recording" : "Voice input"}
        >
          {isRecording ? <Square size={14} fill="currentColor" /> : <Mic size={20} />}
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim() && selectedImages.length === 0}
          className="p-2 bg-[#ececec] text-[#0d0d0d] hover:bg-[#d9d9d9] rounded-full transition-colors duration-200 flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <SendHorizonal size={16} />
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-[#8e8e8e] mt-3 select-none">
        © 2025 BRICKS AI. All rights reserved.
      </p>
    </div>
  )
}
