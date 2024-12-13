import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all duration-300 ease-in-out"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Button variant="secondary" onClick={onClose}>
            &times;
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal

