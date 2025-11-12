"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import {
  FaHome,
  FaClipboardList,
  FaEllipsisH,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LuPackage2 } from "react-icons/lu";
import Link from "next/link";
import { useUser } from "@/content/UserContext";

export default function Sidebar({ slider_toggle_bar, set_slider_toggle_bar }) {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, error } = useUser();

  // 🌓 Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      // Use stored preference
      const isDarkMode = storedTheme === "dark";
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle("dark", isDarkMode);
    } else {
      // Use system preference by default
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // 🌗 Listen for system theme changes (optional)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only auto-switch if user has no stored preference
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 🌙 Toggle theme and persist preference
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const menuItems = [
    { icon: <FaHome />, label: "Home", link: "/dashboard" },
    {
      icon: <CgProfile />,
      label: "আপনার প্রোফাইল",
      link: "/dashboard/profile",
    },
    {
      icon: <LuPackage2 />,
      label: "প্যাকেজ কিনুন",
      link: "/dashboard/package",
    },
    { icon: <FaClipboardList />, label: "Exam", link: "/" },
    { icon: <FaClipboardList />, label: "Logout", link: "/logout" },
  ];

  return (
    <>
      {/* Overlay + Sidebar for large screens */}
      {slider_toggle_bar && (
        <div
          onClick={() => set_slider_toggle_bar(false)}
          className="fixed top-0 left-0 z-[99999] w-full bg-black/20"
        >
          <div
            style={{
              boxShadow: "20px 0px 40px 5px gray",
            }}
            onClick={(e) => e.stopPropagation()}
            className="hidden md:flex flex-col relative justify-between bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-64 min-h-screen p-5 transition-colors duration-300"
          >
            <div className="absolute top-3 right-3">
              <IoMdClose
                onClick={() => set_slider_toggle_bar(false)}
                size={30}
                className="cursor-pointer"
              />
            </div>

            {/* Top: User Info */}
            <div>
              <div className="flex flex-col items-center">
                <img
                  src="https:///large_2x/ gn-and-symbol-vector.jpg"
                  alt="User"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-gray-300 dark:border-gray-700"
                />
                <h2 className="mt-3 text-lg font-semibold">
                  {user?.fullName || "User"}
                </h2>
              </div>

              {/* Menu */}
              <div className="mt-10 space-y-3">
                {menuItems.map((item, idx) => (
                  <Link key={idx} href={item.link}>
                    <button
                      onClick={() => set_slider_toggle_bar(false)}
                      className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 justify-center py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {isDark ? <FaSun /> : <FaMoon />}
              <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-around py-3 shadow-inner">
        <button className="flex flex-col items-center">
          <FaHome className="text-xl" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center">
          <FaClipboardList className="text-xl" />
          <span className="text-xs mt-1">Exam</span>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center"
        >
          <FaEllipsisH className="text-xl" />
          <span className="text-xs mt-1">More</span>
        </button>
      </div>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="absolute right-0 top-0 h-full w-64 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-3 right-3">
                <IoMdClose
                  onClick={() => setIsOpen(false)}
                  size={30}
                  className="cursor-pointer"
                />
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/003/715/527/large_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
                  alt="User"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-gray-300 dark:border-gray-700"
                />
                <h2 className="mt-3 text-lg font-semibold">
                  {user?.fullName || "User"}
                </h2>
              </div>

              <div className="mt-10 space-y-3">
                {menuItems.map((item, idx) => (
                  <Link
                    href={item.link}
                    key={idx}
                    className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              <button
                onClick={toggleTheme}
                className="mt-10 flex items-center gap-3 justify-center py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                {isDark ? <FaSun /> : <FaMoon />}
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
