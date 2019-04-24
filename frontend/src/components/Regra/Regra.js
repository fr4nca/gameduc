import React from "react";

const Regra = ({ regra }) => {
  return (
    <>
      <tr>
        <td>{regra.id}</td>
        <td>{regra.classificacao}</td>
        <td>{regra.tag}</td>
        <td>{regra.pontuacao}</td>
      </tr>
    </>
  );
};

export default Regra;
