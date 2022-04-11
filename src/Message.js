import React from "react";

// ------ STYLES ------
const styles = {
  message: {
    position: "relative",
    padding: 20,
    paddingBottom: 30,
    maxWidth: "70%",
    minWidth: "10%"
  },
  left: {
    backgroundColor: "rgba(0, 128, 255, 0.25)",
    alignSelf: "flex-start",
    borderRadius: "20px 20px 20px 0px",
  },
  right: {
    backgroundColor: "rgba(50, 150, 50, 0.25)",
    alignSelf: "flex-end",
    borderRadius: "20px 20px 0px 20px",
  },
  messageText: {
    color: "rgba(50, 50, 50)",
  },
  time: {
    position: "absolute",
    bottom: 5,
    fontSize: 15,
    color: "rgba(50, 50, 50, 0.5)",
  },
  timeRgiht: {
    right: 20,
  },
  alertWrapper: {
    color: "rgba(50, 50, 50, 0.5)",
    padding: 10,
  },
  alertText: {
    width: "100%",
    textAlign: "center",
    padding: 5,
  }
};

// ------ JSX ------
export const MessageLeft = ({ message, time }) => {
  return (
    <div style={{ ...styles.left, ...styles.message }}>
      <div style={styles.messageText}>{message}</div>
      <div style={styles.time}>{time}</div>
    </div>
  );
};

export const MessageRight = ({ message, time }) => {
  return (
    <div style={{ ...styles.right, ...styles.message }}>
      <div style={styles.messageText}>{message}</div>
      <div style={{ ...styles.time, ...styles.timeRgiht }}>{time}</div>
    </div>
  );
};

export const AlertMessage = ({message, time}) => {
  return (
    <div style={styles.alertWrapper}>
      <div style={styles.alertText}>{message}</div>
      <div style={styles.alertText}>{time}</div>
    </div>
  )
}
