import { useState } from 'react';
import { Link, Form as RouterForm } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from "react";
import { GlobalContext } from "./App";

export default function DmartNavbar () {

  const [term, setTerm] = useState('');
  const global = useContext(GlobalContext);
  const artist = global.artistConfig?.artist || "";


  // TODO After a search is submitted the input box retains the typed-in
  // text.   This is because I'm using the action of the RouterForm to navigate
  // to search?term=xxx which doesn't give allow me to empty the field in a callback
  // handler like onSubmit.
  // Its a small problem because the input text field has an X that allows clearing quickly
  const handleSubmit = (e) => {
    console.log("hi")
    setTerm('');
  }

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  }


  return (
    <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand href="#">{artist}</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="">Home</Nav.Link>
            <Nav.Link as={Link} to="/recent">Recent Work</Nav.Link>
            <Nav.Link as={Link} to="/all">All Work</Nav.Link>
            <Nav.Link as={Link} to="/categories">By Category</Nav.Link>
          </Nav>
            <RouterForm action="/search" onSubmit={handleSubmit} className="d-flex" role="search">
            <Form.Control
              id="searchTerm"
              name="term"
              type="search"
              placeholder={term}
              onChange={handleTermChange}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" type="submit">Search</Button>
            </RouterForm>
        </Navbar.Collapse>
        </Container>
    </Navbar>
);
}
