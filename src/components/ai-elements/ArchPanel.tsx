// Copyright (c) 2025-2026 Raj 
// See LICENSE for details.

"use client"
import { Icon } from '@iconify/react'
import { ArrowUp, ChevronRight, Ellipsis, GitPullRequestClosed, Hash, Merge, PanelLeftClose, Plus, Sparkles, X } from 'lucide-react'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { ApiResponse } from '@/types/Api'
import { postApi } from '@/utils/api/common'
import { API_BRICKS_ARCH_COMMIT, API_BRICKS_ARCH_REQUEST, API_BRICKS_ARCH_ROLLBACK } from '@/utils/api/APIConstant'
import { setArchFloatPanel, setArchJobId, setArchVoiePanel, setSnapIds, toggleArch } from '@/store/Reducers/IdeFeatures'
import toast from 'react-hot-toast'
import { Tooltip } from '../common/Tooltip'
import ArchChat from './ArchChat'
import { ISnapshotFile } from '@/types/snapshot'
import { rollBack } from '@/service/webContainer'
import { archCodeRollBack } from '@/store/Reducers/fsSlice'
import { upsertArchProcess } from '@/store/Reducers/ArchProcessChat'
import { uIdProvider } from '@/feature/uid'

function ArchPanel({ projectId }: { projectId: string }) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [prompt, setPrompt] = React.useState("");
    const [processing, setProcessing] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const process = useAppSelector(state => state.ArchProcess)
    const bottomRef = React.useRef<HTMLDivElement | null>(null);
    const IdeFea = useAppSelector(state => state.IdeFeatures);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend()
        }
    };

    const handleSend = async () => {
        if (prompt.trim() === "") return;
        setProcessing(true);
        setPrompt("");

        dispatch(upsertArchProcess({
            message: prompt,
            process: "complete",
            processId: uIdProvider(),
            role: "user"
        }))
        const response = await postApi<ApiResponse<string>>({
            url: API_BRICKS_ARCH_REQUEST,
            values: { projectId, prompt }
        })

        if (response?.success) {
            dispatch(setArchJobId(response?.data))
        }
        setProcessing(false);
        if (response?.success) { }
    }

    const handleCommit = async () => {
        if (!IdeFea.snap) return;
        const response = await postApi<ApiResponse<void>>({
            url: API_BRICKS_ARCH_COMMIT,
            values: IdeFea.snap
        })

        if (response?.success) {
            toast.success(response.message);
            dispatch(setSnapIds(null));
        }
    }

    const handleRollBack = async () => {
        if (!IdeFea.snap) return;
        const response = await postApi<ApiResponse<ISnapshotFile[]>>({
            url: API_BRICKS_ARCH_ROLLBACK,
            values: IdeFea.snap
        })

        if (response?.success) {
            toast.success(response.message);
            //await syncwebContainer(response.data);
            await rollBack(response.data)
            dispatch(archCodeRollBack(response.data))
            dispatch(setSnapIds(null));
        }
    }

    const handleSetText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (IdeFea.snap) {
            toast.custom(
                <div className="px-3 py-2 text-sm bg-yellow-300/10 rounded-full text-white border border-yellow-300/20">
                    ⚠️ Please select an action first.
                </div>,
                { position: "top-center", duration: 1000 }
            );
            return;
        }
        setPrompt(e.target.value);
    };

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [process.length]);



    React.useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }, [prompt]);

    return (
        <div className="h-full w-full bg-[#0D0D0D] flex flex-col items-center text-center p-1 text-gray-400">
            <div className="relative w-full flex items-center rounded-sm p-2">
                <div className='flex items-center gap-1'>
                    <Hash size={11} className='text-gray-500' />
                    <h3 className="text-[8px] tracking-wider text-gray-400">
                        ArchForge
                    </h3>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <Tooltip content="Close Arch">
                        <X size={12} onClick={() => dispatch(toggleArch(false))} className="cursor-pointer text-gray-400 hover:text-gray-200 transition" />
                    </Tooltip>

                    <Tooltip content='options'>
                        <Ellipsis size={12} />
                    </Tooltip>
                </div>
            </div>

            {/* <div className='w-full max-w-[400px] flex items-stretch justify-center gap-2 py-2'>
                <button className='w-full bg-white/5 cursor-pointer rounded-xs' onClick={() => dispatch(setArchVoiePanel(!IdeFea.ArchVoice))}>
                    <div className=' flex items-center justify-center gap-2 px-4 py-1'>
                        <Icon icon="nrk:media-soundwave" width="16" height="16" />
                        <span className='text-xs whitespace-nowrap truncate'>speech recognition</span>
                    </div>
                </button>
                <button className='w-full bg-white/5 cursor-pointer rounded-xs' onClick={() => dispatch(setArchFloatPanel(!IdeFea.ArchFloatPanel))}>
                    <div className=' flex items-center gap-2 px-4 py-1 justify-center'>
                        <Icon icon="game-icons:new-born" width="12" height="12" />
                        <span className='text-xs whitespace-nowrap truncate'>Small Panel</span>
                    </div>
                </button>
            </div> */}


            {process.length === 0 && <div className="flex flex-col justify-center items-center gap-2 flex-1">
                <div className="flex gap-2 items-center">
                    <Hash size={18} className='text-gray-400' />
                    <h1 className="text-md tracking-tight text-gray-300">
                        ArchForge
                    </h1>
                </div>

                <p className="max-w-md text-gray-500 text-[12px] leading-relaxed">
                    Create full application codebases using AI.
                    <span className="text-gray-400"> Arch AI </span> generates structured,
                    extensible projects that are ready to run, test, and preview in real time.
                </p>

            </div>}

            <div className='overflow-y-scroll hide-scrollbar w-full'>
                {process.map((item, idx) => <ArchChat key={idx} process={item} />)}
                <div ref={bottomRef} />
            </div>



            <div className="mt-auto w-[96%] flex flex-col focus:border-violet-500 justify-center items-center">
                {IdeFea.snap && <div className='flex p-1.5 flex-col justify-stretch items-start w-full border-t border-s border-r rounded-t-md border-[#1b1b1b] bg-[#0f0f0f] items-center gap-2'>
                    <button className='bg-[#141313] hover:bg-[#1c1b1b] w-full py-1 h-fit flex justify-between items-center px-3 rounded-xs border border-white/10 cursor-pointer group' onClick={handleRollBack}>
                        <div className='flex flex-col items-start'>
                            <span className='text-xs text-yellow-500'>RollBack</span>
                            <p className='text-[10px]'>All changes will sync to backend.</p>
                        </div>

                        <GitPullRequestClosed size={12} className='text-gray-400 ml-2 group-hover::text-gray-200' />
                    </button>
                    <button className='bg-[#141313] hover:bg-[#1c1b1b] w-full py-1 h-fit flex justify-between items-center px-3 rounded-xs border border-white/10 cursor-pointer group' onClick={handleCommit}>
                        <div className='flex flex-col items-start'>
                            <span className='text-xs text-green-500'>Commit</span>
                            <p className='text-[10px]'>All changes will sync to backend.</p>
                        </div>

                        <Merge size={12} className='text-gray-400 ml-2 group-hover::text-gray-200' />
                    </button>
                </div>}


                <div className="gap-2 z-2 w-full bg-[#0f0f0f] text-gray-300 py-2 px-3 rounded-md border border-[#1b1b1b]  shadow-sm backdrop-blur-md"
                >
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={handleSetText}
                        onKeyDown={handleKeyDown}
                        placeholder="Message"
                        rows={1}
                        className="flex-1 max-h-[160px] w-full bg-transparent resize-none text-[15px] leading-relaxed text-[#ececec] placeholder-[#8e8e8e] outline-none overflow-y-auto hide-scrollbar py-[6px]" />

                    <div className='w-full flex justify-between items-center'>
                        <div className='hover:bg-white/10 p-1.5 rounded-full transition-all duration-150 ease-in'>
                            <Plus size={14} />
                        </div>
                        <Tooltip content={prompt.trim().length === 0 ? "Please enter a message" : "Hit generate"}>
                            <button
                                className="inline-flex items-center justify-center shrink-0 w-7 h-7 border border-white/20 rounded-full bg-gray-800/30 hover:bg-gray-700/30 transition"
                                onClick={handleSend}
                                disabled={prompt.trim().length === 0}
                            >
                                <ArrowUp size={14} className={`${prompt.trim().length === 0 ? "text-white/50" : "text-white"}`} />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArchPanel