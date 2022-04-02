import React, { useState } from "react";

function Home({ sio, setScreen }) {
  // ------ STATES ------
  const [name, setName] = useState("");

  // ------ ONCLICK FUNCTIONS ------
  const talkeeJoin = () => {
    if (name !== "") {
      sio.emit("talkee_join", { name: name });
    } else {
      alert("Please, enter name!");
    }
  };

  // ------ SOCKETIO FUNCTIONS ------
  sio.on("chat_connected", () => {
    setScreen("chat");
  });

  sio.on("enqueued", () => {
    setScreen("queue");
  });

  const listenerJoin = () => {
    if (name !== "") {
      sio.emit("listener_join", { name: name });
    } else {
      alert("Please, enter name!");
    }
  };

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <div>
          <button onClick={() => talkeeJoin()}>Join as a Talkee</button>
        </div>
        <div>
          <button onClick={() => listenerJoin()}>Join as a Listener</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
