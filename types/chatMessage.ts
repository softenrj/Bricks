export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  image?: string | ArrayBuffer | undefined
  isNew: boolean;
  timestamp?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BricksChat {
  _id: string;
  userId: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}