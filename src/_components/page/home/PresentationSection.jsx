"use client";

import React from "react";
import { FaRocket, FaLightbulb, FaUsers } from "react-icons/fa";

export default function PresentationSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24 transition-colors duration-500">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side - Image or Illustration */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://media.istockphoto.com/id/1473076479/vector/set-student-girl-character-in-different-situations-learning-prepare-for-exam-work-on-laptop.jpg?s=1024x1024&w=is&k=20&c=9LTkUJKQ0nPrIRqcTGSccA1jPh9zivlcsfuwKPCbQNw="
            alt="Exam Illustration"
            className="rounded-3xl shadow-lg w-full max-w-md"
          />
        </div>

        {/* Right Side - Text */}
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Take Your Exams to the Next Level
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            EduLearn makes exams easy, interactive, and stress-free. Whether
            you're preparing for a school test or a competitive exam, our
            platform is designed for student success.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <FaRocket className="text-3xl text-blue-500 mb-3" />
              <p className="text-center text-gray-700 dark:text-gray-200 font-medium">
                Fast & Responsive
              </p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <FaLightbulb className="text-3xl text-yellow-400 mb-3" />
              <p className="text-center text-gray-700 dark:text-gray-200 font-medium">
                Smart Insights
              </p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <FaUsers className="text-3xl text-green-500 mb-3" />
              <p className="text-center text-gray-700 dark:text-gray-200 font-medium">
                Trusted by Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
