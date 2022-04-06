import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Talks
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Chat({ sio, setScreen }) {
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // ------ SOCKETIO EVENTS ------
  useEffect(() => {
    sio.on("message", (data) => {
      console.log(data); // DEBUG CODE

      setChatMessages((prevState) => {
        data.key = prevState.length;
        return [data, ...prevState];
      });
    });

    sio.once("client_disconnected", () => {
      setScreen("home");
      alert("Other client has disconnected");
    });
  }, [sio]);

  // ------ ONCLICK FUNCTIONS ------
  const sendMessage = () => {
    const time = new Date();
    sio.emit("message", {
      message: text,
      time: time.getTime(),
    });
    setChatMessages((prevState) => [
      {
        message: text,
        key: prevState.length,
        time: "time",
        from: "idk",
        viewed: true,
      },
      ...prevState,
    ]);
    setText("");
  };

  // ------ RENDER FUNCTIONS ------
  const renderMessages = () => {
    return chatMessages.map((chatMessage) => {
      return <li>{chatMessage.message}</li>;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h5" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4, backgroundSize: "cover",
            backgroundPosition: "center"}} >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              ANOTHERS CLIENT NAME
            </Typography>
          </Toolbar>
          <p>bitch</p>
          <p>bitch</p>
          <p>bitch</p>
          <p>bitch</p>
          <p>bitch</p>
          <TextField
              margin="normal"
              fullWidth
              id="name"
              name="text"
              autoFocus
            />        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default Chat;
