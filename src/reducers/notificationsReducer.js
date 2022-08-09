import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    error: false,
    message: null,
    timeoutID: null,
  },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return {
        error: false,
        message: null,
        timeoutID: null,
      };
    },
  },
});

export const { setNotification, resetNotification } =
  notificationsSlice.actions;

export function sendNotification(error, message) {
  return async (dispatch, getState) => {
    const state = getState();
    const prevTimeoutID = state.notifications.timeoutID;
    clearTimeout(prevTimeoutID);
    const timeoutID = setTimeout(() => dispatch(resetNotification()), 10000);
    dispatch(setNotification({ error, message, timeoutID }));
  };
}

export default notificationsSlice.reducer;
