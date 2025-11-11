"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    // Clear tokens and any other user data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Optional: clear any cached data if needed
    // localStorage.clear();

    // Redirect after short delay for UX
    const timer = setTimeout(() => {
      router.push("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg text-center">
        <FaSignOutAlt className="text-5xl text-indigo-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Logging you out...
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          You’ll be redirected to the login page shortly.
        </p>
      </div>
    </div>
  );
}
