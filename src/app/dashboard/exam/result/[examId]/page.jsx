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
  const [examData2, setExamData2] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/student/exam/get-single-result/${examId}`
        );

        console.log(res?.data);
        setExamData(res?.data); // use the data directly
        setExamData2(res);
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
  console.log({ examData });
  if (!examData) return null;

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

  console.log(examData2);
  return (
    <div className="min-h-screen p-4 pb-20">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {examData.examName} - Result
      </h2>

      {/* Summary Card */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p>
          <b>Total Score:</b> {examData.answerSheet.totalmark}
        </p>
        <p>
          <b>Your Status:</b> {examData.myStatus}
        </p>
        <p>
          <b>Passing Mark:</b> {examData.passingMark}
        </p>
        <p>
          <b>Passed Students:</b> {examData.passedStudentTotal}
        </p>
      </div>

      {/* Topic Wise Result */}
      <div className="space-y-4">
        {examData.answerSheet.resultSheet?.map((topicItem, i) => {
          const correctCount = topicItem.mark.filter((m) => m.mark > 0).length;
          const wrongCount = topicItem.mark.filter((m) => m.mark <= 0).length;

          return (
            <div
              key={i}
              className="p-4 rounded-lg shadow bg-gray-50 dark:bg-gray-800 border"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {topicItem.topic}
              </h3>

              <div className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                <p>
                  <b>Total Mark:</b> {topicItem.totalmark}
                </p>
                <p>
                  <b>Correct:</b> {correctCount} |<b> Wrong:</b> {wrongCount} |
                  <b> Total Questions:</b> {topicItem.mark.length}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <BottomBar />
    </div>
  );
}
