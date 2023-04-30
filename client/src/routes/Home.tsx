import { useContext } from "react";
import { WebSocketContext, UserContext } from "../contexts/WebSocketContext";
import UserIcon from "../components/UserIcon";

export default function Home() {
  const websocketState = useContext(WebSocketContext);
  const userState = useContext(UserContext);
  // console.log(
  //   Object.keys(userState.connectedUsers)
  //     .map((key) => userState.connectedUsers[key])
  //     .map(({ icon }) => <img src={`data:image/svg+xml;utf8,${icon}`} />)
  // );
  return (
    <div>
      <h2>Home</h2>
      <p>Connected: {String(websocketState.isConnected)}</p>
      <h3>Connected Users</h3>
      {Object.keys(userState)
        .map((key) => ({ icon: userState[key].icon, id: key }))
        .map(({ icon, id }) => (
          // <img key={id} src={`data:image/svg+xml;utf8,${icon}`} />
          // <div key={id} dangerouslySetInnerHTML={{ __html: icon }} style={{ width: "3em" }} />
          <div>
            <UserIcon key={id} svgString={icon} />
          </div>
        ))}
    </div>
  );
}
