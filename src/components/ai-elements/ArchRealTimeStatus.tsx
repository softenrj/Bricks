// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "../ui/spinner";

function ArchRealTimeStatus() {
  const [processRunning, setProcessRunning] = React.useState(true);


  return (
    0 && <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="
        fixed top-20 left-1/2 -translate-x-1/2
        flex items-center gap-2
        max-w-[50vw] w-auto
        bg-[#1f1f1f]/80 text-gray-300 text-xs
        px-3 py-2
        rounded-md border border-[#2d2d2d]
        shadow-sm hover:shadow-md
        z-[999]
      "
    >
      {processRunning && (
        <Spinner className="w-4 h-4 text-green-400" />
      )}

      <p
        className={`
          strike-container truncate max-w-full leading-relaxed
          ${!processRunning ? "strike-active text-gray-400" : ""}
        `}
      >
        dsf
      </p>
    </motion.div>
  );
}

export default ArchRealTimeStatus;
