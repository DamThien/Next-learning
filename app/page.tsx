// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@/components/Modal';
import PostForm from '@/components/postForm';
import Image from 'next/image';

interface Post {
  id: number;
  title: string;
  image: string | null;
  content: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    axios.get('http://localhost:4000/posts').then((response) => setPosts(response.data));
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:4000/posts/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  const openCreateModal = () => {
    setCurrentPost(null);
    setIsModalOpen(false); 
    setTimeout(() => setIsModalOpen(true), 0);
  };
  
  const openEditModal = (post: Post) => {
    setCurrentPost(post);
    setIsModalOpen(false);
    setTimeout(() => setIsModalOpen(true), 0);
  };

  const handleFormSubmit = (data: { title: string; content: string }) => {
    if (currentPost) {
      axios.put(`http://localhost:4000/posts/${currentPost.id}`, data).then((response) => {
        setPosts(posts.map((post) => (post.id === currentPost.id ? response.data : post)));
        setIsModalOpen(false);
      });
    } else {
      axios.post('http://localhost:4000/posts', data).then((response) => {
        setPosts([...posts, response.data]);
        setIsModalOpen(false);
      });
    }
  };

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <button onClick={openCreateModal}>Tạo bài viết mới</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post?.image === null ? "" : <Image src={post.image} alt={post.title} width={300} height={200} />}
          <button onClick={() => openEditModal(post)}>Chỉnh sửa</button>
          <button onClick={() => handleDelete(post.id)}>Xóa</button>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h2>
        <PostForm
          onSubmit={handleFormSubmit}
          initialData={currentPost || { title: '', content: '', image: null }}
          buttonText={currentPost ? 'Cập nhật' : 'Tạo'}
        />
      </Modal>
    </div>
  );
};

export default Home;