import React, { useState } from 'react'
import Button from './Button'

interface PostFormProps {
  onSubmit: (data: { title: string; content: string; image: string | null }) => void
  initialData: { title: string; content: string; image: string | null }
  buttonText: string
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData, buttonText }) => {
  const [title, setTitle] = useState(initialData.title)
  const [content, setContent] = useState(initialData.content)
  const [image, setImage] = useState<string | null>(initialData.image)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, content, image })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          rows={4}
          required
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          value={image || ''}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default PostForm

