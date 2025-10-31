"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaBook, FaUniversity, FaBriefcase } from "react-icons/fa";

export default function Page() {
  const router = useRouter();

  const exams = [
    {
      name: "Academic",
      description: "Prepare for school and university exams.",
      path: "/dashboard/academic/class",
      icon: <FaBook className="text-4xl text-blue-500 mb-3" />,
    },
    {
      name: "Admission",
      description: "Get ready for admission tests and entry exams.",
      path: "/dashboard/admission/class",
      icon: <FaUniversity className="text-4xl text-green-500 mb-3" />,
    },
    {
      name: "Job",
      description: "Practice for job exams and competitive tests.",
      path: "/dashboard/job/class",
      icon: <FaBriefcase className="text-4xl text-yellow-500 mb-3" />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {exams.map((exam) => (
          <div
            key={exam.name}
            className="bg-white rounded-2xl shadow-lg transition p-6 flex flex-col items-center justify-center text-center hover:scale-105 hover:shadow-2xl duration-300"
          >
            {exam.icon}
            <h2 className="text-xl font-semibold mb-2">{exam.name}</h2>
            <p className="text-gray-500 mb-4">{exam.description}</p>
            <button
              onClick={() => router.push(exam.path)}
              className="px-5 py-2 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {exam.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
