// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import { motion } from "framer-motion";
import NavBar from "./MobileAppNavbar/index";

function AppMobileNavbar() {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute right-6 top-12 z-999"
    >
      <NavBar />
    </motion.div>
  );
}

export default AppMobileNavbar;
