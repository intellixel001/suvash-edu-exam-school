"use client";

import React from "react";
import { FaClipboardList, FaChartLine, FaLock, FaClock } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaClipboardList className="text-4xl text-blue-500" />,
      title: "Practice Exams",
      description:
        "Attempt mock exams to prepare for the real tests efficiently.",
    },
    {
      icon: <FaChartLine className="text-4xl text-green-500" />,
      title: "Track Progress",
      description:
        "Monitor your scores and performance to identify improvement areas.",
    },
    {
      icon: <FaLock className="text-4xl text-red-500" />,
      title: "Secure & Reliable",
      description: "All exams are safe, secure, and conducted fairly.",
    },
    {
      icon: <FaClock className="text-4xl text-indigo-500" />,
      title: "Timed Exams",
      description: "Experience real exam conditions with time-limited tests.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-500">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Features for Exam Success
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-12">
          Focused tools to help students excel in exams efficiently and
          confidently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
