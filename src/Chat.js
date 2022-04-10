import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";

// ------ STYLES ------
const styles = {
  outContainer: {
    minHeight: "95vh",
  },
  inContainer: { minHeight: "86vh" },
  textInput: {},
};

function Chat({ sio, setScreen }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // ------ SOCKETIO EVENTS ------
  useEffect(() => {
    sio.on("message", (data) => {
      setChatMessages((prevState) => {
        data.key = prevState.length;
        return [
          {
            message: data.message,
            key: prevState.length,
            time: "time",
            viewed: true,
            type: "text",
            get component() {
              return <MessageLeft key={this.key} message={this.message} time={this.time} />
            },
          },
          ...prevState,
        ];
      });
    });

    sio.once("client_disconnected", () => {
      setScreen("home");
      alert("Other client has disconnected");
    });
  }, [sio]);

  // ------ ONCLICK FUNCTIONS ------
  const sendMessage = () => {
    if (message.length < 1){
      return null;
    }

    const time = new Date();
    sio.emit("message", {
      message: message,
      time: time.getTime(),
    });

    setChatMessages((prevState) => [
      {
        message: message,
        key: prevState.length,
        time: "time",
        viewed: true,
        type: "text",
        get component() {
          return <MessageRight key={this.key} message={this.message} time={this.time} />;
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
    <Grid
      container
      spacing={0}
      direction="column"
      // alignItems="center"
      // justifyContent="center"
      style={{ minHeight: "100vh", minWidth: "100%" }}
    >
      <Container
        maxWidth="md"
        //alignItems="center"
        // justifyContent="center"
        style={styles.outContainer}
      >
        <Stack
          maxWidth="md"
          style={styles.inContainer}
          direction="column-reverse"
          // justifyContent="flex-start"
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
