// app/create/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import PostForm from '@/components/postForm';

const CreatePost = () => {
  const router = useRouter();

  const handleCreate = (data: { title: string; content: string }) => {
    axios.post('http://localhost:4000/posts', data).then(() => {
      router.push('/');
    });
  };

  return (
    <div>
      <h1>Tạo bài viết mới</h1>
      <PostForm onSubmit={handleCreate} buttonText="Tạo" />
    </div>
  );
};

export default CreatePost;
