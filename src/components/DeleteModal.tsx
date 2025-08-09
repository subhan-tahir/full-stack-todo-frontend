import React from 'react';

interface UpdateModalProps {
  onClose: () => void;
  onDelete: (title: string) => void;
  loading: boolean

}

const DeleteModal: React.FC<UpdateModalProps> = ({ onClose,onDelete,loading }) => {

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

      

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-lg bg-primary-color text-white hover:bg-primary-color-hover"
          >
            Cancel
          </button>
          <button
            onClick={() => {onDelete(''), onClose(); }}
            className="cursor-pointer px-4 py-2 rounded-lg bg-primary-color-hover text-white hover:bg-primary-color"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
