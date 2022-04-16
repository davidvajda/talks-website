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

// ------ React Components ------
import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight, AlertMessage } from "./Message";

// ------ Functions ------
import { getTime } from "./getTime"

// ------ STYLES ------
const styles = {
  outContainer: {
    minHeight: "85vh",
  },
  inContainer: {
    height: "75vh",
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
        return [
          {
            message: data.message,
            key: prevState.length,
            time: getTime(data.time),
            type: data.type,
            get component() {
              if (data.type === "message") {
                return (
                  <MessageLeft
                    key={this.key}
                    message={this.message}
                    time={this.time}
                  />
                );
              } else {
                return (
                  <AlertMessage
                    key={this.key}
                    message={this.message}
                    time={this.time}
                  />
                );
              }
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
      time: messageSent,
    });

    setChatMessages((prevState) => [
      {
        message: message,
        key: prevState.length,
        time: getTime(messageSent),
        type: "message",
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

  const leaveChat = () => {
    sio.emit("leave_chat");
    setScreen("home");
  }

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
          <Button variant="outlined" onClick={() => leaveChat()} startIcon={<ArrowBackIosNewIcon />}>
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
