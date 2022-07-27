import PropTypes from 'prop-types';

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

Notifications.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

Notifications.defaultProps = {
  message: null,
};

export default Notifications;
