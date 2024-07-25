import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdCheck } from "react-icons/md";

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
      <div key={todo.id}>
        <b>{index + 1}</b> {todo.text} - {todo.duration} horas - {todo.deadline}{" "}
        - {todo.atraso}
      </div>

      {!todo.isComplete && (
        <div className="icons">
          <MdCheck onClick={() => completeTodo(todo.id)} className="icon" />
          <MdEdit
            onClick={() =>
              setEdit({
                id: todo.id,
                value: todo.text,
                duration: todo.duration,
                deadline: todo.deadline,
                atraso: todo.atraso,
              })
            }
            className="icon"
          />
          <MdDelete onClick={() => removeTodo(todo.id)} className="icon" />
        </div>
      )}
    </div>
  ));
};

export default Todo;
