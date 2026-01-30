'use client';

import React, { useState, useMemo } from 'react';
import { Check, Eye, EyeOff, Info, X } from 'lucide-react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';


const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: 'At least 8 characters' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[!-\/:-@[-`{-~]/, text: 'At least 1 special character' },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;


type Requirement = {
  met: boolean;
  text: string;
};

type PasswordStrength = {
  score: StrengthScore;
  requirements: Requirement[];
};

const PasswordInput = ({ name = 'password' }: { name?: string }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const strength = useMemo<PasswordStrength>(() => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));

    return {
      score: requirements.filter((r) => r.met).length as StrengthScore,
      requirements,
    };
  }, [password]);

  const isMatch = useMemo(() => {
    if (!confirmPassword) return null;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  return (
    <div className="space-y-2">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-xs sm:text-sm text-zinc-300"
        >
          Password
        </label>

        <HoverCard openDelay={200}>
          <HoverCardTrigger>
            <Info
              size={18}
              className="cursor-pointer text-pink-400 hover:text-pink-300 transition"
            />
          </HoverCardTrigger>

          <HoverCardContent className="bg-zinc-950 border border-white/10 text-zinc-200">
            <ul className="space-y-1.5">
              {strength.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2">
                  {req.met ? (
                    <Check size={16} className="text-pink-400" />
                  ) : (
                    <X size={16} className="text-zinc-500" />
                  )}
                  <span
                    className={`text-xs ${
                      req.met ? 'text-pink-400' : 'text-zinc-400'
                    }`}
                  >
                    {req.text}
                  </span>
                </li>
              ))}
            </ul>
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Inputs row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Password */}
        <div className="relative flex-1">
          <input
            id={name}
            name={name}
            type={isVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="
              w-full p-2
              bg-[#2F2F32]
              text-white text-sm
              placeholder:text-zinc-500
              border-2 border-white/10
              focus:border-pink-400
              focus:ring-2 focus:ring-pink-400/30
              focus:outline-none
              transition-all
            "
          />
          <button
            type="button"
            onClick={() => setIsVisible((v) => !v)}
            className="absolute inset-y-0 right-0 w-9 flex items-center justify-center text-zinc-400 hover:text-white transition"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="flex-1">
          <input
            type={isVisible ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className={`
              w-full p-2
              bg-[#2F2F32]
              text-white text-sm
              placeholder:text-zinc-500
              border-2
              ${
                !confirmPassword
                  ? 'border-white/10'
                  : isMatch
                  ? 'border-pink-400'
                  : 'border-red-500'
              }
              focus:outline-none
              transition-all
            `}
          />
        </div>
      </div>

      {confirmPassword && isMatch === false && (
        <p className="text-red-400 text-xs">
          Passwords do not match
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
