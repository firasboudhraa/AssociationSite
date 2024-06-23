"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import "../../styles/NavbarStyle.css"
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../../../public/assets/images/logo.png"
import HomeIcon from "@/components/molecules/icons/HomeIcon"
import AproposIcon from "@/components/molecules/icons/AproposIcon"
import ServiceIcon from "@/components/molecules/icons/ServiceIcon"
import ConnexionIcon from "@/components/molecules/icons/ConnexionIcon"

function Navb() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-dark navbar-blur fixed-top space-between">
      <Container>
      <Navbar.Brand href="#home">
      <img
            src={Logo} 
            height="100"
            width="100"
            className="d-inline-block align-top rounded-circle" 
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <div className='button-container'>
              <HomeIcon/>
              <Nav.Link href="/home">Accueil</Nav.Link>
            </div>
           
            <div className='button-container'> 
              <ServiceIcon/>
              <Nav.Link href="/services" className="label-container" > services </Nav.Link>
            </div>

            <div className='button-container'> 
              <AproposIcon/>
              <Nav.Link href="/Apropos" className="label-container" >A Propos </Nav.Link>
            </div>
            
          </Nav>
          <Nav className="ms-auto align-items-center">
            <div className="button-container d-flex align-items-center">
              <ConnexionIcon/>
              <Nav.Link href="/Connexion" className='label-container flex'>
                Login
              </Nav.Link>
            </div>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;