import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import { UserContext } from "./UserContext";

export default function Profil() {
  const reservations = localStorage.getItem("reservations");

  const { id } = useContext(UserContext);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1 className="mt-5">Mon Profil</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="mt-4">{`Vos réservations, M.${id}`}</h3>
            <p>{reservations}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
