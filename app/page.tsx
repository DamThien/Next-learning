'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from '@/components/Modal'
import PostForm from '@/components/PostForm'
import PostCard from '@/components/PostCard'
import Button from '@/components/Button'

interface Post {
  id: number
  title: string
  image: string | null
  content: string
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState<Post | null>(null)

  useEffect(() => {
    axios.get('http://localhost:4000/posts').then((response) => setPosts(response.data))
  }, [])

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:4000/posts/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id))
    })
  }

  const openCreateModal = () => {
    setCurrentPost(null)
    setIsModalOpen(true)
  }

  const openEditModal = (post: Post) => {
    setCurrentPost(post)
    setIsModalOpen(true)
  }

  const handleFormSubmit = (data: { title: string; content: string; image: string | null }) => {
    if (currentPost) {
      axios.put(`http://localhost:4000/posts/${currentPost.id}`, data).then((response) => {
        setPosts(posts.map((post) => (post.id === currentPost.id ? response.data : post)))
        setIsModalOpen(false)
      })
    } else {
      axios.post('http://localhost:4000/posts', data).then((response) => {
        setPosts([...posts, response.data])
        setIsModalOpen(false)
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={openCreateModal}>Create New Post</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={() => openEditModal(post)}
            onDelete={() => handleDelete(post.id)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPost ? 'Edit Post' : 'Create New Post'}
      >
        <PostForm
          onSubmit={handleFormSubmit}
          initialData={currentPost || { title: '', content: '', image: null }}
          buttonText={currentPost ? 'Update' : 'Create'}
        />
      </Modal>
    </div>
  )
}

export default Home

