export const LanguageEnum = {
  // JavaScript & TypeScript
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  mjs: "javascript",
  cjs: "javascript",

  // Web markup & styling
  html: "html",
  htm: "html",
  css: "css",
  scss: "scss",
  less: "less",
  sass: "scss",
  styl: "stylus",

  // Templates / frontend frameworks
  hbs: "handlebars",
  ejs: "ejs",
  pug: "pug",
  vue: "vue",
  svelte: "svelte",
  astro: "astro",
  tsxjsx: "typescript", // optional if mixed TSX/JSX

  // Data formats
  json: "json",
  jsonc: "json",
  json5: "json",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",
  xml: "xml",
  csv: "csv",
  md: "markdown",

  // Backend & scripting
  py: "python",
  rb: "ruby",
  php: "php",
  java: "java",
  cs: "csharp",
  go: "go",
  sh: "shell",
  bash: "shell",
  zsh: "shell",
  rs: "rust",
  c: "c",
  cpp: "cpp",
  wasm: "webassembly",

  // SQL / database
  sql: "sql",

  // Other common text/code
  txt: "plaintext",
  dockerfile: "dockerfile",
  makefile: "makefile",
  env: "dotenv",
  conf: "plaintext",
  ini: "plaintext",
  log: "plaintext",

  // Images / binaries (optional)
  svg: "xml",
  png: "plaintext",
  jpg: "plaintext",
  jpeg: "plaintext",
  gif: "plaintext",
  ico: "plaintext",
} as const;
