import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import speciesReducer from './reducers/speciesReducer';
import userPreferencesReducer from './reducers/userPreferencesReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    species: speciesReducer,
    userPreferences: userPreferencesReducer,
  },
});