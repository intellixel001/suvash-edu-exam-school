"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBars, FaGraduationCap, FaMoon, FaSun } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function DashboardTopBar({ set_slider_toggle_bar }) {
  const [darkMode, setDarkMode] = useState(false);
  const CurrentPath = usePathname();
  const router = useRouter();

  // Toggle Tailwind dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-900 dark:text-white shadow-md w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {CurrentPath !== "/dashboard" && (
            <FaArrowLeftLong
              onClick={() => router.back()}
              className="text-[20px] mr-4 cursor-pointer dark:text-white text-black"
            />
          )}

          {/* Logo */}
          <Link
            href=""
            className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform duration-200"
          >
            <FaGraduationCap className="text-3xl" />
            <span>EduLearn</span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm"
          >
            {darkMode ? (
              <FaSun size={20} className="text-yellow-400" />
            ) : (
              <FaMoon size={20} className="text-yellow-950" />
            )}
          </button>

          <button
            onClick={() => set_slider_toggle_bar(true)}
            className="p-2 lg:block hidden rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm"
          >
            <FaBars size={20} className="text-yellow-950" />
          </button>
        </div>
      </div>
    </header>
  );
}
