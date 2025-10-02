import { io, Socket } from "socket.io-client";
import { serverUrl } from "@/utils/constance";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  if (typeof window === "undefined") return null;

  if (!socket) {
    socket = io(serverUrl, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected with id:", socket!.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  }

  return socket;
}