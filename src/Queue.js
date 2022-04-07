import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";

import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function Queue() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h5" color="inherit" noWrap>
            You are in queue
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mb: 4, justifyContent: "center"}}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, justifyContent: "center"}}
        >
          <Typography component="h6" >Waiting for other client</Typography>
          <CircularProgress/>

        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Queue;
