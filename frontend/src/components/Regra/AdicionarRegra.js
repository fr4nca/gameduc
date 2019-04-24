import React from "react";

const AdicionarRegra = ({ toggleModal }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Nova regra</p>
          <button className="delete" aria-label="close" onClick={toggleModal} />
        </header>
        <section className="modal-card-body">
          <p>OLÁ</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Adicionar</button>
          <button className="button" onClick={toggleModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AdicionarRegra;
