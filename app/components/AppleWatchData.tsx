// app/components/AppleWatchData.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  heartRate: number;
  stressLevel: number;
  sleepQuality: number;
}

const AppleWatchData: React.FC<Props> = ({ heartRate, stressLevel, sleepQuality }) => {
  const dataVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <motion.div
      className="bg-gray-900 text-white rounded-xl p-4 shadow-lg w-full"
      variants={dataVariants}
      initial="initial"
      animate="animate"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-300">Health Metrics</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Heart Rate:</span>
          <motion.span
            className="font-bold text-xl text-red-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {heartRate} bpm
          </motion.span>
        </div>

        <div className="flex items-center justify-between">
          <span>Stress Level:</span>
          <motion.span
            className={`font-bold text-xl ${
              stressLevel > 70 ? "text-orange-400" : "text-green-400"
            }`}
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {stressLevel}%
          </motion.span>
        </div>

        <div className="flex items-center justify-between">
          <span>Sleep Quality:</span>
          <motion.span
            className="font-bold text-xl text-blue-400"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            {sleepQuality}/100
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

return AppleWatchData;