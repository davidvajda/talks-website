import React, { useState, useEffect } from "react";

// ------ React Components ------
import Chat from "./Chat";
import Home from "./Home";
import Queue from "./Queue";

const { io } = require("socket.io-client");

function App() {
  // ------ STATES ------
  const [screen, setScreen] = useState("home");
  const [sio, setSio] = useState(null);

  const [otherClient, setOtherClient] = useState({});
  

  // ------ RENDER FUNCTIONS ------
  const renderScreen = () => {
    if (screen === "home") {
      return (
        <Home sio={sio} setScreen={setScreen} setOtherClient={setOtherClient} />
      );
    } else if (screen === "chat") {
      return <Chat sio={sio} setScreen={setScreen} otherClient={otherClient} />;
    } else if (screen === "queue") {
      return <Queue />;
    }
  };

  // ------ LOAD PAGE ------
  useEffect(() => {
    // const newSocket = io("http://127.0.0.1:5000");
    const newSocket = io("https://talks-server.herokuapp.com/")
    // const newSocket = io("http://192.168.1.28:9999")

    setSio(newSocket);

    return () => newSocket.close();
  }, [setSio]);

  return (
    <div className="App">
      {sio ? (
        <div>{renderScreen()}</div>
      ) : (
        <div>Connecting to the server...</div>
      )}
    </div>
  );
}

export default App;
