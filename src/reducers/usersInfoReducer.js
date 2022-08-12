import { createSlice } from '@reduxjs/toolkit';

import usersService from '../services/users';

const usersInfoSlice = createSlice({
  name: 'usersInfo',
  initialState: null,
  reducers: {
    setUsersInfo(state, action) {
      return action.payload;
    },
  },
});

export const { setUsersInfo } = usersInfoSlice.actions;

export function getUsersInfo() {
  return async (dispatch) => {
    const info = await usersService.getAll();
    dispatch(setUsersInfo(info));
  };
}

export default usersInfoSlice.reducer;
