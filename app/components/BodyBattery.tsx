// app/components/BodyBattery.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  level: number; // Body Battery level (0-100)
}

const BodyBattery: React.FC<Props> = ({ level }) => {
  // Ensure level is within 0-100 range
  const clampedLevel = Math.max(0, Math.min(level, 100));

  // Calculate strokeDashoffset for the circular progress
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedLevel / 100) * circumference;

  // Calculate color based on level (red to green)
  const color = `hsl(${clampedLevel * 1.2}, 100%, 50%)`;

  return (
    <div className="relative w-48 h-48">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="stroke-gray-300 stroke-[10] fill-transparent"
          cx="50%"
          cy="50%"
          r={radius}
        />
        <motion.circle
          className="stroke-[10] fill-transparent"
          cx="50%"
          cy="50%"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-bold">{clampedLevel}%</div>
        <div className="text-sm text-gray-500">Body Battery</div>
      </div>
    </div>
  );
};

return BodyBattery;