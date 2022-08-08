import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';
import blogsService from '../services/blogs';

export const usersSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

export function initUser() {
  return async (dispatch) => {
    const loggedinUser = window.localStorage.getItem('bloglistAppLoggedinUser');
    if (loggedinUser) {
      const userObj = JSON.parse(loggedinUser);
      blogsService.setToken(userObj.token);
      dispatch(setUser(userObj));
    }
  };
}

export function loginUser(username, password) {
  return async (dispatch) => {
    const userObj = await loginService.login({ username, password });
    window.localStorage.setItem(
      'bloglistAppLoggedinUser',
      JSON.stringify(userObj)
    );
    blogsService.setToken(userObj.token);
    dispatch(setUser(userObj));
  };
}

export function logoutUser() {
  return async (dispatch) => {
    window.localStorage.removeItem('bloglistAppLoggedinUser');
    blogsService.setToken(null);
    dispatch(setUser(null));
  };
}

export default usersSlice.reducer;
