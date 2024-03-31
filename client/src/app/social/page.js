// components/PostsPage.js
"use client";
import React, { useState } from 'react';
import usePosts from './usePosts';
import Post from './Post';
import { Button, Modal } from 'antd';

const PostsPage = () => {
  const { posts, addPost } = usePosts();
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [hashtags, setHashtags] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageBase64 = '';
    if (imageFile) {
      imageBase64 = await toBase64(imageFile);
    }
    const newPost = {
      text,
      image: imageBase64,
      hashtags: hashtags.split(' ').filter(h => h.startsWith('#')),
    };
    addPost(newPost);
    setText('');
    setImageFile(null);
    setHashtags('');
    handleCancel();
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="py-8">
      <Button type="primary" onClick={showModal}>
        Create Post
      </Button>
      <Modal title="CREATE POST" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <form onSubmit={handleSubmit}>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="shadow border rounded w-full py-2 px-3 mt-4"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
            type="text"
            placeholder="Hashtags"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          /> */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
            Post
          </button>
        </form>
      </Modal>
        
        <div>
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;

