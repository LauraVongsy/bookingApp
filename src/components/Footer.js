import React from "react";

function Footer() {
  const footerStyle = {
    height: "200px", // Hauteur du footer
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  return (
    <footer className="bg-dark p-5 text-light relative" style={footerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Informations de contact</h5>
            <p>Email : contact@example.com</p>
            <p>Téléphone : +336123456789</p>
          </div>
          <div className="col-md-6">
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Accueil</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Reseaux Sociaux</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <img
        src="Logo.png"
        className="logo"
        style={{ marginTop: "10px", marginLeft: "50px" }}
        alt="Logo"
      />
    </footer>
  );
}

export default Footer;
