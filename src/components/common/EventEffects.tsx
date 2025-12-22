// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client"

import { useAppSelector } from "@/hooks/redux"
import { EffectEnum } from "@/types/event"
import Snowfall from "react-snowfall"

function EventEffects() {
    const features = useAppSelector(state => state).Effects
  return (
    <div className="fixed inset-0 z-[999] pointer-events-none">
      { features.effect === EffectEnum.CHRISTMAS && <><Snowfall snowflakeCount={40} color="#ff4d4f" />
      <Snowfall snowflakeCount={40} color="#40a9ff" />
      <Snowfall snowflakeCount={40} color="#73d13d" />
      <Snowfall snowflakeCount={40} color="#9254de" /></>}
    </div>
  )
}

export default EventEffects
