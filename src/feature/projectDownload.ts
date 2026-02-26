// Copyright (c) 2025 Raj 
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
        zip.file(key, value.trim());
      } catch (err) {
        console.error(` Failed to generate ${key}`, err);
        zip.file(key, value);
      }
    } else if (typeof value === "object" && value !== null) {
      const folder = zip.folder(key);
      if (folder) generatePhysicalFileSystem(folder, value);
    }
  });
};
