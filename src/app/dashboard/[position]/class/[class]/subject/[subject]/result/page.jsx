"use client";
import BottomBar from "@/_components/cart/BottomBar";
import apiClient from "@/api/apiClient";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [header, setHeader] = useState({
    o: "",
    s: "",
  });
  const searchParams = useParams();
  const router = useRouter();

  const classParam = searchParams?.class || "";
  const subject = searchParams?.subject || "";
  const position = searchParams?.position;

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setErrorMsg("");
        const response = await apiClient.get(
          `/student/exam/get-result-list/${position}/${classParam}/${subject}`
        );
        setExamList(response?.results || []);
        setHeader({
          o: response?.header?.o || "",
          s: response?.header?.s || "",
        });
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

    if (classParam && subject) fetchExam();
  }, [classParam, subject, position]);

  const goToResultPage = (examId) => {
    router.push(`/dashboard/exam/result/${examId}`);
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-4 rounded-md bg-gray-50 dark:bg-gray-700">
        {header?.o} এর {header?.s} result
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}

      {!loading && examList?.length === 0 && (
        <p className="text-center text-gray-500">No exams found.</p>
      )}

      <div className="space-y-4">
        {examList.map((item) => (
          <div
            key={item.examId}
            className="p-4 border rounded-md bg-white dark:bg-gray-800 shadow-sm"
          >
            <h3 className="font-semibold text-black text-lg">
              {item.examName}
              {" - "}
              <span className="italic text-gray-600 text-[12px]">
                {item?.from || ""}
              </span>
            </h3>
            {item.status !== "result_available" && (
              <p className="text-sm text-gray-600">
                Start: {formatDate(item.start)} <br />
                Result Publish: {formatDate(item.showResultAt)}
              </p>
            )}

            <div className="mt-2">
              {item.status === "exam_not_started" && (
                <p className="text-blue-600 text-sm">Exam not started yet</p>
              )}

              {item.status === "exam_running" && (
                <p className="text-orange-600 text-sm">Exam running</p>
              )}

              {item.status === "exam_ended_not_submitted" && (
                <p className="text-red-600 text-sm">
                  You did not submit this exam
                </p>
              )}

              {item.status === "result_available" && (
                <button
                  onClick={() => goToResultPage(item.examId)}
                  className="mt-2 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500"
                >
                  View Result
                </button>
              )}

              {item.status !== "result_available" &&
                item.status !== "exam_ended_not_submitted" &&
                item.status !== "exam_running" && (
                  <p className="text-purple-600 text-sm">
                    Result will publish at: {formatDate(item.showResultAt)}
                  </p>
                )}
            </div>
          </div>
        ))}
      </div>

      <BottomBar />
    </div>
  );
}
