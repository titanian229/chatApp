import { useContext, useMemo } from "react";
import { UserContext } from "../contexts/WebSocketContext";
import UserIcon from "./UserIcon";

export default function ConnectedUsers() {
  const userState = useContext(UserContext);

  const userList = useMemo(
    () => Object.keys(userState).map((key) => ({ icon: userState[key].icon, id: key })),
    [userState]
  );

  return (
    <div>
      {/* <h3>Connected Users</h3> */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {userList.map(({ icon, id }) => (
          <UserIcon key={id} svgString={icon} />
        ))}
      </div>
    </div>
  );
}
