import { configureStore } from '@reduxjs/toolkit';

import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    user: usersReducer,
  },
});
