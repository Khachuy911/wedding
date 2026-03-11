"use client"

import React, { useEffect, useRef, useState } from "react"

export const MusicToggle: React.FC = () => {
  const audioUrl = "/IDo-911.mp3"
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(audioUrl)
    audio.loop = true
    audioRef.current = audio

    // Hàm kích hoạt nhạc khi người dùng tương tác (bao gồm cả cuộn trang)
    const handleFirstInteraction = async () => {
      console.log("Phát hiện tương tác người dùng...")
      await startAudio()
    }

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction)
      window.removeEventListener("touchstart", handleFirstInteraction)
      window.removeEventListener("keydown", handleFirstInteraction)
      window.removeEventListener("scroll", handleFirstInteraction) // Gỡ bỏ lắng nghe cuộn
    }

    const startAudio = async () => {
      if (!audioRef.current) return

      try {
        await audioRef.current.play()
        setIsPlaying(true)
        removeListeners() // Dừng lắng nghe nếu đã phát thành công
      } catch (err) {
        console.warn("Autoplay vẫn chờ tương tác trực tiếp mạnh hơn (click/touch).")

        // Đăng ký lại các listener nếu lần thử đầu tiên thất bại
        window.addEventListener("click", handleFirstInteraction)
        window.addEventListener("touchstart", handleFirstInteraction)
        window.addEventListener("keydown", handleFirstInteraction)
        window.addEventListener("scroll", handleFirstInteraction, { passive: true })
      }
    }

    // Thử phát ngay khi vừa load (chỉ thành công nếu trình duyệt đã cấp quyền trước đó)
    startAudio()

    return () => {
      removeListeners()
      audio.pause()
      audioRef.current = null
    }
  }, [audioUrl])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        console.error("Lỗi khi phát nhạc thủ công:", error)
      }
    }
  }

  return (
    <button
      onClick={toggleMusic}
      aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
      className={`
        fixed bottom-20 left-6 z-[1001]
        p-3 text-white shadow-xl 
        transition-all duration-500 ease-in-out
        hover:scale-110 focus:outline-none 
        ${!isPlaying ? "animate-pulse" : "animate-spin-slow"}
      `}
      style={{
        background: "#df4758",
        borderRadius: "50%",
        border: "4px solid #fa9ea8ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {isPlaying ? <VolumeOnIcon /> : <VolumeOffIcon />}
    </button>
  )
}

// --- Icons (Giữ nguyên) ---
const VolumeOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 16 16">
    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
    <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
  </svg>
)

const VolumeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 16 16">
    <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.147 2.473a.5.5 0 0 0-.708 0L12 7.293l-1.146-1.147a.5.5 0 0 0-.708.708L11.293 8l-1.147 1.146a.5.5 0 0 0 .708.708L12 8.707l1.146 1.147a.5.5 0 0 0 .708-.708L12.707 8l1.147-1.146a.5.5 0 0 0 0-.708z" />
  </svg>
)