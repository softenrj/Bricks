import { WebContainer } from "@webcontainer/api";
import { FSData } from "../../types/fs";

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
      const content = Buffer.from(value, "base64").toString("utf-8");
      await container.fs.writeFile(path, content);

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


export async function installDep(): Promise<void> {
  const container = await getWebContainer();
  const installProcess = await container.spawn("npm", ["install"]);
  await installProcess.exit;
}
