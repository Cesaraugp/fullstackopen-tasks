import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.messages);
  const [notif] = notification.filter((el) => el.active);
  console.log(notif);
  let message;
  if (notif) message = notif.message;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <>{message ? <div style={style}>{message}</div> : <></>}</>;
};

export default Notification;
