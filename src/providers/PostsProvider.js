import { createContext } from 'react';

import { useProvideposts } from '../hooks';

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const posts = useProvideposts();

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
