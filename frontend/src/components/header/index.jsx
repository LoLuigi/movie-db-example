import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './styles.css';

const Header = () => (
  <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
    <Container>
      <Navbar.Brand>Movie DB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link to={'/'}>Movies</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={'/profile'}>Profile</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
