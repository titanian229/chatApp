import { Outlet } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import WebSocketProvider from "../contexts/WebSocketContext";
import TopNav from "../components/TopNav";

export default function Root() {
  return (
    <WebSocketProvider>
      <CssBaseline />
      <TopNav />
      <div>
        <Outlet />
      </div>
    </WebSocketProvider>
  );
}
