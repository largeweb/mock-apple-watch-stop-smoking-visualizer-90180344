// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppleWatchData from "./components/AppleWatchData";
import BodyBattery from "./components/BodyBattery";
import BeforeAfterSlider from "./components/BeforeAfterSlider";

// Utility function to generate a random number within a range
const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mock data generation functions
const generateMockHeartRate = (time: number, scenario: string): number => {
  let baseRate = 70; // Resting heart rate
  if (scenario === "exercising") {
    baseRate = 120; // Elevated heart rate during exercise
  } else if (scenario === "after-quitting") {
    baseRate = 60; // Lower heart rate after quitting
  }
  // Simulate a slight variation around the base rate
  const variation = Math.sin(time / 10) * 5;
  return baseRate + variation + randomNumber(-2, 2);
};

const generateMockStressLevel = (time: number, scenario: string): number => {
  let baseStress = 40; // Moderate stress level
  if (scenario === "stressed") {
    baseStress = 70; // High stress level
  } else if (scenario === "after-quitting") {
    baseStress = 20; // Lower stress level after quitting
  }
  // Simulate a slight variation around the base stress
  const variation = Math.cos(time / 10) * 10;
  return baseStress + variation + randomNumber(-5, 5);
};

const generateMockSleepQuality = (time: number, scenario: string): number => {
  let baseQuality = 70; // Good sleep quality
  if (scenario === "poor-sleep") {
    baseQuality = 50; // Poor sleep quality
  } else if (scenario === "after-quitting") {
    baseQuality = 90; // Improved sleep quality after quitting
  }
  // Simulate a slight variation around the base quality
  const variation = Math.sin(time / 5) * 5;
  return baseQuality + variation + randomNumber(-3, 3);
};

export default function Home() {
  const [time, setTime] = useState(0);
  const [scenario, setScenario] = useState("starting"); // Scenarios: starting, exercising, stressed, after-quitting
  const [heartRate, setHeartRate] = useState(generateMockHeartRate(time, scenario));
  const [stressLevel, setStressLevel] = useState(generateMockStressLevel(time, scenario));
  const [sleepQuality, setSleepQuality] = useState(generateMockSleepQuality(time, scenario));
  const [bodyBattery, setBodyBattery] = useState(50);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
      setHeartRate(generateMockHeartRate(time, scenario));
      setStressLevel(generateMockStressLevel(time, scenario));
      setSleepQuality(generateMockSleepQuality(time, scenario));

      // Simulate Body Battery increasing over time when "after-quitting"
      if (scenario === "after-quitting" && bodyBattery < 100) {
        setBodyBattery((prevBattery) => Math.min(prevBattery + 0.5, 100));
      }
    }, 200);

    return () => clearInterval(interval);
  }, [time, scenario, bodyBattery]);

  // Mock data for BeforeAfterSlider
  const beforeData = {
    heartRate: 85,
    lungCapacity: 4,
    energyLevels: 30
  };

  const afterData = {
    heartRate: 70,
    lungCapacity: 5.5,
    energyLevels: 80
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center p-4">
      {/* Apple Watch Data */}
      <div className="md:w-1/2 p-4">
        <AppleWatchData
          heartRate={heartRate}
          stressLevel={stressLevel}
          sleepQuality={sleepQuality}
        />
      </div>

      {/* Body Battery Visualization and Before/After Slider */}
      <div className="md:w-1/2 p-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <BodyBattery level={bodyBattery} />
        </motion.div>

        <div className="mt-8 w-full">
          <BeforeAfterSlider beforeData={beforeData} afterData={afterData} />
        </div>

        {/* Scenario Selection - For Testing Purposes */}
        <div className="mt-4">
          <label htmlFor="scenario" className="block text-gray-700 text-sm font-bold mb-2">Scenario:</label>
          <select
            id="scenario"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          >
            <option value="starting">Starting</option>
            <option value="exercising">Exercising</option>
            <option value="stressed">Stressed</option>
            <option value="after-quitting">After Quitting</option>
          </select>
        </div>
      </div>
    </div>
  );
}