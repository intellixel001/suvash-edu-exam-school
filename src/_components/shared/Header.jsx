"use client";

import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaBook,
  FaGraduationCap,
  FaHome,
  FaUserGraduate,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

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
    <>
      {!accessToken ? (
        <header className="bg-white dark:bg-gray-900 dark:text-white shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform duration-200"
            >
              <img className="w-full max-w-[100px]" src="/logo.png" alt="" />
            </Link>

            {/* Right Actions */}
            <div className="flex items-center justify-end gap-10">
              <Link
                href="/#exam"
                className="flex items-center text-[#392f39] dark:text-white gap-1 hover:text-blue-500 transition"
              >
                <FaUserGraduate /> Exam
              </Link>
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm"
              >
                {darkMode ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-yellow-950" />
                )}
              </button>

              {/* Auth Buttons */}
              <Link
                href="/login"
                className="px-4 py-2 hidden lg:block rounded-full border border-[#392f39] dark:border-white text-[#392f39] dark:text-white hover:bg-blue-600 hover:text-white transition shadow-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 hidden lg:block rounded-full bg-[#392f39] text-white hover:bg-blue-700 transition shadow-sm"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`md:hidden fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-40 transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400"
              >
                <FaGraduationCap className="text-3xl" />
                EduLearn
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
              >
                <FaTimes size={22} />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-6 text-lg font-medium text-gray-700 dark:text-gray-200">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <FaHome /> Home
              </Link>
              <Link
                href="/exam"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <FaUserGraduate /> Exam
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <FaInfoCircle /> About
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <FaEnvelope /> Contact
              </Link>

              <div className="flex items-center gap-3 mt-4">
                {/* Auth Buttons */}
                <Link
                  href="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition shadow-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>

          {/* Mobile Bottom Navbar */}
          <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-inner border-t dark:border-gray-700 md:hidden flex justify-around items-center py-2">
            <Link
              href="/"
              className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
            >
              <FaHome size={22} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
              href="/exam"
              className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
            >
              <FaUserGraduate size={22} />
              <span className="text-xs mt-1">Exam</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
            >
              <FaUser size={22} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </nav>
        </header>
      ) : (
        ""
      )}
    </>
  );
}
