"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "../lib/utils";

export interface AudioPlayerProps {
  src?: string;
  songName?: string;
  position?: "bottom-left" | "bottom-center";
  className?: string;
}

const FALLBACK_SOURCES = [
  "/assets/Adventurous%20Travel%20Background%20Music%20%231.mp3",
  "/assets/Hidupnya_insan.mp3",
  "/assets/backgroundmusic.mp3",
  "/assets/backgroundmusic1.mp3",
];

export function AudioPlayer({
  src = "/assets/Adventurous%20Travel%20Background%20Music%20%231.mp3",
  songName,
  position = "bottom-left",
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fallbackIndexRef = useRef(0);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio playback error:", err));
    }
  };

  const handleAudioError = () => {
    if (fallbackIndexRef.current < FALLBACK_SOURCES.length) {
      const nextSrc = FALLBACK_SOURCES[fallbackIndexRef.current];
      fallbackIndexRef.current += 1;
      if (nextSrc !== currentSrc) {
        setCurrentSrc(nextSrc);
      }
    }
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Auto-play blocked or error:", err));
      }
    };

    // Attempt immediate playback on mount (opening-cover step)
    playAudio();

    // Fallback: If browser policy blocks autoplay without user gesture, trigger on first interaction anywhere
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        playAudio();
      }
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    // Also handle explicit custom event (e.g. from Opening Cover Buka button)
    const handleStartAudio = () => {
      playAudio();
    };

    window.addEventListener("start_bg_audio", handleStartAudio);

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("start_bg_audio", handleStartAudio);
    };
  }, [currentSrc]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (isPlaying) {
        audioRef.current.play().catch(() => { });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const isBottomCenter = position === "bottom-center";

  return (
    <div
      className={cn(
        "audio-player-fixed-container pointer-events-auto",
        isBottomCenter ? "position-bottom-center" : "position-bottom-left",
        className
      )}
      style={{
        position: "fixed",
        zIndex: 999999,
      }}
    >
      <style>{`
        .audio-player-fixed-container.position-bottom-left {
          bottom: 5rem;
          left: 1rem;
        }
        @media (min-width: 640px) {
          .audio-player-fixed-container.position-bottom-left {
            left: 1.5rem !important;
          }
        }
        @media (min-width: 1024px) {
          .audio-player-fixed-container.position-bottom-left {
            bottom: 2rem !important;
            left: 2rem !important;
          }
        }

        .audio-player-fixed-container.position-bottom-center {
          bottom: 4.75rem;
          left: 50%;
          transform: translateX(-50%);
        }
        @media (min-width: 1024px) {
          .audio-player-fixed-container.position-bottom-center {
            bottom: 1.5rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
      <audio
        ref={audioRef}
        src={currentSrc}
        onError={handleAudioError}
        controlsList="nodownload"
        loop
        autoPlay
        preload="auto"
        className="hidden"
      />
      <motion.button
        id="kohasil-audio-btn"
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-xl border backdrop-blur-md transition-all duration-300 pointer-events-auto"
        style={{
          background: isPlaying ? "var(--color-brand-green, #00473c)" : "rgba(255,255,255,0.92)",
          borderColor: "var(--color-brand-gold, #c99a00)",
          color: isPlaying ? "#fff" : "var(--color-brand-green, #00473c)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
        type="button"
        aria-label={isPlaying ? "Jeda Muzik Latar" : "Mainkan Muzik Latar"}
        title={isPlaying ? "Jeda Muzik Latar" : "Mainkan Muzik Latar"}
      >
        <div
          className="flex h-6 w-6 items-center justify-center rounded-full shrink-0"
          style={{ background: isPlaying ? "rgba(255,255,255,0.2)" : "var(--color-brand-sage-soft, #f0faf2)" }}
        >
          {isPlaying ? (
            <Volume2 className="h-4 w-4 text-amber-300 animate-pulse" />
          ) : (
            <VolumeX className="h-4 w-4 text-slate-500" />
          )}
        </div>

        {songName && (
          <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap px-0.5 drop-shadow-sm">
            {songName}
          </span>
        )}

        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3 ml-0.5 shrink-0">
            <span className="w-0.5 h-3 bg-amber-300 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-2 bg-amber-300 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-3.5 bg-amber-300 animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        )}
      </motion.button>
    </div>
  );
}


