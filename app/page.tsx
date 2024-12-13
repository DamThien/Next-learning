// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: number;
  title: string;
  image: string|null;
  content: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4000/posts').then((response) => setPosts(response.data));
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:4000/posts/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <Link href="/create">Tạo bài viết mới</Link>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post?.image === null ? "" : <Image src={post.image} alt={post.title} width={300} height={200} />}
          <Link href={`/edit/${post.id}`}>Chỉnh sửa</Link>
          <button onClick={() => handleDelete(post.id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
