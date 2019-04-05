import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="footer has-background-black has-text-white">
        <div className="content has-text-centered">
          <p>
            The código fonte é licensiado por
            <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. O
            conteúdo deste site é licensiado por{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC by NC SA 4.0
            </a>
            .
          </p>
          <p>2019</p>
        </div>
      </footer>
    </div>
  );
}
