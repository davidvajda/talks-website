import React, { useState } from "react";

function Chat({ sio, setScreen }) {
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState(["Say hi to each other!"]);

  // ------ SOCKETIO EVENTS ------
  sio.on("message", (data) => {
    setChatMessages((prevState) => [data.message, ...prevState]);
  });

  sio.on("client_disconnected", () => {
    setScreen("home");
    alert("Other client has disconnected");
  });

  // ------ ONCLICK FUNCTIONS ------
  const sendMessage = () => {
    sio.emit("message", { message: text });
    setChatMessages(prevState => [text, ...prevState])
    setText("")
  };

  // ------ RENDER FUNCTIONS ------
  const renderMessages = () => {
    return chatMessages.map((message) => {
      return <li>{message}</li>;
    });
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button onClick={() => sendMessage()}>SEND</button>
      </div>
      <div>
        <h3>CHAT MESSAGES:</h3>
      </div>
      <div>
        <ul>{renderMessages()}</ul>
      </div>
    </div>
  );
}

export default Chat;
