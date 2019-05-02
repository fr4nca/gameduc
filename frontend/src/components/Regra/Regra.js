import React from "react";

const Regra = ({ regra }) => {
  return (
    <>
      <td>{regra.descricao}</td>
      <td>{regra.classificacao}</td>
      <td>{regra.tag}</td>
      <td>{regra.pontuacao}</td>
    </>
  );
};

export default Regra;
