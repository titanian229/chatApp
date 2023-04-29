import { useWebSocket } from "../contexts/WebSocketContext";

export default function Home() {
  const isConnected = useWebSocket();

  return (
    <div>
      <h2>Home</h2>
      <p>Connected: {String(isConnected)}</p>
    </div>
  );
}
