// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client";
import React from "react";
import BricksIcon from "@/assets/svg/bricks-t-w.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { tabs } from "./IdeTabs";
import { Tooltip } from "../common/Tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MobileTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const active = pathname.split("/").pop();
  const [hide, setHide] = React.useState<boolean>(true);

  return (
    <div className="relative">

      {/* PANEL */}
      <AnimatePresence initial={false}>
        {!hide && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
            className="overflow-hidden bg-[#0D0D0D]/80 backdrop-blur 
                       border-b border-white/10 text-white shadow-lg"
          >
            <div className="h-12 px-3 flex items-center justify-between">
              <Avatar className="h-8 w-8">
                <AvatarImage src={BricksIcon.src} crossOrigin="anonymous" />
                <AvatarFallback>Bricks</AvatarFallback>
              </Avatar>

              <div className="flex items-center overflow-x-auto scrollbar-hide">
                {tabs.map(({ href, icon: Icon, label }) => {
                  const isActive = active === href;

                  return (
                    <Tooltip key={href} content={label}>
                      <Link
                        href={`/${projectId}/${href}`}
                        className={`
                          flex items-center justify-center min-w-[36px] h-9 rounded-xl px-3
                          transition-all
                          ${
                            isActive
                              ? "bg-white/10 text-white border border-white/20 shadow-inner"
                              : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }
                        `}
                      >
                        <Icon size={16} />
                      </Link>
                    </Tooltip>
                  );
                })}

                <Tooltip content="Hide Panel">
                  <button
                    className="flex items-center justify-center min-w-[36px] h-9 rounded-xl px-3"
                    onClick={() => setHide(true)}
                  >
                    <ChevronDown size={16} />
                  </button>
                </Tooltip>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT BUTTON */}
      <AnimatePresence>
        {hide && (
          <motion.div
            key="toggle"
            initial={{ opacity: 0, scale: 0.7, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-999 top-4 right-4 text-white
                       bg-white/10 backdrop-blur rounded-full
                       border border-white/20 shadow-lg"
          >
            <Tooltip content="Show Panel">
              <button
                className="flex items-center justify-center h-5 w-5 rounded-xl"
                onClick={() => setHide(false)}
              >
                <ChevronUp size={14} />
              </button>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileTabs;
