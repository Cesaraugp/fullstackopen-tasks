import React from "react";

const Notification = ({ message }) => {
  console.log("message");
  if (message === null) {
    return null;
  } else if (!message.includes("error")) {
    return <div className="message">{message}</div>;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
