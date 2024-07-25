import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { minAtraso } from "../back";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const sortTodos = () => {
    const [sortedTodos] = minAtraso(todos);
    setTodos([...sortedTodos]); // Atualiza o estado com a lista ordenada
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="todo-app">
      <h1>Quais são os planos pra hoje?</h1>
      <TodoForm onSubmit={addTodo} onSort={sortTodos} />
      <Todo
        todos={todos.filter((todo) => !todo.isComplete)}
      />
      <button onClick={toggleShowCompleted} className="show-button">
        {showCompleted
          ? "Esconder tarefas completas"
          : "Mostrar tarefas completas"}
        {showCompleted ? (
          <MdKeyboardArrowUp className="arrow-icon" />
        ) : (
          <MdKeyboardArrowDown className="arrow-icon" />
        )}
      </button>
      {showCompleted && (
        <div className="completed-todos">
          <Todo
            todos={todos.filter((todo) => todo.isComplete)}
            className="completed-todo"
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;
