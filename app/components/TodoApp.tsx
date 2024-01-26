'use client'
// TodoApp.tsx
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
      const response = await axios.put(`/api/update_todo/${id}`, { message: updatedMessage });
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
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
};

export default TodoApp;
