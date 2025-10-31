"use client";

import BottomBar from "@/_components/cart/BottomBar";
import apiClient from "@/api/apiClient";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const positionParam = params.position;
  const classId = params.class ? parseInt(params.class, 10) : null;

  const [classInfo, setClassInfo] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!positionParam || !classId) return;

    const fetchOptions = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/student/exam/examoption/get/${positionParam}/${classId}`
        );

        console.log(res);
        if (res?.data) {
          setClassInfo(res.data.classInfo);
          setSubjects(res.data.subjects);
        }
      } catch (err) {
        console.error("❌ Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [positionParam, classId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Loading subjects...
      </div>
    );
  }

  if (!classInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Class not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full py-6">
        {/* Header */}
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 py-3 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
          {classInfo.name}
        </h2>

        {/* Grid for Subjects */}
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {subjects.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  router.push(
                    `/dashboard/${positionParam}/class/${classId}/subject/${item.id}`
                  )
                }
                className="relative w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md shadow-sm transition-all duration-200 hover:shadow-lg"
              >
                {item.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No subjects found.</p>
        )}

        <BottomBar />
      </div>
    </div>
  );
}
