// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
import { FSData } from "../../types/fs";
import JSZip from "jszip";
import saveAs from "file-saver";

export async function downLoadProject(project_name: string, fsTree: FSData) {
  const zip = new JSZip();
  generatePhysicalFileSystem(zip, fsTree);
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${project_name}.zip`);
}

export const isValidBase64 = (str: string) => {
  if (!str || str.length % 4 !== 0) return false;
  const regex = /^[A-Za-z0-9+/=]+$/;
  return regex.test(str.replace(/\s/g, ""));
};

const generatePhysicalFileSystem = (zip: JSZip, fs: FSData) => {
  Object.keys(fs).forEach((key) => {
    const value = fs[key];

    if (typeof value === "string") {
      try {
        let base64Content = value.trim();

        if (base64Content.includes(",")) {
          base64Content = base64Content.split(",")[1];
        }

        if (isValidBase64(base64Content)) {
          const content = atob(base64Content);
          zip.file(key, content);
        } else {
          console.warn(`${key} is not valid Base64 — saving raw text`);
          zip.file(key, value);
        }
      } catch (err) {
        console.error(` Failed to decode ${key}`, err);
        zip.file(key, value);
      }
    } else if (typeof value === "object" && value !== null) {
      const folder = zip.folder(key);
      if (folder) generatePhysicalFileSystem(folder, value);
    }
  });
};
