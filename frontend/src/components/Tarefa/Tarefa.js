import React from "react";

const Tarefa = ({ tarefa }) => {
  return (
    <>
      <td>{tarefa.descricao}</td>
      <td>{tarefa.classificacao}</td>
      <td>{tarefa.tag}</td>
    </>
  );
};

export default Tarefa;
