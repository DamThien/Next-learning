// app/edit/[id]/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '@/components/postForm';

const EditPost = () => {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/posts/${id}`).then((response) => {
        setPost(response.data);
      });
    }
  }, [id]);

  const handleUpdate = (data: { title: string; content: string }) => {
    axios.put(`http://localhost:4000/posts/${id}`, data).then(() => {
      router.push('/');
    });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>Chỉnh sửa bài viết</h1>
      <PostForm onSubmit={handleUpdate} initialData={post} buttonText="Cập nhật" />
    </div>
  );
};

export default EditPost;
