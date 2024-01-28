'use client'

import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (message: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onAdd(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        placeholder="Add Todo..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="px-2 py-1 border border-gray-300 w-96  rounded-lg"
      />
      <button type="submit" className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
