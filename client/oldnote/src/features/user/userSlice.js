import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    logged: false,
    username: '',
    name: '',
    email: '',
    institute: '',
    baseURL: 'http://localhost:4000', // Change to your actual baseURL
    status: null,
    error: null,
  }
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    Object.assign(initialState, JSON.parse(savedUser));
  }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { username, name, email, institute, logged, baseURL } = action.payload;
      state.username = username;
      state.name = name;
      state.email = email;
      state.institute = institute;
      state.logged = logged;
      state.baseURL = baseURL;
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout(state) {
      state.logged = false;
      state.username = '';
      state.name = '';
      state.email = '';
      state.institute = '';
      localStorage.removeItem('user');
    },
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
