import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { MdCheck } from "react-icons/md";
import '../App.css'

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    duration: "",
    deadline: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
      duration: "",
      deadline: "",
      atraso: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} className="text-todo">
        <b>{todo.text}</b> 
        <p>deadline: {todo.deadline} horas</p>
        <p>duração: {todo.duration} horas</p>
        <p>atraso: {todo.atraso} horas</p>
      </div>

      {!todo.isComplete && (
        <div className="icons">
          <MdCheck onClick={() => completeTodo(todo.id)} className="icon" />
        </div>
      )}
    </div>
  ));
};

export default Todo;
