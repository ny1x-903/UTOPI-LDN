"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or parent has interactive cursor attributes
      const viewTarget = target.closest("[data-cursor='view']");
      const linkTarget = target.closest("a, button, input, select, textarea, [role='button']");

      if (viewTarget) {
        setIsPointer(true);
        setCursorText("VIEW");
      } else if (linkTarget) {
        setIsPointer(true);
        setCursorText("");
      } else {
        setIsPointer(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Circle Ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none border border-white/60 bg-white/10 backdrop-invert"
        animate={{
          x: position.x - (cursorText ? 36 : isPointer ? 24 : 16),
          y: position.y - (cursorText ? 36 : isPointer ? 24 : 16),
          width: cursorText ? 72 : isPointer ? 48 : 32,
          height: cursorText ? 72 : isPointer ? 48 : 32,
          backgroundColor: cursorText ? "rgba(229, 9, 20, 0.85)" : isPointer ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
          borderColor: cursorText ? "rgba(229, 9, 20, 1)" : "rgba(255, 255, 255, 0.5)",
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 280,
          mass: 0.4,
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-white uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          opacity: cursorText ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 450,
          mass: 0.1,
        }}
      />
    </div>
  );
}
