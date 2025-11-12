"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/api/apiClient";
import QuestionCard from "../QuestionCard";
import BottomBar from "@/_components/cart/BottomBar";
import { useWishlist } from "@/content/WishlistContext";

export default function AnswerSheetPage() {
  const { examid } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { addWishlist, deleteWishlist, isWishlisted, setWishlist } =
    useWishlist();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/student/exam/singleget/answersheet/${examid}`
        );
        const data = res?.data;
        if (!data) {
          setErrorMsg("Cannot fetch exam data.");
          return;
        }

        // Flatten all questions from resultSheet.mark
        const allQuestions = data?.resultSheet.flatMap((topicItem) =>
          topicItem.mark.map((q) => ({
            ...q,
            topic: topicItem.topic,
            totalTopicMark: topicItem.totalmark,
          }))
        );

        setQuestions(allQuestions);
        setTopics([...new Set(allQuestions.map((q) => q.topic))]);
        setSelectedTopic(
          [...new Set(allQuestions.map((q) => q.topic))]?.[0] || ""
        );
        setExamData(res?.exam);
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to load exam data.");
      } finally {
        setLoading(false);
      }
    };

    if (examid) fetchExam();
  }, [examid]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await apiClient.get(
          `/student/wishlist/get/question/${examid}`
        );
        const data = res.data;

        if (!data || data?.length === 0) {
          setErrorMsg(res.message || "");
          return;
        }

        setWishlist(data.data || null);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong!";
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    };

    if (examid) fetchWishlist();
  }, [examid]);

  const filteredQuestions =
    selectedTopic && selectedTopic !== "all"
      ? questions.filter((q) => q.topic === selectedTopic)
      : questions;

  const handleOpenModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

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

  if (!examData) return null;

  return (
    <div className="min-h-screen p-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Exam Title */}
      <h2 className="text-2xl font-semibold text-center mb-6">
        {examData.name} - Answer Sheet
      </h2>

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
          filteredQuestions.map((q, index) => (
            <QuestionCard
              key={q._id}
              question={q}
              index={index}
              examid={examid}
              onViewExplanation={() => handleOpenModal(q.explanation)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No questions found for this topic.
          </div>
        )}
      </div>

      {/* Explanation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-96 p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Explanation</h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {modalContent}
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <BottomBar />
    </div>
  );
}
