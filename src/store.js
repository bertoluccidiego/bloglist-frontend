import { configureStore } from '@reduxjs/toolkit';

import blogsReducer from './reducers/blogsReducer';

export default configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});
