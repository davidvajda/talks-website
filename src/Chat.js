import React, { useState, useEffect } from "react";

function Chat({ sio, setScreen }) {
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // ------ SOCKETIO EVENTS ------
  useEffect(() => {
    sio.on("message", (data) => {
      data.key = chatMessages.length

      console.log(data) // DEBUG CODE

      setChatMessages((prevState) => [
        data, ...prevState,
      ]);
    });

    sio.once("client_disconnected", () => {
      setScreen("home");
      alert("Other client has disconnected");
    });
  }, [sio]);

  // ------ ONCLICK FUNCTIONS ------
  const sendMessage = () => {
    sio.emit("message", {
      message: text,
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
      {JSON.stringify(chatMessages)}
      {chatMessages.length}
    </div>
  );
}

export default Chat;
