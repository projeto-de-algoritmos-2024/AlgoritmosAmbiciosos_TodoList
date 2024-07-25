import React, { useState, useEffect, useRef } from "react";

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [duration, setDuration] = useState(
    props.edit ? props.edit.duration : ""
  );
  const [deadline, setDeadline] = useState(
    props.edit ? props.edit.deadline : ""
  );

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "text") {
      setInput(value);
    } else if (name === "duration") {
      setDuration(value);
    } else if (name === "deadline") {
      setDeadline(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      duration: duration,
      deadline: deadline, // Armazenar o deadline como número de horas
      atraso: 0
    });
    
    setInput("");
    setDuration("");
    setDeadline("");
  };

  return (
    <div className="container-todo-form">
      <form className="todo-form" onSubmit={handleSubmit}>
          <div className="todo-input-containerAll">
            <input
              type="text"
              placeholder="Digite o nome da tarefa"
              value={input}
              name="text"
              className="todo-input"
              onChange={handleChange}
              ref={inputRef}
            />
            <div className="todo-input-containerDuration">
              <input
                type="number"
                placeholder="Insira a duração da tarefa em horas"
                value={duration}
                name="duration"
                className="todo-input"
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Insira o deadline da tarefa em horas"
                value={deadline}
                name="deadline"
                className="todo-input"
                onChange={handleChange}
              />
            </div>
            <div className="container-buttons">
              <button className="todo-button">Adicionar</button>
              <button
                type="button"
                className="todo-button"
                onClick={props.onSort}
              >
                Ordenar tarefas
              </button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default TodoForm;
