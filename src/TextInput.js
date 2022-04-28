import React from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import TextField from '@mui/material/TextField';

// ------ STYLES ------
const styles = {
  button: {
    width: "15%",
    alignSelf: "end",
    padding: 10,
    marginLeft: 20, 
    marginTop: 5,
  },
  textInput: {
    width: "77%",
    alignSelf: "start",
  }
};

export const TextInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div>
<TextField variant="outlined"
        value={message}
        style={styles.textInput}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <Button variant="contained" style={styles.button}>
        {"SEND"}

        <SendIcon onClick={() => sendMessage()}>
          <Visibility />
        </SendIcon>
      </Button>
    </div>
  );
};
