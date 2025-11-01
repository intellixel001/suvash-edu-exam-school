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
        setConnected(true);
      });

      socket.on("disconnect", () => {
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
