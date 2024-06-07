import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './styles.css';
import '../../pages/themes.css'

const Header = () => (
  <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
    <Container>
      <Navbar.Brand href="/">Movie DB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link to={'/about'}>About</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
