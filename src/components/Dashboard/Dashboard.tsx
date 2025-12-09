// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.
"use client";

import React from "react";
import HeadLine from "./Dashboard.headline";
import DashboardRecent from "./Dashboard.recent";
import DashboardAICard from "./Dashboard.topcard";
import { useAppDispatch } from "@/hooks/redux";
import { setUserdata } from "@/store/Reducers/user";
import { connectSocket, getSocket } from "@/socket/socket";
import { useUser } from "@/service/api.user";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { data: user, isLoading } = useUser();

  React.useEffect(() => {
    if (!user) return

    dispatch(setUserdata(user))
    ensureSocketConnection()
  }, [user, dispatch])

  const ensureSocketConnection = React.useCallback(() => {
    const tryConnect = () => {
      const socket = getSocket();

      if (!socket?.connected) {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem("bricks:auth");
          connectSocket(token);
        }
        setTimeout(tryConnect, 2000);
      } else {
        console.log("Socket connected successfully");
      }
    };

    tryConnect();
  }, []);


  return (
    <div className="theme-dashboard px-4 flex flex-col">
      <HeadLine />
      <DashboardAICard />
      <DashboardRecent />
    </div>
  );
}

export default Dashboard;
