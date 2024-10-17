import React from 'react';

const Checkbox = ({ id, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className='remember-label'>Remember Me</label>
      <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
    </div>
  );
};

export default Checkbox;