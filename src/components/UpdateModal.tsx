import React, { useState } from 'react';

interface UpdateModalProps {
  onClose: () => void;
  onUpdate: (title: string) => void;
  initialTitle: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ onClose, onUpdate, initialTitle }) => {
  const [title, setTitle] = useState(initialTitle);
  return (
    <div className="fixed inset-0 z-50 backdrop-blur bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Todo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-color"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-lg bg-primary-color text-white hover:bg-primary-color-hover"
          >
            Cancel
          </button>
          <button
            onClick={() => { onUpdate(title); onClose(); }}
            className="cursor-pointer px-4 py-2 rounded-lg bg-primary-color-hover text-white hover:bg-primary-color"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
