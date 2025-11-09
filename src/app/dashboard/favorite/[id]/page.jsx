"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { FaHeartBroken, FaSyncAlt } from "react-icons/fa";
import { useWishlist } from "@/content/WishlistContext";

export default function WishlistPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { wishlist, setWishlist } = useWishlist();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await apiClient.get(`/student/wishlist/get/question/${id}`);
        const data = res.data;

        console.log(data);

        if (!data || data?.length === 0) {
          console.log(res);
          setErrorMsg(res.message || "");
          return;
        }

        setWishlist(data.data);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong!";
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchWishlist();
  }, [id]);

  // ---------------------------
  // Render loading / error
  // ---------------------------

  console.log(wishlist);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSyncAlt className="text-4xl animate-spin text-blue-500" />
      </div>
    );

  if (errorMsg)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-center px-4">
        {errorMsg}
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="flex flex-col items-center justify-center pt-[200px] text-gray-500 text-center px-4">
        <FaHeartBroken className="text-5xl text-gray-400 mb-3" />
        <h2 className="text-xl font-semibold">No wishlist items found</h2>
        <p className="text-sm text-gray-400 mt-1">{`You have no saved yet.`}</p>
      </div>
    );

  // ---------------------------
  // Render wishlist items
  // ---------------------------
  return (
    <div className="min-h-screen p-5">
      <h2 className="text-xl font-semibold mb-5 capitalize">
        Wishlist ({wishlist.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">
              {item.data?.title || item.data?.name || "No Title"}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {item.data?.description || "No description available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
