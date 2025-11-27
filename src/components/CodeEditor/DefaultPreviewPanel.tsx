// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/svg/bricks-t-w.svg";
import {
    Rocket,
    Terminal,
    Download,
    ArrowDownCircle,
    MonitorSmartphone,
} from "lucide-react";

export default function DefaultPreviewPanel() {
    return (
        <div className="h-full w-full flex flex-col justify-between items-center text-center px-6 py-8 text-gray-400">
            <div className="flex flex-col justify-center items-center flex-1">
                <div className="flex items-center mb-5">
                    <Image
                        src={logo.src}
                        width={50}
                        height={50}
                        alt="Bricks Logo"
                        className="opacity-80"
                    />
                    <h1 className="font-bold text-3xl tracking-tight text-gray-300">
                        Bricks AI
                    </h1>
                </div>

                <p className="max-w-md text-gray-500 text-sm leading-relaxed mb-10">
                    Build, test, and preview your projects in realtime.
                    <span className="text-gray-400"> Bricks AI </span> lets you develop
                    at the speed of thought 🚀.
                </p>

                <div className="flex flex-col gap-5 text-left">
                    <Step
                        icon={<Download className="h-5 w-5 text-pink-400" />}
                        step="1"
                        text={
                            <>
                                Click the{" "}
                                <span className="text-pink-400">npm install</span> button to
                                install dependencies.
                                <br />
                                <span className="text-gray-600 text-xs">
                                    (This may take a few moments depending on your network)
                                </span>
                            </>
                        }
                    />

                    <Step
                        icon={<Terminal className="h-5 w-5 text-green-400" />}
                        step="2"
                        text={
                            <>
                                Run{" "}
                                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400 text-xs">
                                    npm run dev
                                </code>{" "}
                                to start your local development server.
                            </>
                        }
                    />

                    <Step
                        icon={<MonitorSmartphone className="h-5 w-5 text-blue-400" />}
                        step="3"
                        text="Preview your app live — no refresh needed!"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center text-sm text-gray-600 mb-2">
                <ArrowDownCircle className="h-5 w-5 text-gray-600 mb-1 animate-bounce" />
                <p className="italic text-gray-500">
                    Start building and watch the magic unfold ✨
                </p>
            </div>
        </div>
    );
}

function Step({
    icon,
    step,
    text,
}: {
    icon: React.ReactNode;
    step: string;
    text: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5">{icon}</div>
            <p className="text-sm text-gray-400 leading-snug">
                <span className="font-medium text-gray-300">Step {step}:</span> {text}
            </p>
        </div>
    );
}
