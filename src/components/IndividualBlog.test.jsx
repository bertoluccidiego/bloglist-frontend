import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IndividualBlog from './IndividualBlog';

beforeEach(() => {
  const testSetNotification = jest.fn();
  const testSetBlogs = jest.fn();
  const testBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 10,
    user: {
      username: 'test username',
      name: 'test name',
      id: 'test id',
    },
  };
  const testBlogs = [testBlog];
  render(
    <IndividualBlog
      blog={testBlog}
      blogs={testBlogs}
      setNotification={testSetNotification}
      setBlogs={testSetBlogs}
    />
  );
});

test('<IndividualBlog /> renders the title and author, not its url or number of likes by default', () => {
  screen.getByText('test title test author');
});

test('<IndividualBlog /> renders the url and number of likes when the view button is clicked', async () => {
  const user = userEvent.setup();

  const button = screen.getByText('view');
  await user.click(button);
  screen.getByText('test url', { exact: false });
  screen.getByText('10', { exact: false });
});
