// components/PostForm.tsx
import React, { useState } from 'react';

interface PostFormProps {
  onSubmit: (data: { title: string; image: string | null; content: string }) => void;
  initialData?: { title: string; image: string | null; content: string };
  buttonText: string;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData, buttonText }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, image: image || null, content });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <label htmlFor="title">Tiêu đề:</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Link ảnh:</label>
        <input
          id="image"
          type="text"
          placeholder="Image link (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Nội dung:</label>
        <textarea
          id="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        {buttonText}
      </button>

      <style jsx>{`
        .post-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 5px;
          font-weight: bold;
        }

        input,
        textarea {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-button {
          background-color: #0070f3;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </form>
  );
};

export default PostForm;
