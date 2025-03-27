// app/components/BeforeAfterSlider.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  beforeData: { [key: string]: number | string };
  afterData: { [key: string]: number | string };
}

const BeforeAfterSlider: React.FC<Props> = ({ beforeData, afterData }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // Initial position in the middle

  const interpolatedData = (metric: string) => {
    if (typeof beforeData[metric] === 'number' && typeof afterData[metric] === 'number') {
        return (beforeData[metric] as number) + (afterData[metric] as number - beforeData[metric] as number) * (sliderPosition / 100);
    } else {
        return sliderPosition < 50 ? beforeData[metric] : afterData[metric];
    }
  };

  return (
    <div className="relative bg-gray-800 rounded-lg p-4 text-white">
      <h2 className="text-xl font-semibold mb-4">Health Metric Comparison</h2>

      <div className="mb-4">
        <label htmlFor="slider" className="block text-sm font-medium text-gray-300">
          Slide to Compare
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer thumb:h-5 thumb:w-5 thumb:rounded-full thumb:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Before</h3>
          <ul>
            {Object.keys(beforeData).map((key) => (
              <li key={key} className="flex justify-between py-1 border-b border-gray-700 last:border-b-0">
                <span>{key}:</span>
                <span>{beforeData[key]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">After</h3>
          <ul>
            {Object.keys(afterData).map((key) => (
              <li key={key}  className="flex justify-between py-1 border-b border-gray-700 last:border-b-0">
                <span>{key}:</span>
                <span>{afterData[key]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

return BeforeAfterSlider;