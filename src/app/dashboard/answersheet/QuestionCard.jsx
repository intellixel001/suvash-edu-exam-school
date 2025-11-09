"use client";
import { useWishlist } from "@/content/WishlistContext";
import React from "react";
import { FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa";

export default function QuestionCard({
  question,
  index,
  onViewExplanation,
  examid,
}) {
  const options = question?.fields || [];

  const { addWishlist, deleteWishlist, isWishlisted } = useWishlist();
  const isSaved = isWishlisted(question._id); // ✅ Correct way

  const handleWishlist = () => {
    if (isSaved) {
      deleteWishlist(question._id, "question");
    } else {
      addWishlist(question, examid);
    }
  };

  return (
    <div className="border dark:border-gray-700 rounded-2xl p-5 my-4 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200 relative">
      {/* ❤️ Wishlist Button - Top Right */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 text-xl"
      >
        {isSaved ? (
          <FaHeart className="text-red-500 hover:text-red-600 transition" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-red-500 transition" />
        )}
      </button>

      {/* Question Title */}
      <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100 pr-8">
        Q{index + 1}: {question.body}
      </h2>

      {/* Options List */}
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => {
          const isSelected = question.myanswer === i + 1;
          const isCorrect = question.correctanswer === i + 1;

          let bgClass = "bg-gray-50 dark:bg-gray-800";
          if (isCorrect) bgClass = "bg-green-100 dark:bg-green-800";
          if (isSelected && !isCorrect) bgClass = "bg-red-100 dark:bg-red-800";

          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-4 border rounded-xl ${bgClass}`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-400 dark:border-gray-500"
                }`}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>

              <span className={`text-base ${isCorrect ? "font-semibold" : ""}`}>
                {i + 1}. {opt}
              </span>

              {isCorrect && (
                <FaCheckCircle className="text-green-600 dark:text-green-400 ml-auto" />
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation Button */}
      {question.explanation && (
        <button
          onClick={() => onViewExplanation(question)}
          className="mt-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium"
        >
          View Explanation
        </button>
      )}
    </div>
  );
}
