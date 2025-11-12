import { io, Socket } from "socket.io-client";
import { serverUrl } from "@/utils/constance";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  if (!socket) {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem("bricks:auth");
    return connectSocket(token)
  };
  return socket;
}

export function connectSocket(token: string | null): Socket | null {
  if (typeof window === "undefined") return null as any;

  if (!socket && token) {
    socket = io(serverUrl, {
      transports: ["websocket"],
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Bricks:webSocket connected with id:", socket!.id);
    });

    socket.on("disconnect", () => {
      console.log("Bricks:webSocket disconnected");
    });

    socket.on("reconnect", () => {
      console.log("Bricks:webSocket reconnected");
    });

    socket.on("reconnect_failed", () => {
      console.log("Bricks:webSocket reconnection failed");
    });
  }

  if (!socket?.connected) {
    socket?.connect(); // ensure it actually tries to connect
  }

  return socket;
}
