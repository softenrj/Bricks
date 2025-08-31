import { WebContainer } from "@webcontainer/api";

let wc: any;

export async function getWebContainer() {
  if (!wc) {
    wc = await WebContainer.boot();
  }
  return wc;
}
