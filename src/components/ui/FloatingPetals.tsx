"use client";

import React, { useMemo } from "react";

interface Petal {
  id: number;
  left: string;
  size: string;
  delay: string;
  duration: string;
  swayDuration: string;
  emoji: string;
  opacity: number;
}

const PETAL_EMOJIS = ["🌸", "🌺", "🌹", "💮", "🌷"];

export function FloatingPetals({ count = 12, className = "" }: { count?: number; className?: string }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 14 + 12}px`,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 8 + 10}s`,
        swayDuration: `${Math.random() * 4 + 4}s`,
        emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
        opacity: Math.random() * 0.4 + 0.2,
      })),
    [count]
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            top: "-30px",
            fontSize: petal.size,
            opacity: petal.opacity,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            animationName: "float-petal, sway",
            animationTimingFunction: "linear, ease-in-out",
            animationIterationCount: "infinite",
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
}
