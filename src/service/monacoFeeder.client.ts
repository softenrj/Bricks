// import * as monaco from "monaco-editor";

// // This is the new part: set up compiler options
// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//   target: monaco.languages.typescript.ScriptTarget.ESNext,
//   module: monaco.languages.typescript.ModuleKind.ESNext,
//   // This is the key change! Use NodeJs for proper path resolution and aliasing.
//   moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs, 
//   allowSyntheticDefaultImports: true,
//   esModuleInterop: true,
//   jsx: monaco.languages.typescript.JsxEmit.React,
//   // This is the key part for aliased imports
//   baseUrl: 'file:///src', // Base URL for paths, aligned with tsconfig
//   paths: {
//     "@/*": ["*"], // Map the @/ alias to the src directory root
//     "/": ["public/"], // Map absolute imports starting with / to public/
//     "node_modules/*": ["node_modules/*"], // Add this for external libraries
//   },
//   lib: ['esnext', 'dom']
// });

// export async function populateMonacoFromFS(tree: any, path: string = "") {
//   for (const [name, value] of Object.entries(tree)) {
//     const fullPath = path ? `${path}/${name}` : name;
//     if (typeof value === "string") {
//       const content = atob(value);
//       const ext = name.split(".").pop();
//       const lang =
//         { ts: "typescript", tsx: "typescript", js: "javascript", jsx: "javascript", html: "html", css: "css", json: "json", md: "markdown" }[ext?.toLowerCase() || ""] ||
//         "plaintext";
//       const uri = monaco.Uri.parse(`file:///${fullPath}`);
//       if (!monaco.editor.getModel(uri)) {
//         monaco.editor.createModel(content, lang, uri);
//       }
//     } else {
//       await populateMonacoFromFS(value, fullPath);
//     }
//   }
// }

// monaco.languages.typescript.typescriptDefaults.addExtraLib(
//   `
//     declare module "@/hooks/redux" {
//       export function useAppSelector<T>(selector: (state: any) => T): T;
//     }
//     declare module "@/hooks/use-mobile" {
//       export function useMobile(): boolean;
//     }
//     declare module "@/store/store" {
//       export const store: any;
//     }
//     declare module "@/store/Reducers/fsSlice" {
//       export const fsSlice: any;
//     }
//     declare module "@/store/Reducers/webContainer" {
//       export const webContainer: any;
//     }
//     declare module "@/feature/LanguageEnum" {
//       export enum LanguageEnum {
//         TS = "typescript",
//         JS = "javascript",
//         JSX = "jsx",
//         TSX = "tsx",
//         JSON = "json",
//         CSS = "css",
//         HTML = "html",
//         MD = "markdown"
//       }
//     }
//     declare module "react" {
//       export const useState: any;
//       export const useEffect: any;
//       // You can add more React declarations as needed
//     }
//     declare module "react-dom" {
//       export const createRoot: any;
//     }
//     declare module "@monaco-editor/react" {
//       export const Editor: any;
//     }
//   `,
//   'file:///node_modules/@types/custom/index.d.ts'
// );
