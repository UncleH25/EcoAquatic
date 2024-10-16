import { createSlice } from '@reduxjs/toolkit';

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: {
    theme: 'light',
    notifications: true,
    savedSpecies: [],
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    addSavedSpecies: (state, action) => {
      state.savedSpecies.push(action.payload);
    },
    removeSavedSpecies: (state, action) => {
      state.savedSpecies = state.savedSpecies.filter(id => id !== action.payload);
    },
  },
});

export const { setTheme, toggleNotifications, addSavedSpecies, removeSavedSpecies } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;