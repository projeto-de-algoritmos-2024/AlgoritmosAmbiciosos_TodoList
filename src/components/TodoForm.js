import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [duration, setDuration] = useState(
    props.edit ? props.edit.duration : ""
  );
  const [deadline, setDeadline] = useState(
    props.edit ? new Date(props.edit.deadline) : new Date()
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
      if (/^\d*$/.test(value)) {
        setDuration(value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      duration: duration,
      deadline: deadline.toISOString().split("T")[0], // Formata a data como 'yyyy-mm-dd'
    });

    setInput("");
    setDuration("");
    setDeadline(new Date());
  };

  const handleSort = () => {
    props.onSort();
  };

  return (
    <div className="container-todo-form">
      <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit ? (
          <div className="todo-input-containerAll">
            <input
              type="text"
              placeholder="Atualize o nome da tarefa"
              value={input}
              name="text"
              className="todo-input edit"
              onChange={handleChange}
              ref={inputRef}
            />
            <div className="todo-input-containerDuration">
              <input
                type="text"
                placeholder="Atualize a duração da tarefa em horas"
                value={duration}
                name="duration"
                className="todo-input edit"
                onChange={handleChange}
              />
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                className="todo-input edit"
              />
            </div>
            <button className="todo-button edit">Adicionar</button>
          </div>
        ) : (
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
                type="text"
                placeholder="Insira a duração da tarefa em horas"
                value={duration}
                name="duration"
                className="todo-input"
                onChange={handleChange}
              />
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                className="todo-input"
              />
            </div>
            <div className="container-buttons">
              <button type="submit" className="todo-button">
                Adicionar
              </button>
              <button
                type="button"
                className="todo-button"
                onClick={handleSort}
              >
                Ordenar tarefas
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
