"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Singleton socket instance
let socket;

export function useSocket(serverUrl) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      // Initialize socket globally
      socket = io(serverUrl, {
        auth: {
          token: localStorage.getItem("accessToken"),
        },
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("⚡ Socket connected:", socket.id);
        setConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("🔌 Socket disconnected");
        setConnected(false);
      });
    }

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
      }
    };
  }, [serverUrl]);

  // Global socket instance
  return { socket, connected };
}
