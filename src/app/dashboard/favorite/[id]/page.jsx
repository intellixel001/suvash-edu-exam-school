"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { IoClose } from "react-icons/io5";
import {
  FaHeartBroken,
  FaSyncAlt,
  FaHeart,
  FaRegHeart,
  FaCheckCircle,
} from "react-icons/fa";
import { useWishlist } from "@/content/WishlistContext";

export default function WishlistPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedExplanation, setSelectedExplanation] = useState(null);
  const { wishlist, setWishlist, deleteWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await apiClient.get(`/student/wishlist/get/question/${id}`);
        const data = res.data;

        if (!data || data?.length === 0) {
          setErrorMsg("No wishlist items found");
          return;
        }

        setWishlist(data);
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

    if (id) fetchWishlist();
  }, [id, setWishlist]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSyncAlt className="text-4xl animate-spin text-blue-500" />
      </div>
    );

  if (errorMsg)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-center px-4">
        {errorMsg}
      </div>
    );

  if (!wishlist || wishlist.length === 0)
    return (
      <div className="flex flex-col items-center justify-center pt-[200px] text-gray-500 text-center px-4">
        <FaHeartBroken className="text-5xl text-gray-400 mb-3" />
        <h2 className="text-xl font-semibold">No wishlist items found</h2>
        <p className="text-sm text-gray-400 mt-1">{`You haven't saved any questions yet.`}</p>
      </div>
    );

  const handleRemove = (questionId) => {
    deleteWishlist(questionId, "question");
  };

  const handleViewExplanation = (question) => {
    setSelectedExplanation(question.explanation);
  };

  return (
    <div className="min-h-screen p-5 text-black dark:text-white">
      <h2 className="text-xl font-semibold mb-5 capitalize">
        Wishlist ({wishlist.length})
      </h2>

      {/* Explanation Modal */}
      {selectedExplanation && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedExplanation(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">Explanation</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {selectedExplanation}
            </p>
            <button
              onClick={() => setSelectedExplanation(null)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Wishlist Question Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {wishlist.map((item, index) => {
          const q = item.data;
          const options = q?.fields || [];
          const isSaved = isWishlisted(item.wishId);

          return (
            <div
              key={item._id}
              className="border dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200 relative"
            >
              {/* ❤️ Wishlist Button */}
              <button
                onClick={() => handleRemove(item.wishId)}
                className="absolute top-3 right-3 text-xl"
              >
                <IoClose className="text-red-500 hover:text-red-600 transition" />
              </button>

              {/* Question Title */}
              <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100 pr-8">
                Q{index + 1}: {q.body}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {options.map((opt, i) => {
                  const isSelected = q.answer === i + 1;
                  const isCorrect = q.correctanswer === i + 1;

                  let bgClass = "bg-gray-50 dark:bg-gray-800";
                  if (isCorrect) bgClass = "bg-green-100 dark:bg-green-800";
                  if (isSelected && !isCorrect)
                    bgClass = "bg-red-100 dark:bg-red-800";

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

                      <span
                        className={`text-base ${
                          isCorrect ? "font-semibold" : ""
                        }`}
                      >
                        {i + 1}. {opt}
                      </span>

                      {isCorrect && (
                        <FaCheckCircle className="text-green-600 dark:text-green-400 ml-auto" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* View Explanation */}
              {q.explanation && (
                <button
                  onClick={() => handleViewExplanation(q)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  View Explanation
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
