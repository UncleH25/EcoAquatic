// src/components/TestComponent.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../reducers/authReducer';

const TestComponent = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>EcoAquatic Test Component</h1>
      <p>Authentication Status: {auth.isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
      <button onClick={() => dispatch(login({ id: 1, name: 'Test User' }))}>Login</button>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default TestComponent;