"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/api/apiClient";
import BottomBar from "@/_components/cart/BottomBar";

export default function MeritListPage() {
  const { id } = useParams();
  const [meritList, setMeritList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchMeritList = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await apiClient.get(`/student/exam/get-merit-list/${id}`);
        const data = res?.data?.meritList || [];

        if (!data.length) {
          setErrorMsg("No merit list available for this exam.");
          setMeritList([]);
          return;
        }

        setMeritList(data);
      } catch (err) {
        const message = err?.response?.data?.message || "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMeritList();
  }, [id]);

  return (
    <div className="min-h-screen p-4 pb-20">
      <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
        Open_Model_Test এর গত মডেল টেস্টের মেধাতালিকা
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading...
        </p>
      ) : errorMsg ? (
        <p className="text-center text-red-500">{errorMsg}</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md text-black rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                <th className="py-2 px-2">Rank</th>
                <th className="py-2 px-2">Student ID</th>
                <th className="py-2 px-2">Score</th>
                <th className="py-2 px-2">Topics Attempted</th>
              </tr>
            </thead>
            <tbody>
              {meritList.map((item, i) => (
                <tr
                  key={i}
                  className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    i === 0
                      ? "bg-yellow-100 dark:bg-yellow-900 font-semibold"
                      : i % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : ""
                  }`}
                >
                  <td className="py-2 px-2">{item.rank}</td>
                  <td className="py-2 px-2">{item.studentName}</td>
                  <td className="py-2 px-2 font-bold">{item.totalMark}</td>
                  <td className="py-2 px-2">
                    {item.resultSheet?.map((t) => t.topic).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BottomBar />
    </div>
  );
}
