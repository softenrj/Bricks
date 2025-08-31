import { WebContainer } from "@webcontainer/api";
import { getWebContainer } from "./webContainer";


let wc: WebContainer;
export async function getFSTree(dir: string = "."): Promise<any> {
    if (!wc) wc = await getWebContainer();
    const entries = await wc!.fs.readdir(dir, { withFileTypes: true });
    const tree: any = {};

    for (const entry of entries) {
        const fullPath = dir === "." ? entry.name : `${dir}/${entry.name}`;
        if (entry.isDirectory()) {
            tree[entry.name] = await getFSTree(fullPath);
        } else {
            const content = await wc!.fs.readFile(fullPath, "utf-8");
            tree[entry.name] = btoa(content);
        }
    }
    return tree;
}
