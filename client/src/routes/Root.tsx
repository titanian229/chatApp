import { Outlet } from "react-router-dom";
import WebSocketProvider from "../contexts/WebSocketContext";

export default function Root() {
  return (
    <WebSocketProvider>
      <div>
        <h1>Root</h1>
        <Outlet />
      </div>
    </WebSocketProvider>
  );
}
