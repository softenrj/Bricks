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
import { ISnapshotFile } from "@/types/snapshot";


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

async function ensureDir(container: any, filePath: string) {
  const lastSlashIndex = filePath.lastIndexOf('/');

  if (lastSlashIndex === -1) return;

  const dirPath = filePath.substring(0, lastSlashIndex);

  try {
    await container.fs.mkdir(dirPath, { recursive: true });
  } catch (e: any) {
    if (e?.code !== 'EEXIST') {
      console.error("Directory creation failed:", e);
      throw e;
    }
  }
}
function toContainerPath(path: string): string {
  const idx = path.indexOf("src/");

  if (idx !== -1) {
    return "/" + path.slice(idx);
  }

  return "/src/" + path.replace(/^\/?src\//, "");
}

export async function archWebContainerProcess(
  path: string,
  content: string,
  projectId: string,
  dispatch: AppDispatch
): Promise<void> {
  const container = await getWebContainer();
  stopFSWatcher();

  const containerPath = toContainerPath(path);

  await ensureDir(container, containerPath);

  await container.fs.writeFile(containerPath, content);

  startFSWatcher(container, projectId, dispatch);
}

export const rollBack = async (files: ISnapshotFile[]) => {
  try {
    const container = await getWebContainer();

    await Promise.all(
      files.map(async (file: ISnapshotFile) => {
        const containerPath = toContainerPath(file.path);

        if (file.action === "create") {
          await container.fs.rm(containerPath, { force: true });
        }

        else if (file.action === "modify") {
          await container.fs.writeFile(containerPath, file.content);
        }
      })
    );

  } catch (error) {
    console.error("Error While Rollback WebContainer", error);
  }
};
