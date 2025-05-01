import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  return (
    <Navbar expand="lg">
      <Container className="head-text">
        <Navbar.Brand href="https://www.nvronlifescience.com/">
          Nvron Life Science
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="https://www.nvronlifescience.com/">Home</Nav.Link>
            <NavDropdown title="Register" id="register-dropdown" >
              <NavDropdown.Item href="/patientRegister">
                Patient Sign Up
              </NavDropdown.Item>
              <NavDropdown.Item href="/doctorRegister">
                Doctor Sign Up
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Appointment" id="register-dropdown" >
              <NavDropdown.Item href="/PatientLogin">
                Patient Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/DoctorLogin">
                Doctor Login
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="/">About us</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
