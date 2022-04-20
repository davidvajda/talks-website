import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

// ------ Material UI ------
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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
      </Link>
      {" " + new Date().getFullYear()}
    </Typography>
  );
}

function Home({ sio, setScreen, setOtherClient }) {
  // ------ STATES ------
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameLabel, setNameLabel] = useState("Your name:");

  const [sessionSid, setSessionSid] = useLocalStorage();

  // ------ ONCLICK FUNCTIONS ------
  const checkClients = () => {
    sio.emit("check_clients")
  }

  const talkeeJoin = () => {
    if (name !== "") {
      sio.emit("talkee_join", { name: name });
      nameTextfieldReset();
    } else {
      voidNameError();
    }
  };

  const listenerJoin = () => {
    if (name !== "") {
      sio.emit("listener_join", { name: name });
      nameTextfieldReset();
    } else {
      voidNameError();
    }
  };

  // ------ STYLE FUNCTIONS ------
  const voidNameError = () => {
    setNameError(true);
    setNameLabel("Please, enter your name:");
  };

  const nameTextfieldReset = () => {
    setNameError(false);
    setNameLabel("Your name:");
  };

  // ------ SOCKETIO FUNCTIONS ------
  sio.on("connected", (sid) => {
    if (sessionSid) {
      sio.emit("reconnect", sessionSid);
    }
    setSessionSid(sid);
  });

  sio.on("chat_connected", (otherClient) => {
    setScreen("chat");
    setOtherClient(otherClient);
  });

  sio.on("enqueued", () => {
    setScreen("queue");
  });

  // ------ JSX ------
  return (
    <Grid container component="main" sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome to Talks!
          </Typography>
          <Typography component="p">
            Mental health is equally, if not more important than physical
            health. Since the beginning of pandemic it's been more difficult to
            talk things through with other people and let the mental tension go
            away. This website's purpose is to connect you with a random
            stranger so you can talk and share your thoughts.
          </Typography>
          <TextField
            error={nameError}
            onChange={(e) => setName(e.target.value)}
            value={name}
            margin="normal"
            required
            fullWidth
            id="name"
            label={nameLabel}
            name="name"
            autoComplete="name"
            autoFocus
          />
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Typography variant="p">
              If you feel like you have a lot to get off your chest then
            </Typography>
            <Button
              onClick={() => talkeeJoin()}
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Join as Talkee
            </Button>
            <Typography variant="p">
              If you'd like to listen to someone then
            </Typography>
            <Button
              onClick={() => listenerJoin()}
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Join as a Listener
            </Button>
            <Button onClick={() => checkClients()}>
              check
            </Button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
