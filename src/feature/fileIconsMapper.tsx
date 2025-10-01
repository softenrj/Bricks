import { Icon } from "@iconify/react";
import vscodeIcons from "@iconify-json/vscode-icons/icons.json";

export const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  // Build dynamic map from vscode-icons pack
  const map: Record<string, string> = {
    js: "vscode-icons:file-type-js",
    jsx: "vscode-icons:file-type-reactjs",
    ts: "vscode-icons:file-type-typescript",
    tsx: "vscode-icons:file-type-reactts",
    py: "vscode-icons:file-type-python",
    php: "vscode-icons:file-type-php",
    go: "vscode-icons:file-type-go",
    rs: "vscode-icons:file-type-rust",
    java: "vscode-icons:file-type-java",
    c: "vscode-icons:file-type-c",
    cpp: "vscode-icons:file-type-cpp",
    h: "vscode-icons:file-type-header",
    html: "vscode-icons:file-type-html",
    css: "vscode-icons:file-type-css",
    scss: "vscode-icons:file-type-scss",
    json: "vscode-icons:file-type-json",
    md: "vscode-icons:file-type-markdown",
    yaml: "vscode-icons:file-type-yaml",
    yml: "vscode-icons:file-type-yaml",
    xml: "vscode-icons:file-type-xml",
    dockerfile: "vscode-icons:file-type-docker",
    sh: "vscode-icons:file-type-shell",
    env: "vscode-icons:file-type-dotenv",
    svg: "vscode-icons:file-type-svg",
    png: "vscode-icons:file-type-image",
    jpg: "vscode-icons:file-type-image",
    jpeg: "vscode-icons:file-type-image",
    gif: "vscode-icons:file-type-image",
    mp4: "vscode-icons:file-type-video",
    mp3: "vscode-icons:file-type-audio",
    wav: "vscode-icons:file-type-audio",
    zip: "vscode-icons:file-type-zip",
    rar: "vscode-icons:file-type-zip",
    lock: "vscode-icons:file-type-lock",
    sql: "vscode-icons:file-type-sql",
    prisma: "vscode-icons:file-type-prisma",
  };

  const icon = ext && map[ext] ? map[ext] : "vscode-icons:file";

  return <Icon icon={icon} width="20" height="20" />;
};
