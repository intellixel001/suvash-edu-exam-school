"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import QuestionCard from "../QuestionCard";
import { useSocket } from "@/hooks/useSocket";
import { FaSyncAlt } from "react-icons/fa";

export default function ExamPage() {
  const { examid } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ---------------------------
  // Fetch exam + questions + topics
  // ---------------------------
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await apiClient.get(
          `/student/exam/singleget/examplacear/${examid}`
        );
        const data = res || {};

        // ✅ Check if already submitted / time over
        if (!data.data.exam) {
          setErrorMsg(data.message || "Cannot start exam.");
          return;
        }

        setExam(data.data.exam);
        setQuestions(data.data.questions || []);
        setTopics(data.data.uniqueTopics || []);
        setSelectedTopic(data.data.uniqueTopics?.[0] || "");

        // Calculate remaining time from start/end time
        const now = new Date();
        const endTime = new Date(data.data.endTime);
        const remainingSeconds = Math.max(
          Math.floor((endTime - now) / 1000),
          0
        );

        if (remainingSeconds === 0) {
          setSubmitted(true);
          setErrorMsg("⏰ Your exam time has already expired or submitted.");
        }

        setTimeLeft(remainingSeconds);
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    if (examid) fetchExam();
  }, [examid]);

  // useEffect(() => {
  //   if (examSheet) {

  //     const answerMap = {};
  //     for (const ans of examSheet?.answers) {
  //       answerMap[ans.questionId] = ans.answerIndex;
  //     }
  //     setAnswers(answerMap);
  //   }
  // }, [examSheet]);

  // ---------------------------
  // Countdown Timer
  // ---------------------------
  useEffect(() => {
    if (!timeLeft || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = async () => {
    if (submitting || submitted) return;
    setSubmitting(true);

    try {
      const payload = {
        examId: examid,
        answers: Object.entries(answers).map(([qid, ansIndex]) => ({
          questionId: qid,
          answerIndex: ansIndex,
        })),
      };

      const payloadAnswers = Object.entries(answers).map(
        ([questionId, answerIndex]) => ({
          questionId,
          answerIndex,
        })
      );

      // Then send it
      const res = await apiClient.put("/student/exam/submit/archive", {
        examid,
        answers: payloadAnswers,
      });

      if (res.data) {
        setSubmitted(true);
        alert("✅ Exam submitted successfully!");
        window.history.back();
      } else {
        alert("⚠️ Submission failed. " + (res.data.message || ""));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting exam. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredQuestions =
    selectedTopic && selectedTopic !== "all"
      ? questions.filter((q) => q.topic === selectedTopic)
      : questions;

  // ---------------------------
  // Render loading / error / reconnect states
  // ---------------------------
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
      </div>
    );

  if (errorMsg)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-center px-4">
        {errorMsg}
      </div>
    );

  if (!exam)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        No exam data found.
      </div>
    );

  // ---------------------------
  // Render main exam page
  // ---------------------------
  return (
    <div className="min-h-screen p-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Header + Timer */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <button
            onClick={handleSubmit}
            disabled={submitting || submitted || timeLeft === 0}
            className={`px-6 py-2 rounded-lg transition text-white ${
              submitted
                ? "bg-green-600"
                : submitting
                ? "bg-gray-500"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-600"
            }`}
          >
            {submitted
              ? "Submitted ✅"
              : submitting
              ? "Submitting..."
              : "Submit"}
          </button>
          <div className="text-xl font-bold">{formatTime(timeLeft)}</div>
        </div>
        {timeLeft === 0 && !submitted && (
          <div className="mt-2 text-red-600 dark:text-red-400 font-semibold">
            ⏰ Time is up! Submitting your exam...
          </div>
        )}
      </div>

      {/* Topic Filter */}
      <div className="max-w-5xl mx-auto my-4">
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Questions */}
      <div className="max-w-5xl mx-auto">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <QuestionCard
              key={q._id}
              question={q}
              selectedAnswer={answers[q._id] || null}
              onAnswerChange={(ans) => {
                if (answers[q._id] !== undefined) {
                  return;
                } else {
                  handleAnswerChange(q._id, ans);
                }
              }}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No questions found for this topic.
          </div>
        )}
      </div>
    </div>
  );
}
