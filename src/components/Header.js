import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importez le CSS de Bootstrap
import SearchInput from "./SearchInput";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { id } = useContext(UserContext);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/profil");
  }
  function handleClick2() {
    navigate("/");
  }
  const linkStyle = {
    fontSize: "25px",
  };
  const name = localStorage.getItem("login");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <img src="Logo.png" className="logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto mx-auto">
              {" "}
              <li className="nav-item mx-3">
                {" "}
                <a
                  onClick={handleClick2}
                  className="nav-link"
                  href="#"
                  style={linkStyle}
                >
                  Accueil
                </a>
              </li>
              <li className="nav-item mx-3">
                {" "}
                <a className="nav-link" href="#" style={linkStyle}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="ml-auto mr-3">
            <SearchInput />
          </div>
          <div id="welcome">
            <h3 id="bienvenue">{`Bienvenue M.${id}`}</h3>
            <img onClick={handleClick} src="avatar.jpg" id="avatar" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
