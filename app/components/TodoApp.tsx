'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

interface TodoData {
  id: number;
  message: string;
  status: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (message: string) => {
    try {
      const response = await axios.post('/api/addTodo', { message, status: false });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`/api/delete_todo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id: number, updatedMessage: string) => {
    try {
      const response = await axios.put(`/api/update_todo/${id}`, { message: updatedMessage, status: false});
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, message: updatedMessage };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex justify-center items-center">
    <div className="max-w-lg mx-auto p-4 bg-slate-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-7 text-center">📝 Todo App</h1>
      <div className="mb-4">
        <TodoForm onAdd={addTodo} />
      </div>
      <div>
        <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
      </div>
    </div>
  </div>
  
  );
};

export default TodoApp;
