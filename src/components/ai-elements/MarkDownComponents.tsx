// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import { Components } from "react-markdown";
import CodeBlock from "./CodeBlock";

function MarkDownComponents(): Components {
    return {
        /* ---------- TABLES ---------- */
        table({ children }) {
            return (
                <div className="overflow-x-auto my-5 rounded-lg border border-[#444] bg-[#1e1e1e]/60 backdrop-blur-sm shadow-md">
                    <table className="w-full border-collapse text-[15px] leading-relaxed">
                        {children}
                    </table>
                </div>
            );
        },
        thead({ children }) {
            return (
                <thead className="bg-[#2d2d2d] text-[#eaeaea] font-semibold border-b border-[#444]">
                    {children}
                </thead>
            );
        },
        th({ children }) {
            return (
                <th className="px-4 py-3 border border-[#3e3e3e] text-left font-semibold whitespace-nowrap">
                    {children}
                </th>
            );
        },
        td({ children }) {
            return (
                <td className="px-4 py-3 border border-[#3e3e3e] text-[#ddd] align-top">
                    {children}
                </td>
            );
        },
        tr({ children }) {
            return (
                <tr className="hover:bg-[#2b2b2b]/70 transition-colors duration-150">
                    {children}
                </tr>
            );
        },


        /* ---------- CODE BLOCKS ---------- */
        code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (match) {
                return <CodeBlock lang={match[1]}>{children}</CodeBlock>;
            }
            return (
                <code className="bg-[#2a2a2a] text-[#d4d4d4] px-1.5 py-0.5 rounded-md text-[90%] font-mono">
                    {children}
                </code>
            );
        },

        /* ---------- TEXT ELEMENTS ---------- */
        h1({ children }) {
            return (
                <h1 className="mt-6 mb-4 text-2xl font-bold text-white border-b border-[#444] pb-2">
                    {children}
                </h1>
            );
        },
        h2({ children }) {
            return (
                <h2 className="mt-6 mb-3 text-xl font-semibold text-[#f0f0f0] border-b border-[#333] pb-1">
                    {children}
                </h2>
            );
        },
        h3({ children }) {
            return (
                <h3 className="mt-4 mb-2 text-lg font-semibold text-[#e0e0e0]">
                    {children}
                </h3>
            );
        },
        p({ children }) {
            return <p className="my-3 leading-relaxed text-[#d6d6d6]">{children}</p>;
        },
        ul({ children }) {
            return <ul className="list-disc list-inside my-3 space-y-1 text-[#d6d6d6]">{children}</ul>;
        },
        ol({ children }) {
            return <ol className="list-decimal list-inside my-3 space-y-1 text-[#d6d6d6]">{children}</ol>;
        },
        li({ children }) {
            return <li className="ml-1">{children}</li>;
        },
        blockquote({ children }) {
            return (
                <blockquote className="border-l-4 border-[#888] pl-4 italic my-4 text-[#cfcfcf] bg-[#2a2a2a]/40 rounded-r-md">
                    {children}
                </blockquote>
            );
        },
        hr() {
            return <hr className="my-6 border-[#333]" />;
        },
    };
}

export default MarkDownComponents;
