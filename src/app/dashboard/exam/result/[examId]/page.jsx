"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import BottomBar from "@/_components/cart/BottomBar";
import { FaClock } from "react-icons/fa";

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
        setExamData(res); // use the data directly
      } catch (err) {
        const message = err.response?.data?.message || "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    if (examId) fetchResult();
  }, [examId]);

  if (loading) return <p className="text-center py-6">Loading result...</p>;
  if (errorMsg)
    return <p className="text-center py-6 text-red-500">{errorMsg}</p>;
  if (!examData) return null;

  // ---------- total data here ----------------------------------------------
  console.log(examData);
  // ---------- total data here ----------------------------------------------
  // Show Card if result not published
  if (examData.publishAt) {
    return (
      <div className="flex pt-20 items-center justify-center p-4">
        <div className="max-w-md w-full p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 text-center">
          <FaClock className="mx-auto text-4xl text-yellow-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Result Not Published Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            The result will be available soon. Please check back later.
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Expected Publish Time:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {new Date(examData.publishAt).toLocaleString()}
            </span>
          </p>
        </div>
        <BottomBar />
      </div>
    );
  }

  return (
    <>
      {examData?.data ? (
        <div className="min-h-screen p-4">
          <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            {examData.examName} - Result
          </h2>

          {/* Summary Table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-gray-50 dark:bg-gray-800 border rounded-md shadow-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <th className="px-4 py-2 text-left">Metric</th>
                  <th className="px-4 py-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Total Questions</td>
                  <td className="px-4 py-2">
                    {examData?.answerSheet?.answers.length}
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Total Score</td>
                  <td className="px-4 py-2">
                    {examData.answerSheet.totalmark}
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Your Status</td>
                  <td className="px-4 py-2 font-semibold">
                    {examData.myStatus}
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Passing Students</td>
                  <td className="px-4 py-2">{examData.passedStudentTotal}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Passing Mark</td>
                  <td className="px-4 py-2">{examData.passingMark}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Detailed Answers Table */}
          {examData.answerSheet.answers.length > 0 && (
            <div className="overflow-x-auto space-y-4">
              <table className="min-w-full border rounded-md shadow-sm bg-white dark:bg-gray-800">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <th className="px-4 py-2 text-left">Question</th>
                    <th className="px-4 py-2 text-left">Your Answer</th>
                    <th className="px-4 py-2 text-left">Correct Answer</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {examData.answerSheet.answers.map((ans, idx) => {
                    const isCorrect = ans.selectedAnswer === ans.correctAnswer;
                    return (
                      <tr
                        key={idx}
                        className={`border-t ${
                          isCorrect ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <td className="px-4 py-2">{ans.question}</td>
                        <td className="px-4 py-2">{ans.selectedAnswer}</td>
                        <td className="px-4 py-2">{ans.correctAnswer}</td>
                        <td className="px-4 py-2 font-semibold">
                          {isCorrect ? "Correct" : "Wrong"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <BottomBar />
        </div>
      ) : (
        <div>
          <div className="flex pt-20 items-center justify-center p-4">
            <div className="max-w-md w-full p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 text-center">
              <FaClock className="mx-auto text-4xl text-yellow-500 mb-3" />

              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {examData?.message || "Please wait"}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {examData?.description ||
                  "The result will be available soon. Please check back later."}
              </p>

              {examData?.publishAt && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Expected Publish Time:{" "}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {new Date(examData.publishAt).toLocaleString()}
                  </span>
                </p>
              )}
            </div>
          </div>
          <BottomBar />
        </div>
      )}
    </>
  );
}
