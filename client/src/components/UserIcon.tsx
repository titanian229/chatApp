import { Avatar } from "@mui/material";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";

export default function UserIcon({ svgString, size }: { svgString?: string; size?: string }) {
  return (
    <Avatar sx={{ width: 36, height: 36 }} alt="Your icon">
      {svgString ? (
        <div
          dangerouslySetInnerHTML={{ __html: svgString }}
          style={{ width: size === "responsive" ? "100%" : "3em" }}
        />
      ) : (
        <PersonOutlineTwoToneIcon />
      )}
    </Avatar>
  );
}
