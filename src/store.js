import { configureStore } from '@reduxjs/toolkit';

import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';
import notificationsReducer from './reducers/notificationsReducer';

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    user: usersReducer,
    notifications: notificationsReducer,
  },
});
