import { useContext } from "react";
import { AppBar, Box, Toolbar, Typography, Container } from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import UserIcon from "./UserIcon";
import CloudQueueTwoToneIcon from "@mui/icons-material/CloudQueueTwoTone";
import CloudOffTwoToneIcon from "@mui/icons-material/CloudOffTwoTone";

import { WebSocketContext } from "../contexts/WebSocketContext";

function ResponsiveAppBar() {
  const connection = useContext(WebSocketContext);

  // Menu shows: Connected state, user's avatar
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ApiIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JL
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>TODO: Responsive version</Box> */}
          <ApiIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <UserIcon svgString={connection?.myIcon} size="responsive" />
            {/* <Tooltip title="Your icon">
              <Avatar sx={{ width: 36, height: 36 }} alt="Your icon">
                {connection.myIcon ? (
                ) : (
                  <PersonOutlineTwoToneIcon />
                )}
              </Avatar>
            </Tooltip> */}
          </Box>
          <Box sx={{ marginLeft: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {connection.isConnected ? (
              <CloudQueueTwoToneIcon sx={{ width: 36, height: 36 }} />
            ) : (
              <CloudOffTwoToneIcon sx={{ width: 36, height: 36 }} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
