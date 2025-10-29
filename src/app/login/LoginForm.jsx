"use client";

import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import apiClient from "@/api/apiClient";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      setLoading(true);
      const response = await apiClient.post("/student/login", {
        loginId: email.trim(),
        password: password.trim(),
        from: "examapp",
      });

      const loginData = response.data;

      if (loginData?.user) {
        // Save token for future requests
        localStorage.setItem("accessToken", loginData?.accessToken);
        localStorage.setItem("refreshToken", loginData?.refreshToken);

        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setErrorMsg("Unexpected response. Please try again.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid credentials. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md p-10 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Welcome Back
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        Sign in to your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                       bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                       placeholder-gray-400 dark:placeholder-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                       bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                       placeholder-gray-400 dark:placeholder-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900/40 text-sm p-2 rounded text-center">
            {errorMsg}
          </p>
        )}

        {successMsg && (
          <p className="text-green-600 bg-green-100 dark:bg-green-900/40 text-sm p-2 rounded text-center">
            {successMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
                      font-semibold text-lg shadow-lg transition-all duration-300 
                      ${
                        loading
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:opacity-90"
                      }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
        Don’t have an account?{" "}
        <a
          href="/signup"
          className="text-blue-500 hover:underline font-semibold"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
}
