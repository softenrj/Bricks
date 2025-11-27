// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  Mail,
  AtSign,
} from "lucide-react";
import { Tooltip } from "./Tooltip";

function Footer() {
  const [year, setYear] = React.useState<number>(new Date().getFullYear());

  return (
    <footer className="relative text-gray-300 px-4 sm:px-8 py-10 sm:py-12 mt-12">
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative flex flex-col items-center">
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 text-xl sm:text-2xl">
          <Tooltip content="GitHub">
            <a
              href="https://github.com/softenrj"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-transform"
            >
              <Github />
            </a>
          </Tooltip>

          <Tooltip content="LinkedIn">
            <a
              href="https://www.linkedin.com/in/raj-sharma-23447527b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 hover:scale-110 transition-transform"
            >
              <Linkedin />
            </a>
          </Tooltip>

          <Tooltip content="Instagram">
            <a
              href="https://www.instagram.com/raj_s.e/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 hover:scale-110 transition-transform"
            >
              <Instagram />
            </a>
          </Tooltip>

          <Tooltip content="Threads">
            <a
              href="https://www.threads.com/@raj_s.e/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 hover:scale-110 transition-transform"
            >
              <AtSign />
            </a>
          </Tooltip>

          <Tooltip content="Facebook">
            <a
              href="https://www.facebook.com/raj.sharma.424866/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 hover:scale-110 transition-transform"
            >
              <Facebook />
            </a>
          </Tooltip>

          <Tooltip content="WhatsApp">
            <a
              href="https://wa.me/8360206237"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 hover:scale-110 transition-transform"
            >
              <MessageCircle />
            </a>
          </Tooltip>

          <Tooltip content="Email">
            <a
              href="mailto:rjsharmase@gmail.com"
              className="hover:text-red-400 hover:scale-110 transition-transform"
            >
              <Mail />
            </a>
          </Tooltip>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-400 w-full">
          © {year} BRICKS AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
