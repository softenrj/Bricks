// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
import { LanguageEnum } from "@/feature/LanguageEnum";
import { FSData } from "../../types/fs";

export interface FSState {
  tree: FSData;
  activePath: string;
  projectName: string;
  selectedFile: string | null;
  selectedFileContent: string | null;
  selectedLanguage: typeof LanguageEnum[keyof typeof LanguageEnum];
  openTabs: { name: string; isEditing: boolean }[];
}