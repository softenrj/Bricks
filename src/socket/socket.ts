import { io, Socket } from "socket.io-client";
import { serverUrl } from "@/utils/constance";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem('bricks:auth')

  if (!socket) {
    socket = io(serverUrl, {
      transports: ["websocket"],
      auth: { token: token },
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

  return socket;
}

// Auto-connect the socket when the module is loaded on the client-side
if (typeof window !== "undefined") {
  getSocket();
}
