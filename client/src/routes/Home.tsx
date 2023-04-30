import Messages from "../components/Messages";
import MessageField from "../components/MessageField";
import ConnectedUsers from "../components/ConnectedUsers";

export default function Home() {
  return (
    <div style={{ display: "flex", padding: "1em" }}>
      <div style={{ flexGrow: 1 }}>
        <Messages />
        <MessageField />
      </div>
      <div>
        <ConnectedUsers />
      </div>
    </div>
  );
}
