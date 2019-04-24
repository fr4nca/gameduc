import React from "react";

const Regra = ({ regra }) => {
  return (
    <>
      <td>{regra.id}</td>
      <td>{regra.classificacao}</td>
      <td>{regra.tag}</td>
      <td>{regra.pontuacao}</td>
    </>
  );
};

export default Regra;
