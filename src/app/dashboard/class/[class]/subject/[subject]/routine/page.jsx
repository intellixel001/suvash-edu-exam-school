"use client";

import BottomBar from "@/_components/cart/BottomBar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import apiClient from "@/api/apiClient";

export default function Page() {
  const searchParams = useParams();
  const classParam = searchParams?.class || "";
  const subject = searchParams?.subject || "";

  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `/student/exam/routine/${classParam}/${subject}`
        );
        setRoutines(response.data || []); // ensure array
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    if (classParam && subject) fetchRoutines();
  }, [classParam, subject]);

  console.log(routines);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-full py-10 px-4">
        {/* Header */}
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-4 rounded-md bg-gray-50 dark:bg-gray-700">
          Open_Model_Test এর মডেল টেস্টের রুটিন
        </h2>

        <h2 className="text-center text-base font-medium text-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-700">
          পরীক্ষার দিন ২৪ ঘণ্টার যেকোনো সময় পরীক্ষা দিতে পারবেন।
        </h2>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {!loading && errorMsg && (
          <div className="text-center text-gray-600 dark:text-gray-300 py-10">
            {errorMsg}
          </div>
        )}

        {/* Routine List */}
        {!loading && routines?.length > 0 ? (
          <div className="space-y-5">
            {routines.map((s_routine, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <FaCalendarDays className="w-5 h-5" />
                    <span className="font-medium">
                      <strong>পরীক্ষার তারিখঃ </strong> {s_routine.date}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${
                      s_routine.status === "UPCOMING"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                        : s_routine.status === "ONGOING"
                        ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700/20 dark:text-gray-400"
                    }`}
                  >
                    {s_routine.status === "UPCOMING" ? (
                      <FaClock className="w-4 h-4" />
                    ) : s_routine.status === "ONGOING" ? (
                      <FaCheckCircle className="w-4 h-4" />
                    ) : (
                      <FaExclamationCircle className="w-4 h-4" />
                    )}
                    {s_routine.status}
                  </div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: s_routine.body || "",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading &&
          !errorMsg && (
            <div className="text-center text-gray-600 dark:text-gray-300 py-10">
              📄 কোনো রুটিন পাওয়া যায়নি
            </div>
          )
        )}
      </div>

      <BottomBar />
    </div>
  );
}
