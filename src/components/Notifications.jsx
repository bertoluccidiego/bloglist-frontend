function Notifications({ error, message }) {
  const notificationStyle = {
    color: error ? 'red' : 'green',
    backgroundColor: 'lightgrey',
    border: 'solid 1px black',
    borderRadius: 5,
    padding: 5,
    fontSize: 20,
  };

  if (message) {
    return <div style={notificationStyle}>{message}</div>;
  }

  return null;
}

export default Notifications;
