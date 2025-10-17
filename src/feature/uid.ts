import { uid } from "uid/secure";

export const uIdProvider = () => {
  return uid(16);
};