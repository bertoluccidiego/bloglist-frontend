import { configureStore } from '@reduxjs/toolkit';

import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';
import notificationsReducer from './reducers/notificationsReducer';
import usersInfoReducer from './reducers/usersInfoReducer';

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    user: usersReducer,
    notifications: notificationsReducer,
    usersInfo: usersInfoReducer,
  },
});
