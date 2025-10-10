import { Icon } from "@iconify/react";

export const getFileIcon = (fileName: string) => {
  const lower = fileName.toLowerCase();
  const ext = lower.split(".").pop();

  const fileMap: Record<string, string> = {
    "package.json": "vscode-icons:file-type-npm",
    "package-lock.json": "vscode-icons:file-type-npm",
    "yarn.lock": "vscode-icons:file-type-yarn",
    "pnpm-lock.yaml": "vscode-icons:file-type-pnpm",
    "tsconfig.json": "vscode-icons:file-type-tsconfig",
    "jsconfig.json": "vscode-icons:file-type-jsconfig",
    "next.config.js": "vscode-icons:file-type-next",
    "vite.config.js": "vscode-icons:file-type-vite",
    "webpack.config.js": "vscode-icons:file-type-webpack",
    "tailwind.config.js": "vscode-icons:file-type-tailwind",
    ".gitignore": "vscode-icons:file-type-git",
    ".env": "vscode-icons:file-type-dotenv",
    "dockerfile": "vscode-icons:file-type-docker",
    "readme.md": "vscode-icons--file-type-light-systemd",
    "README.md": "vscode-icons--file-type-light-systemd",
    "file": "vscode-icons:file-type-apib"
  };

  const extMap: Record<string, string> = {
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
    sh: "vscode-icons:file-type-shell",
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

  const icon = fileMap[lower] || (ext ? extMap[ext] : undefined) || "vscode-icons:file";

  return <Icon icon={icon} width="18" height="18" />;
};
