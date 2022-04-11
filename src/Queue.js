import React from "react";

// ------ Material UI ------
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

// ------ STYLES ------
const styles = {
  outContainer: {
    minHeight: "90vh",
  },
  grid: { minHeight: "85vh", minWidth: "100%" },
  alertText: {padding: "2vh"}
};

function Queue() {
  return (
    <Grid
      container
    >
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
          <Typography variant="h5" color="inherit" noWrap >
            You are in queue
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={styles.grid}
      >
        <Typography component="h6" style={styles.alertText} >Waiting for other client</Typography>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default Queue;
