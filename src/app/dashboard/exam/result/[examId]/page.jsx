"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import apiClient from "@/api/apiClient";
import BottomBar from "@/_components/cart/BottomBar";
import { FaClock, FaDownload } from "react-icons/fa";
import Link from "next/link";
import html2canvas from "html2canvas";

export default function ResultPage() {
  const { examId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [examData, setExamData] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const resultRef = useRef(null);
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

  const exportAsPng = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, {
      scale: 2,
      backgroundColor: "#fff",
    });
    const link = document.createElement("a");
    link.download = `exam_result_${examData.name || "result"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/student/exam/get-single-result/${examId}`
        );
        setExamData(res?.data);
      } catch (err) {
        const message = err.response?.data?.message || "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };
    if (examId) fetchResult();
  }, [examId]);

  if (loading)
    return <p className="text-center py-6 text-gray-600">Loading result...</p>;
  if (errorMsg)
    return <p className="text-center py-6 text-red-500">{errorMsg}</p>;
  if (!examData) return null;

  // Show Card if result not published
  if (examData.publishAt) {
    return (
      <div className="flex pt-20 items-center justify-center p-4">
        <div className="max-w-md w-full p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 text-center">
          <FaClock className="mx-auto text-5xl text-yellow-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Result Not Published Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            The result will be available soon. Please check back later.
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Expected Publish Time:{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {new Date(examData.publishAt).toLocaleString()}
            </span>
          </p>
        </div>
        <BottomBar />
      </div>
    );
  }

  const statusList = [
    { label: "Excellent", key: "Excellent" },
    { label: "Good", key: "Good" },
    { label: "Normal", key: "Normal" },
    { label: "Bad", key: "Bad" },
  ];

  const resultSheet = examData?.answerSheet?.resultSheet || [];
  const totalCorrect = resultSheet.reduce(
    (acc, item) => acc + item.mark.filter((m) => m.mark > 0).length,
    0
  );
  const totalWrong = resultSheet.reduce(
    (acc, item) => acc + item.mark.filter((m) => m.mark <= 0).length,
    0
  );
  const totalMark = resultSheet.reduce((acc, item) => acc + item.totalmark, 0);

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-4 pb-24">
      <div ref={resultRef}>
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {examData.name} - Result
        </h2>

        {/* Summary Card */}
        <div className="overflow-hidden mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 text-center lg:gap-4 gap-2">
            {/* Total Students */}
            <div className="border border-blue-500/40 px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                Total Students
              </p>
              <p className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                {examData.totalStudents}
              </p>
            </div>

            {/* Passed Students */}
            <div className="border border-green-500/40 px-5 py-4 rounded-2xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                Passed Students
              </p>
              <p className="mt-1 text-2xl font-extrabold text-green-600 dark:text-green-400">
                {Number(examData.passedStudentTotal).toFixed(0)}
              </p>
            </div>

            {/* Your Rank */}
            <div className="border border-blue-500/40 px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                Your Rank
              </p>
              <p className="mt-1 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {examData.myRank}
              </p>
            </div>

            {/* Cut Mark */}
            <div className="border border-yellow-500/40 px-5 py-4 rounded-2xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                Cut Mark
              </p>
              <p className="mt-1 text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">
                {examData.passingMark}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => handleOpen("advice")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium shadow"
          >
            Advice
          </button>
          <button
            onClick={() => handleOpen("cutmark")}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium shadow"
          >
            What is Cut Mark?
          </button>
        </div>

        {/* Score */}
        <div className="flex items-center justify-between px-4 py-3 mb-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Your Score:
          </p>
          <p className="text-2xl font-bold bg-black text-white px-6 py-1 rounded-lg">
            {examData.answerSheet?.totalmark?.toFixed(2) || 0}
          </p>
        </div>

        {/* Topic-wise Table */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex justify-between lg:text-[16px] text-[12px] px-4 py-2 font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <p className="w-[50%]">Topic</p>
            <div className="flex w-[50%] text-center justify-between">
              <p className="w-full">Correct</p>
              <p className="w-full">Wrong</p>
              <p className="w-full">Mark</p>
            </div>
          </div>

          {examData.answerSheet.resultSheet?.map((topicItem, i) => {
            const correct = topicItem.mark.filter((m) => m.mark > 0).length;
            const wrong = topicItem.mark.filter((m) => m.mark <= 0).length;
            return (
              <div
                key={i}
                className="flex justify-between border border-b-[1px] lg:text-[16px] text-[12px] px-4 py-2 text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700"
              >
                <p className="w-[50%] truncate">{topicItem.topic}</p>
                <div className="flex w-[50%] text-center justify-between">
                  <p className="w-full"> {correct}</p>
                  <p className="w-full"> {wrong}</p>
                  <p className="w-full"> {topicItem.totalmark.toFixed(2)}</p>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between px-4 py-3 lg:text-[16px] text-[12px] bg-gray-50 dark:bg-gray-800 font-bold border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            <p className="w-[50%]">Total</p>
            <div className="flex text-center w-[50%] justify-between">
              <p className="text-center w-full">{totalCorrect}</p>
              <p className="text-center w-full">{totalWrong}</p>
              <p className="text-center w-full">{totalMark.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border mt-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="text-center text-blue-800 pt-2">
            <p>How was your preparation</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 px-3 py-3 pt-2">
            {statusList.map((item) => {
              const active = examData.myStatus === item.key;
              return (
                <div
                  key={item.key}
                  className={`px-3 py-1 rounded-md text-sm font-semibold border transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300"
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            href={`/dashboard/answersheet/${examData.answerSheet?._id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium text-center"
          >
            Read Answer Sheet
          </Link>
          <Link
            href={`/dashboard/merit/${examData.answerSheet?.examId}`}
            className="flex-1 bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium text-center"
          >
            Merit List
          </Link>
          <Link
            href={`/dashboard/discussion/${examData.answerSheet?._id}`}
            className="flex-1 bg-blue-900 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium text-center"
          >
            Discussion
          </Link>
        </div>
      </div>

      {/* Export Button */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center px-4">
        <button
          onClick={exportAsPng}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
        >
          <FaDownload />
          Export Result as PNG
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-80 p-5 rounded-xl shadow-lg animate-scaleIn">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              {modalContent.includes("Cut Mark") ? "Cut Mark Info" : "Advice"}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {modalContent}
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <BottomBar />

      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }
        `}
      </style>
    </div>
  );
}
