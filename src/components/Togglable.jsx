import { useState, forwardRef, useImperativeHandle } from 'react';

function Togglable({ children, buttonLabel }, refs) {
  const [visibility, setVisibility] = useState(false);

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  function toggleVisibility() {
    setVisibility(!visibility);
  }

  if (visibility) {
    return (
      <div>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={toggleVisibility}>{buttonLabel}</button>
    </div>
  );
}

export default forwardRef(Togglable);
