"use client";
import BottomBar from "@/_components/cart/BottomBar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarDays } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import apiClient from "@/api/apiClient";

export default function Page() {
  const searchParams = useParams();
  const router = useRouter();
  const [examArchive, setExamArchive] = useState([]);
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const classParam = searchParams?.class || "";
  const subject = searchParams?.subject || "";
  const position = searchParams?.position || "";

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const response = await apiClient.get(
          `/student/exam/get-archive-exmas/${position}/${classParam}/${subject}`
        );

        setExamArchive(response?.data || []);
        setClassName(response?.className || "");
        setSubjectName(response?.subjectName || "");
      } catch (err) {
        const message =
          err.response?.message ||
          err.response?.error ||
          "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    if (classParam && subject && position) fetchExam();
  }, [classParam, subject, position]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleNavigate = (examId) => {
    router.push(`/dashboard/archiveexamplace/${examId}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-full py-10 px-4">
        <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-100 border border-gray-400 p-4 mb-5 rounded-md bg-gray-50 dark:bg-gray-700">
          {className && subjectName
            ? `${className} - ${subjectName}\n পূর্ববর্তী পরীক্ষাসমূহ`
            : "পূর্ববর্তী পরীক্ষাসমূহ"}
        </h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {errorMsg && <p className="text-center text-red-600">{errorMsg}</p>}

        <div className="mx-auto space-y-6">
          {examArchive.length === 0 && !loading && (
            <p className="text-center text-gray-500">
              কোন পূর্ববর্তী পরীক্ষা পাওয়া যায়নি।
            </p>
          )}

          {examArchive.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-400 rounded-md overflow-hidden shadow-sm"
            >
              <div className="bg-green-600 text-white text-center py-2 font-semibold flex items-center justify-center gap-2">
                <FaCalendarDays className="w-5 h-5" />
                {formatDate(item.startDate)}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 text-center leading-relaxed">
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-sm mt-1">{item.description}</p>
                <p className="text-sm mt-2">ধরন: {item.type.toUpperCase()}</p>

                {/* ✅ View Exam Button */}
                <button
                  onClick={() => handleNavigate(item._id)}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  View Exam
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
