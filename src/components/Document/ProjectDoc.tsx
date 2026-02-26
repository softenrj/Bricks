// Copyright (c) 2025 Raj 
// See LICENSE for details.

"use client";

import React, { useEffect, useState } from "react";
import { useProjectDoc } from "@/service/api.project.doc";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ProjectDocMetadata } from "../../../types/project.doc";
import { cn } from "@/lib/utils";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={copy}
      className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
    >
      {isCopied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </Button>
  );
};

function ProjectDoc({ projectId }: { projectId: string }) {
  const [doc, setDoc] = useState<ProjectDocMetadata | null>(null);
  const { data, isLoading } = useProjectDoc(projectId);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setDoc(data[0]);
    }
  }, [data]);

  const formatTitle = (key: string) => {
    if (key === "readme") return "README";
    if (key === "dockerfile") return "Dockerfile";
    return key
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] p-6 space-y-4">
        <Skeleton className="h-8 w-[280px] bg-zinc-800/50" />
        <Skeleton className="h-[200px] w-full bg-zinc-800/30" />
        <Skeleton className="h-[200px] w-full bg-zinc-800/30" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-zinc-500">
        No documentation found.
      </div>
    );
  }

  const validDocs = Object.entries(doc).filter(
    ([_, content]) => typeof content === "string" && content.trim().length > 0
  );

  if (!validDocs.length) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-zinc-500">
        No documentation files available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl h-[77vh] text-zinc-100">
      <Tabs
        defaultValue={validDocs[0][0]}
        className="w-full h-full flex flex-col"
      >
        <div className="sticky top-0 z-20 ">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="flex w-fit bg-transparent p-2 gap-2">
              {validDocs.map(([key]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "px-4 py-4 text-sm font-medium rounded-sm border transition",
                    "data-[state=active]:bg-zinc-800 data-[state=active]:border-zinc-700 data-[state=active]:text-zinc-100",
                    "text-zinc-400 hover:bg-zinc-900"
                  )}
                >
                  {formatTitle(key)}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="flex-1 overflow-hidden bg-[#09090b] rounded-sm">
          <ScrollArea className="h-full w-full px-6 py-4">
            {validDocs.map(([key, content]) => (
              <TabsContent
                key={key}
                value={key}
                className="mt-0 animate-in fade-in-50"
              >
                <Card className="bg-transparent border-none shadow-none text-white">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({
                        inline,
                        className,
                        children,
                        ...props
                      }: any) {
                        const match = /language-(\w+)/.exec(
                          className || ""
                        );
                        const code = String(children).replace(/\n$/, "");

                        if (!inline && match) {
                          return (
                            <div className="relative group my-6 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900">
                              <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 text-xs text-zinc-400">
                                <span>{match[1].toUpperCase()}</span>
                              </div>

                              <CopyButton text={code} />

                              <SyntaxHighlighter
                                {...props}
                                style={vs}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                  margin: 0,
                                  background: "transparent",
                                  padding: "1.5rem",
                                  fontSize: "0.9rem",
                                  lineHeight: "1.6",
                                }}
                              >
                                {code}
                              </SyntaxHighlighter>
                            </div>
                          );
                        }

                        return (
                          <code
                            className="rounded bg-zinc-800 px-1 py-0.5 text-sm"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </Card>
              </TabsContent>
            ))}
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}

export default ProjectDoc;
