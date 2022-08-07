import { createSlice } from '@reduxjs/toolkit';

import blogsService from '../services/blogs';

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      const newBlogObj = action.payload;
      state.push(newBlogObj);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    changeBlog(state, action) {
      const { editedBlog, id } = action.payload;
      return state.map((blog) => (blog.id === id ? editedBlog : blog));
    },
  },
});

export const { setBlogs, appendBlog, removeBlog, changeBlog } =
  blogsSlice.actions;

export function initializeBlogs() {
  return async (dispatch) => {
    const initBlogs = await blogsService.getAll();
    dispatch(setBlogs(initBlogs));
  };
}

export function createBlog(newBlogObj) {
  return async (dispatch) => {
    const savedBlog = await blogsService.create(newBlogObj);
    dispatch(appendBlog(savedBlog));
  };
}

export function deleteBlog(id) {
  return async (dispatch) => {
    await blogsService.remove(id);
    dispatch(removeBlog(id));
  };
}

export function updateBlog(editedBlog, id) {
  return async (dispatch) => {
    const savedBlog = await blogsService.update(editedBlog, id);
    dispatch(changeBlog({ editedBlog: savedBlog, id }));
  };
}

export default blogsSlice.reducer;
