import React from "react";

const Tarefa = ({ tarefa }) => {
  return (
    <>
      <tr>
        <td>{tarefa.id}</td>
        <td>{tarefa.classificacao}</td>
        <td>{tarefa.tag}</td>
        <td>X</td>
      </tr>
    </>
  );
};

export default Tarefa;
