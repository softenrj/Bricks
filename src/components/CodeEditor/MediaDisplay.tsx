// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client";

import { useAppSelector } from "@/hooks/redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function MediaDisplay() {
  const selectedMedia = useAppSelector((state) => state.fs);
  const selectedMediaUrl = selectedMedia.selectedFileContent;

  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    const fetchImage = async () => {
      setLoading(true);
      setError(null);
      try {
        if (selectedMediaUrl) {
          const res = await axios.get(selectedMediaUrl, { responseType: "blob" });
          objectUrl = URL.createObjectURL(res.data);
          setLocalUrl(objectUrl);
        }
      } catch (err) {
        console.error("Failed to fetch image:", err);
        setError("Failed to load media.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedMediaUrl) fetchImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [selectedMediaUrl]);

  return (
    <div className="flex items-center justify-center p-4">
      {loading && (
        <div className="w-[400px] h-[400px] flex items-center justify-center rounded-md animate-pulse">
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      )}

      {!loading && error && (
        <div className="w-[400px] h-[400px] flex items-center justify-center rounded-md text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && localUrl && (
        <Image
          src={localUrl}
          alt="media"
          width={400}
          height={400}
          className="rounded-md shadow-md object-contain"
        />
      )}
    </div>
  );
}

export default React.memo(MediaDisplay);
