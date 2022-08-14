import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Users from './components/Users';
import User from './components/User';
import FullBlog from './components/FullBlog';
import Layout from './components/Layout';

import { initUser } from './reducers/usersReducer';
import { initializeBlogs } from './reducers/blogsReducer';

function App() {
  const dispatch = useDispatch();
  function userSelector(state) {
    return state.user;
  }
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(initUser());
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Blogs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:blogId" element={<FullBlog />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<User />} />
          <Route
            path="/login"
            element={user ? <p>{`${user.name} logged-in`} </p> : <LoginForm />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
