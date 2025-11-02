"use client";
import React from "react";
import { Toggle } from "../ui/toggle";
import { ChevronsLeftRightEllipsis } from "lucide-react";
import { Tooltip } from "../common/Tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleCodeCompletion } from "@/store/Reducers/IdeFeatures";

function FooterController() {
    const codeCompletion = useAppSelector(state => state.IdeFeatures).codeCompletion
  const dispatch = useAppDispatch();

  const handleCodeCompletion = () => {
    dispatch(toggleCodeCompletion(!codeCompletion))
  }

  return (
    <div className='bg-[#0E0E0E] h-6 px-4 flex justify-between items-center border-b border-gray-800 shadow-sm max-w-screen'>
      <Tooltip content={codeCompletion ? 'code completion is on' : 'code completion is off'}>
        <div className="flex items-center text-xs gap-2 cursor-pointer" onClick={handleCodeCompletion}>
        <ChevronsLeftRightEllipsis size={20} className={`${codeCompletion ? 'text-green-500' : 'text-pink-500'}`} />
        <p className={`${codeCompletion ? 'text-white' : 'text-gray-400'}`}>code completion</p>
      </div>
      </Tooltip>
    </div>
  );
}

export default FooterController;
