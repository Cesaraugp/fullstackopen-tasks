const Notification = ({ props }) => {
  if (props == null) {
    return null;
  }
  const { message, isError } = props;
  console.log(message, isError);
  const classes = `notification ${!isError ? "success" : "error"}`;
  return <div className={classes}>{message}</div>;
};

export default Notification;
