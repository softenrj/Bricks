export interface RealtimeStatusSocket {
    id: string
    type: "info" | "warn" | "fun" | "error"
    message: string
}