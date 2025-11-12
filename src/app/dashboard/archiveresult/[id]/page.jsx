"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import BottomBar from "@/_components/cart/BottomBar";
import { FaClock } from "react-icons/fa";
import Link from "next/link";

export default function ResultPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [examData, setExamData] = useState(null);
  const [examData2, setExamData2] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const router = useRouter();

  const handleOpen = (type) => {
    if (type === "advice") {
      setModalContent("Here is some advice based on your exam performance...");
    } else if (type === "cutmark") {
      setModalContent(
        "Cut Mark means the minimum percentage of top scorers considered as passed."
      );
    }
    setOpen(true);
  };

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/student/exam/get-single-archive-result/${id}`
        );

        setExamData(res?.data); // use the data directly
        setExamData2(res);
      } catch (err) {
        const message = err.response?.data?.message || "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResult();
  }, [id]);

  if (loading) return <p className="text-center py-6">Loading result...</p>;
  if (errorMsg)
    return <p className="text-center py-6 text-red-500">{errorMsg}</p>;
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

  const statusList = [
    { label: "Excellent", key: "Excellent (Passed)", color: "bg-green-600" },
    { label: "Good", key: "Good (Passed)", color: "bg-green-500" },
    { label: "Pass", key: "Pass", color: "bg-green-400" },
    { label: "Fail", key: "Fail", color: "bg-red-400" },
    { label: "Bad", key: "Bad (Failed)", color: "bg-red-500" },
    { label: "Very Bad", key: "Very Bad (Failed)", color: "bg-red-600" },
  ];

  const resultSheet = examData?.answerSheet?.resultSheet || [];

  const totalCorrect = resultSheet.reduce((acc, item) => {
    const correctCount = item.mark.filter((m) => m.mark > 0).length;
    return acc + correctCount;
  }, 0);

  const totalWrong = resultSheet.reduce((acc, item) => {
    const wrongCount = item.mark.filter((m) => m.mark <= 0).length;
    return acc + wrongCount;
  }, 0);

  const totalMark = resultSheet.reduce((acc, item) => acc + item.totalmark, 0);

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 pb-20">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {examData.name} - Result
      </h2>

      {/* Summary Card */}
      <div className="rounded-xl shadow-md overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
        {/* Row 1 */}
        <div className="bg-blue-500 dark:bg-blue-700/40 px-5 py-3 flex items-center justify-between">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            Total Students:
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {examData.totalStudents}
          </p>
        </div>

        {/* Row 2 */}
        <div className="bg-purple-50 dark:bg-purple-900/40 px-5 py-3 flex items-center justify-between">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            Passed Students:
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {examData.passedStudentTotal}
          </p>
        </div>

        {/* Row 3 */}
        <div className="bg-blue-500 dark:bg-blue-700/40 px-5 py-3 flex items-center justify-between">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            You {examData.myStatus} the exam. Your ranking is:
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {examData.myRank}
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/40 px-5 py-3 flex items-center justify-between">
          {statusList.map((item) => {
            const isActive = examData?.myStatus === item.key;

            return (
              <div
                key={item.key}
                className={`text-center font-semibold py-2 w-full rounded-md border
        ${
          isActive
            ? ` text-white shadow-md scale-105 border-transparent bg-black`
            : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300"
        }`}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        <div className="bg-blue-500 dark:bg-blue-700/40 px-5 py-3 flex items-center justify-between">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            Cut Mark:
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {examData.passingMark}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 justify-between mt-3">
        <button
          onClick={() => handleOpen("advice")}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium shadow"
        >
          Advice
        </button>
        <button
          onClick={() => handleOpen("cutmark")}
          className="flex-1 bg-purple-900 hover:bg-purple-700 text-white py-2 rounded-md text-sm font-medium shadow"
        >
          What is Cut Mark?
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-80 p-5 rounded-lg shadow-lg animate-scaleIn">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              {modalContent.includes("Cut Mark") ? "Cut Mark Info" : "Advice"}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {modalContent}
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scaleIn {
            animation: scaleIn 0.2s ease-out;
          }
        `}
      </style>

      {/* Summary Card */}
      <div className="flex items-center p-2 mb-3 justify-between">
        <p className="text-[30px] text-black">
          <b>Your Score:</b>
        </p>
        <p className="bg-black text-white font-bold text-[30px] p2 px-[50px]">
          {examData.answerSheet?.totalmark || 0}
        </p>
      </div>

      {/* Topic Wise Result */}
      <div className="space-y-4">
        <div className="p-4 flex items-center justify-between rounded-lg shadow bg-gray-200 dark:bg-gray-800 border">
          <h3 className="text-lg w-[70%] font-semibold text-black dark:text-gray-200">
            Topic
          </h3>

          <div className="flex w-[30%] items-center justify-between text-[16px] text-black dark:text-gray-300 text-sm">
            <h1>Correct</h1>
            <h1>Wrong</h1>
            <h1>Mark</h1>
          </div>
        </div>

        {examData.answerSheet.resultSheet?.map((topicItem, i) => {
          const correctCount = topicItem.mark.filter((m) => m.mark > 0).length;
          const wrongCount = topicItem.mark.filter((m) => m.mark <= 0).length;

          return (
            <div
              key={i}
              className="p-4 flex items-center justify-between rounded-lg shadow bg-gray-50 dark:bg-gray-800 border"
            >
              <h3 className="text-lg w-[70%] font-[500] text-black dark:text-gray-200">
                {topicItem.topic}
              </h3>

              <div className="flex items-center w-[30%] justify-between text-[16px] text-black dark:text-gray-300 text-sm">
                <p>{correctCount}</p>
                <p>{wrongCount}</p>
                <p>{topicItem.totalmark}</p>
              </div>
            </div>
          );
        })}

        <div className="p-4 flex items-center justify-between rounded-lg shadow bg-gray-200 dark:bg-gray-800 border">
          <h3 className="text-lg w-[70%] font-bold text-black dark:text-gray-200">
            Total
          </h3>

          <div className="flex items-center w-[30%] justify-between text-[16px] text-black dark:text-gray-300 text-sm">
            <p>{totalCorrect}</p>
            <p>{totalWrong}</p>
            <p>{totalMark}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-between mt-3">
          <Link
            href={`/dashboard/answersheet/${examData.answerSheet?._id}`}
            scroll={true}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium shadow text-center"
          >
            Read Answer Sheet
          </Link>

          <Link
            href={`/dashboard/merit/${examData.answerSheet?.id}`}
            scroll={true}
            className="flex-1 bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium shadow text-center"
          >
            Merit List
          </Link>

          <Link
            href={`/dashboard/discussion/${examData.answerSheet?._id}`}
            scroll={true}
            className="flex-1 bg-blue-900 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium shadow text-center"
          >
            Discussion
          </Link>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
