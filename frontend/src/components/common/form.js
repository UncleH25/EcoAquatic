import React from 'react';

const Form = ({ children, onSubmit }) => {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;