// Copyright (c) 2025 Raj
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import {
  WebContainer,
  type IFSWatcher,
} from "@webcontainer/api";

import { FSData } from "../../types/fs";
import { AppDispatch } from "@/store/store";
import { addLog } from "@/store/Reducers/webContainer";
import { fileCreateUpdateFlow } from "@/store/Reducers/fsSlice";


let wc: WebContainer | null = null;
let wcBootPromise: Promise<WebContainer> | null = null;

export async function getWebContainer(): Promise<WebContainer> {
  if (wc) return wc;

  if (!wcBootPromise) {
    wcBootPromise = WebContainer.boot().then((container) => {
      wc = container;
      return container;
    });
  }

  return wcBootPromise;
}

async function buildTree(
  baseAddress: string,
  tree: FSData,
  container: WebContainer
): Promise<void> {
  for (const key of Object.keys(tree)) {
    const value = tree[key];
    const path = baseAddress === "." ? key : `${baseAddress}/${key}`;

    if (typeof value === "string") {
      await container.fs.writeFile(path, value);
    } else {
      await container.fs.mkdir(path, { recursive: true });
      await buildTree(path, value, container);
    }
  }
}

export async function initialFSWebContainer(tree: FSData, dispatch: AppDispatch, projectId: string): Promise<void> {
  const container = await getWebContainer();
  await buildTree(".", tree, container);
  initFsWatcherPipeLine(dispatch, projectId, true)
}

async function detectType(container: WebContainer, fileName: string | Uint8Array<ArrayBufferLike>) {
  try {
    await container.fs.readFile(String(fileName), "utf-8");
    return { type: "file" as const };
  } catch (_) { }

  try {
    await container.fs.readdir(String(fileName));
    return { type: "folder" as const };
  } catch (_) { }

  return { type: "unknown" as const };
}


let fsWatcher: IFSWatcher | null = null;

export async function initFsWatcherPipeLine(
  dispatch: AppDispatch,
  projectId: string,
  watch = true
): Promise<void> {
  const container = await getWebContainer();
  startFSWatcher(container, projectId, dispatch);
}

export function startFSWatcher(
  container: WebContainer,
  projectId: string,
  dispatch: AppDispatch
) {
  if (fsWatcher) {
    console.warn("[FS] Watcher already running");
    return;
  }

  fsWatcher = container.fs.watch("/", { recursive: true }, async (event, fileName) => {
    if (!fileName) return;
    if (String(fileName).startsWith("node_modules")) return;

    try {
      const { type } = await detectType(container, fileName);

      const segments = String(fileName).split("/");
      const name = segments.pop()!;
      const parentPath = segments.length ? segments.join("/") : ".";

      let content = "";
      if (type === "file") {
        content = await container.fs.readFile(String(fileName), "utf-8");
      }

      dispatch(
        addLog({
          text: `change --> ${name}`,
          timestamp: new Date().toLocaleString(),
          type: "success",
        })
      );

      dispatch(
        fileCreateUpdateFlow({ parentPath, name, projectId, content, type })
      );
    } catch (err) {
      dispatch(
        addLog({
          text: `FS watcher error: ${String(err)}`,
          type: "error",
          timestamp: new Date().toISOString(),
        })
      );
    }
  });
}

export function stopFSWatcher() {
  if (!fsWatcher) {
    return;
  }

  fsWatcher.close();
  fsWatcher = null;
}

export async function toggleFSWatcher(
  dispatch: AppDispatch,
  projectId: string
) {
  const container = await getWebContainer();

  if (fsWatcher) {
    stopFSWatcher();
  } else {
    startFSWatcher(container, projectId, dispatch);
  }
}