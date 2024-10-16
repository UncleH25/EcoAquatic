import { createSlice } from '@reduxjs/toolkit';

const speciesSlice = createSlice({
  name: 'species',
  initialState: {
    speciesList: [],
    selectedSpecies: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSpeciesList: (state, action) => {
      state.speciesList = action.payload;
    },
    setSelectedSpecies: (state, action) => {
      state.selectedSpecies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSpeciesList, setSelectedSpecies, setLoading, setError } = speciesSlice.actions;
export default speciesSlice.reducer;