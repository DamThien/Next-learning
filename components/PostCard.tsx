import React from 'react'
import Image from 'next/image'
import Button from './Button'

interface PostCardProps {
  post: {
    id: number
    title: string
    content: string
    image: string | null
  }
  onEdit: () => void
  onDelete: () => void
}

const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 w-[300px] border border-transparent hover:border-[1px] hover:border-blue-500">
      {post.image && (
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={post.title}
            layout='fill'
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.content}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostCard

