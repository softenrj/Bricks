// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileOptionTemplet from "./MobileOptionTemplet";
import { Fan, FileText, Grid, Layers, Settings, User } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

function AppNavBarOptions({ show = true, onClose }: { show?: boolean, onClose: () => void }) {
  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col items-end gap-3"
        >
          <motion.div variants={itemVariants}>
            <MobileOptionTemplet name="Dashboard" Icon={Grid} href="/dashboard" onClose={onClose} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MobileOptionTemplet name="Projects" Icon={Layers} href="/projects" onClose={onClose} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MobileOptionTemplet name="Documents" Icon={FileText} href="/doc" onClose={onClose} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MobileOptionTemplet name="Events" Icon={Fan} href="/events" onClose={onClose} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MobileOptionTemplet name="Account" Icon={User} href="/account" onClose={onClose} />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AppNavBarOptions;
