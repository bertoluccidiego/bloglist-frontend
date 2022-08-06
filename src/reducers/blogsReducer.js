import { createSlice } from '@reduxjs/toolkit';

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      const newBlogObj = action.payload;
      state.push(newBlogObj);
    },
  },
});

export const { setBlogs, createBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
