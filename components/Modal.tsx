// components/Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="bg-white p-5 rounded-lg w-100 relative">
            <div className="absolute inset-0 w-50 flex justify-center items-center" onClick={onClose}>
                <div className="bg-white p-5 rounded-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
                    <button className="absolute top-2.5 right-2.5 text-2xl bg-none border-none cursor-pointer" onClick={onClose}>
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
