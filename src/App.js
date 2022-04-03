import "./App.css";
import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import Home from "./Home";
import Queue from "./Queue"

const { io } = require("socket.io-client");

function App() {
  // ------ STATES ------
  const [screen, setScreen] = useState("home");
  const [sio, setSio] = useState(null);

  // ------ RENDER FUNCTIONS ------
  const renderScreen = () => {
    if (screen === "home") {
      return <Home sio={sio} setScreen={setScreen} />;
    } else if (screen === "chat") {
      return <Chat sio={sio} setScreen={setScreen} />;
    } else if (screen === "queue") {
      return <Queue />
    }
  };

  // ------ LOAD PAGE ------
  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5000")
    // const newSocket = io("http://192.168.1.28:5000")
    setSio(newSocket);
    return () => newSocket.close()
  }, [setSio]);

  return (
    <div className="App">
      {sio ? <div>{renderScreen()}</div> : <div>No Connection established</div>}
    </div>
  );
}

export default App;
