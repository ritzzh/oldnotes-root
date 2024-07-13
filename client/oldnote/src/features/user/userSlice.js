import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    logged: false,
    username: '',
    name: '',
    email: '',
    institute: '',
    baseURL: 'http://localhost:4000', // Change to your actual baseURL
    status: null,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      const { username, name, email, institute, logged, baseURL } = action.payload;
      state.username = username;
      state.name = name;
      state.email = email;
      state.institute = institute;
      state.logged = logged;
      state.baseURL = baseURL;
    },
    logout(state) {
      state.logged = false;
      state.username = '';
      state.name = '';
      state.email = '';
      state.institute = '';
      localStorage.removeItem('profile');
      localStorage.removeItem('predetail');
    },
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
