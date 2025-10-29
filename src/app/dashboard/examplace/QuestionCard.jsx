"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerChange,
}) {
  const options = question?.fields || [];

  return (
    <div className="border dark:border-gray-700 rounded-2xl p-5 my-4 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200">
      <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
        {question.body}
      </h2>

      <div className="flex flex-col gap-3">
        {options.map((opt, i) => {
          const isSelected = selectedAnswer === i + 1; // ✅ store index+1
          return (
            <label
              key={i}
              className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-blue-100 dark:bg-blue-800 border-blue-500 shadow-sm"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => onAnswerChange(i + 1)} // send index+1
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-400 dark:border-gray-500"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>

                <span
                  className={`text-base flex items-center gap-2 ${
                    isSelected
                      ? "text-blue-700 dark:text-blue-200 font-medium"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <span className="font-semibold">{i + 1}.</span> {opt}
                </span>
              </div>

              {isSelected && (
                <FaCheckCircle className="text-blue-600 dark:text-blue-400 text-2xl transition-transform transform scale-110" />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
