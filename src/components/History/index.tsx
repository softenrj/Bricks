// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

import React from 'react'
import ProjectHistory from './ProjectHistory'

function index({projectId}: {projectId: string}) {
  return (
    <div>
        <ProjectHistory projectId={projectId} />
    </div>
  )
}

export default index