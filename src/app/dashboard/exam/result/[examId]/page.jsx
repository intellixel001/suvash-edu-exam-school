"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import BottomBar from "@/_components/cart/BottomBar";

export default function ResultPage() {
  const { examId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/student/exam/get-single-result/${examId}`
        );
        setExamData(res.data);
      } catch (err) {
        const message = err.response?.data?.message || "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    if (examId) fetchResult();
  }, [examId]);

  const calculateSummary = () => {
    if (!examData?.answers) return null;

    let total = examData.answers.length;
    let correct = 0;
    let wrong = 0;
    let score = 0;

    const negativeMarking = 0.25; // adjust if needed

    examData.answers.forEach((ans) => {
      if (ans.selectedAnswer === ans.correctAnswer) {
        correct += 1;
        score += 1;
      } else {
        wrong += 1;
        score -= negativeMarking; // negative marking
      }
    });

    if (score < 0) score = 0;

    return {
      total,
      correct,
      wrong,
      score,
      percentage: ((score / total) * 100).toFixed(2),
    };
  };

  const summary = calculateSummary();

  if (loading) return <p className="text-center py-6">Loading result...</p>;
  if (errorMsg)
    return <p className="text-center py-6 text-red-500">{errorMsg}</p>;
  if (!examData) return null;

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {examData.examName} - Result
      </h2>

      {/* Summary Section */}
      {summary && (
        <div className="p-4 mb-6 border rounded-md bg-gray-50 dark:bg-gray-800 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>Total Questions: {summary.total}</p>
            <p>
              Correct: <span className="text-green-600">{summary.correct}</span>
            </p>
            <p>
              Wrong: <span className="text-red-600">{summary.wrong}</span>
            </p>
            <p>Score: {summary.score}</p>
            <p>Percentage: {summary.percentage}%</p>
          </div>
        </div>
      )}

      {/* Detailed Answers */}
      <div className="space-y-4">
        {examData.answers.map((ans, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-md bg-white dark:bg-gray-800 shadow-sm"
          >
            <h4 className="font-medium">
              Q{idx + 1}: {ans.question}
            </h4>
            <ul className="mt-2 space-y-1">
              {ans.options.map((opt, i) => {
                const isSelected = opt === ans.selectedAnswer;
                const isCorrect = opt === ans.correctAnswer;
                const colorClass = isSelected
                  ? isCorrect
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  : isCorrect
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 dark:text-gray-300";

                return (
                  <li key={i} className={`px-2 py-1 rounded ${colorClass}`}>
                    {opt} {isSelected && " (Your Answer)"}{" "}
                    {isCorrect && " (Correct)"}
                  </li>
                );
              })}
            </ul>
            {ans.explanation && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Explanation: {ans.explanation}
              </p>
            )}
          </div>
        ))}
      </div>

      <BottomBar />
    </div>
  );
}
