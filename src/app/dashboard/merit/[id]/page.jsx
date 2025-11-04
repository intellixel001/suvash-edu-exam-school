"use client";
import BottomBar from "@/_components/cart/BottomBar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [meritList, setMeritList] = useState([]);

  useEffect(() => {
    // Fake Merit List (Replace later with API call)
    const fakeData = [
      { rank: 1, name: "Abdullah Al Mamun", score: 48, time: "23m 12s" },
      { rank: 2, name: "Mim Akter", score: 46, time: "25m 40s" },
      { rank: 3, name: "Jubayer Rahman", score: 45, time: "26m 10s" },
      { rank: 4, name: "Imran Hossain", score: 44, time: "28m 03s" },
      { rank: 5, name: "Tania Sultana", score: 43, time: "29m 55s" },
    ];

    setMeritList(fakeData);
  }, [id]);

  return (
    <div className="min-h-screen p-4 pb-20">
      <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
        Open_Model_Test এর গত মডেল টেস্টের মেধাতালিকা
      </h2>

      {/* Merit List Table */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-600">
              <th className="py-2">Rank</th>
              <th className="py-2">Name</th>
              <th className="py-2">Score</th>
              <th className="py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {meritList.map((item, i) => (
              <tr
                key={i}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="py-2 font-semibold">{item.rank}</td>
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.score}</td>
                <td className="py-2 text-sm text-gray-600 dark:text-gray-300">
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BottomBar />
    </div>
  );
}
