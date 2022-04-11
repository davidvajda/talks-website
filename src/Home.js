import React, { useState } from "react";

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
      {new Date().getFullYear()}
    </Typography>
  );
}

function Home({ sio, setScreen, setOtherClient }) {
  // ------ STATES ------
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameLabel, setNameLabel] = useState("Your name:");

  // ------ ONCLICK FUNCTIONS ------
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
  sio.on("chat_connected", (otherClient) => {
    console.log("[CHAT CONNECTED]");
    setScreen("chat");
    setOtherClient(otherClient);
  });

  sio.on("enqueued", () => {
    console.log("[ENQUEUED]");
    setScreen("queue");
  });

  // ------ JSX ------
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Talks
          </Typography>
          <Typography component="p">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
            <Button
              onClick={() => talkeeJoin()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Joins as a Talkee
            </Button>
            <Button
              onClick={() => listenerJoin()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join as a Listener
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
