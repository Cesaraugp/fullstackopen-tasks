import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.messages;

  const [notif] = notification.filter((el) => el.active);
  let message;
  if (notif) message = notif.message;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <>{message ? <div style={style}>{message}</div> : <></>}</>;
};

const mapToStateProps = (state) => {
  return {
    messages: state.messages,
  };
};
export default connect(mapToStateProps, null)(Notification);
