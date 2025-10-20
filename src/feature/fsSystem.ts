// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
import { FSData } from "../../types/fs";
import { LanguageEnum } from "./LanguageEnum";
import { isValidBase64 } from "./projectDownload";

export function getFileContent(tree: FSData, path: string): string {
  const segments = path.split("/");
  let node: any = tree;
  for (const seg of segments) {
    if (!node) return "";
    node = node[seg];
  }
  return typeof node === "string" ? isValidBase64(node) ? atob(node) : node : "";
}

export function detectLanguage(path: string): typeof LanguageEnum[keyof typeof LanguageEnum] {
  const ext = path.split(".").pop() || "";
  return (LanguageEnum as any)[ext] || LanguageEnum.md;
}

export const normalizePath = (p: string) => (!p || p === "" ? "." : p);
