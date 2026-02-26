// Copyright (c) 2025 Raj 
// See LICENSE for details.

"use client"
import { Icon } from '@iconify/react'
import { ChevronRight, PanelLeftClose, Sparkles, X } from 'lucide-react'
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
        setPrompt("");
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
        <div className="h-full w-full bg-[#0D0D0D] flex flex-col items-center text-center px-6 py-8 text-gray-400">
            <div className="relative bg-white/5 w-full flex items-center rounded-sm p-2">
                <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 items-center shadow-2xl">
                    <Icon
                        icon="streamline-flex:ai-chip-robot-remix"
                        width="12"
                        height="12"
                    />
                    <h3 className="font-bold text-sm tracking-tight text-gray-300">
                        ArchForge
                    </h3>
                </div>

                {/* Right action */}
                <div className="ml-auto">
                    <Tooltip content="Close Arch">
                        <X size={12} onClick={() => dispatch(toggleArch(false))} className="cursor-pointer text-gray-400 hover:text-gray-200 transition" />
                    </Tooltip>
                </div>

            </div>

            <div className='w-full max-w-[400px] flex items-stretch justify-center gap-2 py-2'>
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
            </div>
            {process.length === 0 && <div className="flex flex-col justify-center items-center flex-1">
                <div className="flex gap-2 items-center mb-5">
                    <Icon icon="streamline-flex:ai-chip-robot-remix" width="24" height="24" />
                    <h1 className="font-bold text-3xl tracking-tight text-gray-300">
                        ArchForge
                    </h1>
                </div>

                <p className="max-w-md text-gray-500 text-sm leading-relaxed mb-10">
                    Create full application codebases using AI.
                    <span className="text-gray-400"> Arch AI </span> generates structured,
                    extensible projects that are ready to run, test, and preview in real time.
                </p>

            </div>}

            <div className='overflow-y-scroll hide-scrollbar w-full'>
                {process.map((item, idx) => <ArchChat key={idx} process={item} />)}
                <div ref={bottomRef} />
            </div>



            <div className="mt-auto w-full flex flex-col justify-center items-center">
                {IdeFea.snap && <div className='flex justify-center items-center gap-2 mb-2'>
                    <button className='bg-white/5 px-3 py-1 rounded-xs border border-white/10 cursor-pointer hover:text-white' onClick={handleRollBack}>
                        <p>RollBack</p>
                    </button>
                    <button className='bg-white/5 px-3 py-1 rounded-xs border border-white/10 cursor-pointer hover:text-white' onClick={handleCommit}>
                        <p>Commit</p>
                    </button>
                </div>}
                <div
                    className="inline-flex items-center gap-2 max-w-[620px] w-full
                 bg-[#1f1f1f]/80 text-gray-300 py-2 px-3 rounded-xl
                 border border-[#2d2d2d] shadow-sm backdrop-blur-md"
                >
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={handleSetText}
                        onKeyDown={handleKeyDown}
                        placeholder="Message"
                        rows={1}
                        className="flex-1 max-h-[160px] bg-transparent resize-none text-[15px] leading-relaxed text-[#ececec] placeholder-[#8e8e8e] outline-none overflow-y-auto hide-scrollbar py-[6px]" />

                    <Tooltip content="Run">
                        <button
                            className="inline-flex items-center justify-center shrink-0 w-7 h-7 border border-gray-600 rounded-full bg-gray-800/30 hover:bg-gray-700/50 transition"
                            onClick={handleSend}
                        >
                            <ChevronRight size={14} />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default ArchPanel