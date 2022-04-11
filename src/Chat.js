import React, { useState, useEffect } from "react";

// ------ Material UI ------
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// ------ React Components
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight, AlertMessage } from "./Message";

// ------ STYLES ------
const styles = {
  outContainer: {
    minHeight: "90vh",
  },
  inContainer: {
    height: "78vh",
    overflowY: "scroll",
    marginTop: "2vh",
    marginBottom: "1vh",
  },
  grid: { minHeight: "100vh", minWidth: "100%" },
  toolbarText: {
    marginLeft: 30,
    marginRight: 30,
  },
};

function Chat({ sio, setScreen, otherClient }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // ------ SOCKETIO EVENTS ------
  useEffect(() => {
    sio.on("message", (data) => {
      setChatMessages((prevState) => {
        const messageSent = new Date(data.time);
        return [
          {
            message: data.message,
            key: prevState.length,
            time: `${messageSent.getHours()}:${messageSent.getMinutes()}`,
            type: "message",
            get component() {
              return (
                <MessageLeft
                  key={this.key}
                  message={this.message}
                  time={this.time}
                />
              );
            },
          },
          ...prevState,
        ];
      });
    });

    sio.once("client_disconnected", () => {
      // setScreen("home");
      const messageSent = new Date();
      setChatMessages((prevState) => {
        return [
          {
            message: "Other client has left the chat",
            key: prevState.length,
            time: `${messageSent.getHours()}:${messageSent.getMinutes()}`,
            type: "alert",
            get component() {
              return (
                <MessageLeft
                  key={this.key}
                  message={this.message}
                  time={this.time}
                />
              );
            },
          },
          ...prevState,
        ];
      });
    });
  }, [sio]);

  // ------ ONCLICK FUNCTIONS ------
  const sendMessage = () => {
    if (message.length < 1) {
      return null;
    }

    const messageSent = new Date();
    sio.emit("message", {
      message: message,
      time: messageSent.getTime(),
    });

    setChatMessages((prevState) => [
      {
        message: message,
        key: prevState.length,
        time: `${messageSent.getHours()}:${messageSent.getMinutes()}`,
        type: "text",
        get component() {
          return (
            <MessageRight
              key={this.key}
              message={this.message}
              time={this.time}
            />
          );
        },
      },
      ...prevState,
    ]);
    setMessage("");
  };

  // ------ RENDER FUNCTIONS ------
  const renderMessages = () => {
    return chatMessages.map((chatMessage) => {
      return chatMessage.component;
    });
  };

  // ------ JSX ------
  return (
    <Grid container spacing={0} direction="column" style={styles.grid}>
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
          <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
            Leave chat
          </Button>
          <Typography variant="h5" style={styles.toolbarText}>
            You are talking to {otherClient.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={styles.outContainer}>
        <Stack
          maxWidth="md"
          style={styles.inContainer}
          direction="column-reverse"
          spacing={1}
        >
          {renderMessages()}
        </Stack>
        <TextInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Container>
    </Grid>
  );
}

export default Chat;
