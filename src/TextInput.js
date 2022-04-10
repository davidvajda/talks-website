import React from "react";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';

export const TextInput = ({message, setMessage, sendMessage}) => {
  return (
    <FormControl fullWidth sx={{ m: 1}} variant="standard">
          <InputLabel htmlFor="message">Your message</InputLabel>
          <Input
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <SendIcon onClick={() => sendMessage()}>
                    <Visibility />
                </SendIcon>
              </InputAdornment>
            }
          />
        </FormControl>
  );
};
