// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { Icon } from "@iconify/react";

export const getFileIcon = (fileName: string) => {
  const lower = fileName.toLowerCase();
  const ext = lower.split(".").pop();
  
  const fileMap: Record<string, string> = {
    // Package managers
    "package.json": "vscode-icons:file-type-npm",
    "package-lock.json": "vscode-icons:file-type-npm",
    "yarn.lock": "vscode-icons:file-type-yarn",
    "pnpm-lock.yaml": "vscode-icons:file-type-pnpm",
    "bun.lockb": "vscode-icons:file-type-bun",
    
    // Config files
    "tsconfig.json": "vscode-icons:file-type-tsconfig",
    "jsconfig.json": "vscode-icons:file-type-jsconfig",
    "next.config.js": "vscode-icons:file-type-next",
    "next.config.ts": "vscode-icons:file-type-next",
    "vite.config.js": "vscode-icons:file-type-vite",
    "vite.config.ts": "vscode-icons:file-type-vite",
    "webpack.config.js": "vscode-icons:file-type-webpack",
    "tailwind.config.js": "vscode-icons:file-type-tailwind",
    "tailwind.config.ts": "vscode-icons:file-type-tailwind",
    "postcss.config.js": "vscode-icons:file-type-postcss",
    "babel.config.js": "vscode-icons:file-type-babel",
    ".babelrc": "vscode-icons:file-type-babel",
    "eslint.config.js": "vscode-icons:file-type-eslint",
    ".eslintrc": "vscode-icons:file-type-eslint",
    ".eslintrc.json": "vscode-icons:file-type-eslint",
    ".prettierrc": "vscode-icons:file-type-prettier",
    "prettier.config.js": "vscode-icons:file-type-prettier",
    
    // Git files
    ".gitignore": "vscode-icons:file-type-git",
    ".gitattributes": "vscode-icons:file-type-git",
    ".gitmodules": "vscode-icons:file-type-git",
    
    // Environment files
    ".env": "vscode-icons:file-type-dotenv",
    ".env.local": "vscode-icons:file-type-dotenv",
    ".env.development": "vscode-icons:file-type-dotenv",
    ".env.production": "vscode-icons:file-type-dotenv",
    ".env.example": "vscode-icons:file-type-dotenv",
    
    // Docker
    "dockerfile": "vscode-icons:file-type-docker",
    "docker-compose.yml": "vscode-icons:file-type-docker",
    "docker-compose.yaml": "vscode-icons:file-type-docker",
    ".dockerignore": "vscode-icons:file-type-docker",
    
    // Documentation
    "readme.md": "material-icon-theme:readme",
    "README.md": "material-icon-theme:readme",
    "license": "vscode-icons:file-type-license",
    "LICENSE": "vscode-icons:file-type-license",
    "license.md": "vscode-icons:file-type-license",
    "LICENSE.md": "vscode-icons:file-type-license",
    "license.txt": "vscode-icons:file-type-license",
    "LICENSE.txt": "vscode-icons:file-type-license",
    "contributing.md": "vscode-icons:file-type-contributing",
    "CONTRIBUTING.md": "vscode-icons:file-type-contributing",
    "code_of_conduct.md": "vscode-icons:file-type-codeowners",
    "CODE_OF_CONDUCT.md": "vscode-icons:file-type-codeowners",
    "changelog.md": "vscode-icons:file-type-changelog",
    "CHANGELOG.md": "vscode-icons:file-type-changelog",
    "security.md": "vscode-icons:file-type-security",
    "SECURITY.md": "vscode-icons:file-type-security",
    "authors": "vscode-icons:file-type-authors",
    "AUTHORS": "vscode-icons:file-type-authors",
    
    // CI/CD
    ".gitlab-ci.yml": "vscode-icons:file-type-gitlab",
    ".travis.yml": "vscode-icons:file-type-travis",
    "jenkinsfile": "vscode-icons:file-type-jenkins",
    "Jenkinsfile": "vscode-icons:file-type-jenkins",
    
    // Other
    "makefile": "vscode-icons:file-type-makefile",
    "Makefile": "vscode-icons:file-type-makefile",
    ".editorconfig": "vscode-icons:file-type-editorconfig",
    "vercel.json": "vscode-icons:file-type-vercel",
    "netlify.toml": "vscode-icons:file-type-netlify",
    
    // Default file
    "file": "vscode-icons:file-type-apib"
  };
  
  const extMap: Record<string, string> = {
    // JavaScript/TypeScript
    js: "vscode-icons:file-type-js",
    jsx: "vscode-icons:file-type-reactjs",
    ts: "vscode-icons:file-type-typescript",
    tsx: "vscode-icons:file-type-reactts",
    mjs: "vscode-icons:file-type-js",
    cjs: "vscode-icons:file-type-js",
    
    // Python
    py: "vscode-icons:file-type-python",
    pyc: "vscode-icons:file-type-python",
    pyo: "vscode-icons:file-type-python",
    
    // Other languages
    php: "vscode-icons:file-type-php",
    go: "vscode-icons:file-type-go",
    rs: "vscode-icons:file-type-rust",
    java: "vscode-icons:file-type-java",
    c: "vscode-icons:file-type-c",
    cpp: "vscode-icons:file-type-cpp",
    cc: "vscode-icons:file-type-cpp",
    cxx: "vscode-icons:file-type-cpp",
    h: "vscode-icons:file-type-header",
    hpp: "vscode-icons:file-type-header",
    rb: "vscode-icons:file-type-ruby",
    swift: "vscode-icons:file-type-swift",
    kt: "vscode-icons:file-type-kotlin",
    dart: "vscode-icons:file-type-dart",
    
    // Web
    html: "vscode-icons:file-type-html",
    css: "vscode-icons:file-type-css",
    scss: "vscode-icons:file-type-scss",
    sass: "vscode-icons:file-type-sass",
    less: "vscode-icons:file-type-less",
    
    // Data formats
    json: "vscode-icons:file-type-json",
    yaml: "vscode-icons:file-type-yaml",
    yml: "vscode-icons:file-type-yaml",
    xml: "vscode-icons:file-type-xml",
    toml: "vscode-icons:file-type-toml",
    csv: "vscode-icons:file-type-csv",
    
    // Scripts
    sh: "vscode-icons:file-type-shell",
    bash: "vscode-icons:file-type-shell",
    zsh: "vscode-icons:file-type-shell",
    fish: "vscode-icons:file-type-shell",
    ps1: "vscode-icons:file-type-powershell",
    
    // Images
    svg: "vscode-icons:file-type-svg",
    png: "vscode-icons:file-type-image",
    jpg: "vscode-icons:file-type-image",
    jpeg: "vscode-icons:file-type-image",
    gif: "vscode-icons:file-type-image",
    webp: "vscode-icons:file-type-image",
    ico: "vscode-icons:file-type-image",
    
    // Media
    mp4: "vscode-icons:file-type-video",
    avi: "vscode-icons:file-type-video",
    mov: "vscode-icons:file-type-video",
    mp3: "vscode-icons:file-type-audio",
    wav: "vscode-icons:file-type-audio",
    flac: "vscode-icons:file-type-audio",
    
    // Archives
    zip: "vscode-icons:file-type-zip",
    rar: "vscode-icons:file-type-zip",
    tar: "vscode-icons:file-type-zip",
    gz: "vscode-icons:file-type-zip",
    "7z": "vscode-icons:file-type-zip",
    
    // Database
    sql: "vscode-icons:file-type-sql",
    prisma: "vscode-icons:file-type-prisma",
    db: "vscode-icons:file-type-db",
    
    // Documentation
    md: "material-icon-theme:markdown",
    mdx: "vscode-icons:file-type-mdx",
    txt: "vscode-icons:file-type-text",
    pdf: "vscode-icons:file-type-pdf",
    
    // Other
    lock: "vscode-icons:file-type-lock",
    log: "vscode-icons:file-type-log",
    wasm: "vscode-icons:file-type-wasm",
    graphql: "vscode-icons:file-type-graphql",
    gql: "vscode-icons:file-type-graphql",
  };
  
  const icon = fileMap[lower] || (ext ? extMap[ext] : undefined) || "vscode-icons:file-type-apib";
  return <Icon icon={icon} width="16" height="16" />;
};