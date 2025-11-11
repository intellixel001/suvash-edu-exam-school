"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaBook, FaUniversity, FaBriefcase } from "react-icons/fa";
import Link from "next/link";

export default function MainExamSection() {
  const router = useRouter();

  const exams = [
    {
      name: "Academic",
      description:
        "Prepare for school and university exams with curated practice sets.",
      path: "/dashboard/academic/class",
      icon: <FaBook className="text-5xl text-blue-500 mb-4" />,
      color:
        "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10",
    },
    {
      name: "Admission",
      description:
        "Ace your admission tests with topic-wise practice and mock exams.",
      path: "/dashboard/admission/class",
      icon: <FaUniversity className="text-5xl text-green-500 mb-4" />,
      color:
        "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10",
    },
    {
      name: "Job",
      description:
        "Sharpen your skills for government and corporate job exams.",
      path: "/dashboard/job/class",
      icon: <FaBriefcase className="text-5xl text-yellow-500 mb-4" />,
      color:
        "from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/20 hover:to-yellow-500/10",
    },
  ];

  return (
    <section className="container mx-auto p-2 px-0">
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-2">
        {exams.map((exam, index) => (
          <Link key={index} href={exam?.path}>
            <div
              className={`p-2 rounded-[10px] shadow-xl bg-gradient-to-br ${exam.color} 
                          dark:bg-slate-800 bg-white border border-gray-200 dark:border-slate-700 
                          flex flex-col items-center justify-between text-center 
                          transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
            >
              {exam.icon}
              <h2 className="lg:text-2xl text-[16px] font-semibold text-gray-800 dark:text-gray-100">
                {exam.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
