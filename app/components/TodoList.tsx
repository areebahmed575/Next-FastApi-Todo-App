// TodoList.tsx
import React from 'react';
import Todo from './Todo';

interface TodoData {
  id: number;
  message: string;
  status: boolean;
}

interface TodoListProps {
  todos: TodoData[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, message: string) => void; // Add onUpdate prop
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onUpdate }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} id={todo.id} message={todo.message} status={todo.status} onDelete={onDelete} onUpdate={onUpdate} /> 
      ))}
    </div>
  );
};

export default TodoList;
