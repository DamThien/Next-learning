// components/PostForm.tsx
import React, { useState } from 'react';

interface PostFormProps {
  onSubmit: (data: { title: string; image: string|null; content: string }) => void;
  initialData?: { title: string; image: string|null; content: string };
  buttonText: string;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData, buttonText }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, image, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image link"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default PostForm;
