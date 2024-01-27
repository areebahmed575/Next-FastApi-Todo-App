import React, { useState } from 'react';

interface TodoProps {
  id: number;
  message: string;
  status: boolean;
  onDelete: (id: number) => void;
  onUpdate: (id: number, message: string) => void;
}

const Todo: React.FC<TodoProps> = ({ id, message, status, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(message);

  const handleUpdate = () => {
    onUpdate(id, editMessage);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-300 mt-7">
      {isEditing ? (
        <input
          type="text"
          value={editMessage}
          onChange={(e) => setEditMessage(e.target.value)}
          className="px-2 py-1 border border-gray-300"
        />
      ) : (
        <div>
          <p className={status ? 'line-through' : ''}>{message}</p>
        </div>
      )}
      <div>
        {isEditing ? (
          <button className="px-2 py-1 bg-green-500 text-white rounded mr-2" onClick={handleUpdate}>
            Save
          </button>
        ) : (
          <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
