// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
import { WebContainer } from "@webcontainer/api";
import { FSData } from "../../types/fs";
import { AppDispatch } from "@/store/store";
import { addLog } from "@/store/Reducers/webContainer";
import { fileCreateUpdateFlow, newFile, newFileWithContent } from "@/store/Reducers/fsSlice";

let wc: WebContainer | null = null;
let wcBootPromise: Promise<WebContainer> | null = null;

export async function getWebContainer(): Promise<WebContainer> {
  if (wc) return wc;
  if (!wcBootPromise) {
    wcBootPromise = WebContainer.boot().then(container => {
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
      // It's a file
      await container.fs.writeFile(path, value);

    } else {
      // It's a directory
      await container.fs.mkdir(path, { recursive: true });
      await buildTree(path, value, container);
    }
  }
}

export async function initialFSWebContainer(tree: FSData): Promise<void> {
  const container = await getWebContainer();
  await buildTree(".", tree, container)
}


export async function initFsWatcherPipeLine(
  dispatch: AppDispatch,
  projectId: string,
  watch: boolean = true
): Promise<void> {

  const container = await getWebContainer();
  if (!container) return;

  if (!watch) return;

  container.fs.watch("/", { recursive: true }, async (event, fileName) => {
    if (!fileName) return;
    if (String(fileName).startsWith("node_modules")) return;

    try {
      const { type } = await detectType(container, String(fileName));

      const segments = String(fileName).split("/");
      const name = segments.pop()!;
      const parentPath = segments.length ? segments.join("/") : ".";

      let content: string = "";

      if (type === "file") {
        content = await container.fs.readFile(String(fileName), "utf-8");
      }

      dispatch(addLog({
        text: `change --> ${name}`,
        timestamp: Date.now().toLocaleString(),
        type: 'success'
      }))
      dispatch(
        fileCreateUpdateFlow({ parentPath, name, projectId, content, type: type || "file" })
      );
    } catch (err) {
      dispatch(
        addLog({
          text: `FS watcher error: ${err}`,
          type: "error",
          timestamp: new Date().toISOString(),
        })
      );
    }
  });

}


async function detectType(container: WebContainer, fileName: string) {
  // Try file read
  try {
    await container.fs.readFile(fileName, "utf-8");
    return { type: "file" as const };
  } catch (_) {
    // ignore, maybe folder
  }

  // Try directory read
  try {
    await container.fs.readdir(fileName);
    return { type: "folder" as const };
  } catch (_) {
    // It’s neither → deleted or unknown
    return { type: "unknown" as const };
  }
}
