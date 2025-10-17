export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  image?: string | ArrayBuffer | undefined
  timestamp?: string;
}