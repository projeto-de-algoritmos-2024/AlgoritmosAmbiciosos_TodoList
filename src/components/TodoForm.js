import React, { useState, useEffect, useRef } from "react";

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.valye : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  // Ao digitar seta o input para o que for digitado (e.taget.value)
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Ao clicar no botão:
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <div className="container-todo-form">
      <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit ? (
          <>
            <input
              type="text"
              placeholder="Atualize a tarefa"
              value={input}
              name="text"
              className="todo-input edit"
              onChange={handleChange}
              ref={inputRef}
            />
            <button className="todo-button edit">Atualize</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Digite uma Tarefa"
              value={input}
              name="text"
              className="todo-input"
              onChange={handleChange}
              ref={inputRef}
            />
            <button className="todo-button"> Adicionar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
