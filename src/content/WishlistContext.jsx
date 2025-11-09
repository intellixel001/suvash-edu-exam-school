"use client";
import { createContext, useContext, useState } from "react";
import apiClient from "@/api/apiClient";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]); // start as array not null

  // ✅ Add to wishlist + call API
  const addWishlist = async (item, parentId) => {
    try {
      const res = await apiClient.post("/student/wishlist/add", {
        parentId,
        type: "question",
        id: item.id,
      });

      setWishlist((prev) => [...(prev || []), item]);

      return res.data;
    } catch (error) {
      console.error("Add Wishlist Error:", error);
      throw error;
    }
  };

  // ❌ Delete from wishlist + call API
  const deleteWishlist = async (id, type) => {
    try {
      const res = await apiClient.delete(`/student/wishlist/delete/${id}`);

      setWishlist((prev) =>
        [...(prev || [])].filter((item) => item._id !== id)
      );

      return res.data;
    } catch (error) {
      console.error("Delete Wishlist Error:", error);
      throw error;
    }
  };

  // 🧹 Clear all wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // 📌 Check if item exists
  const isWishlisted = (id) => {
    console.log({ wishlist });
    return [...(wishlist || [])].some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist, // for get API
        addWishlist,
        deleteWishlist,
        clearWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook
export function useWishlist() {
  return useContext(WishlistContext);
}
