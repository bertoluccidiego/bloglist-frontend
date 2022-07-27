import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

function Togglable({ children, buttonLabel }, refs) {
  const [visibility, setVisibility] = useState(false);

  function toggleVisibility() {
    setVisibility(!visibility);
  }

  useImperativeHandle(refs, () => ({ toggleVisibility }));

  if (visibility) {
    return (
      <div>
        {children}
        <button type="button" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={toggleVisibility}>
        {buttonLabel}
      </button>
    </div>
  );
}

Togglable.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default forwardRef(Togglable);
