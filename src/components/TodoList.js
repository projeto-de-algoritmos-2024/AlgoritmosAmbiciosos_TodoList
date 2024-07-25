import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
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

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
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
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <button onClick={toggleShowCompleted} className="show-button">
        {showCompleted
          ? "Mostrar tarefas completas"
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
            completeTodo={() => {}} // Não faz nada, pois não queremos alterar tarefas completas
            removeTodo={() => {}} // Não faz nada, pois não queremos remover tarefas completas
            updateTodo={() => {}} // Não faz nada, pois não queremos editar tarefas completas
            className="completed-todo"
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;
