// hooks/usePosts.js
import { useState } from 'react';

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  return { posts, addPost };
};

export default usePosts;
