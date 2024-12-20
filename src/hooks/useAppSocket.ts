import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL; // Replace with your backend's URL

export const useSocket = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io(SOCKET_URL);

    socket.current.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.current?.id);
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return socket.current;
};
