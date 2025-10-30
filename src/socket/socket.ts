import { io, Socket } from "socket.io-client";
import { serverUrl } from "@/utils/constance";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem('bricks:auth')

  if (!socket) {
    socket = io(serverUrl, {
      transports: ["websocket"],
      auth: { token: token }
    });

    socket.on("connect", () => {
      console.log("Bricks:webSocket connected with id:", socket!.id);
    });

    socket.on("disconnect", () => {
      console.log("Bricks:webSocket disconnected");
    });
  }

  return socket;
}