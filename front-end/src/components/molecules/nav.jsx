"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { motion } from 'framer-motion';
import "../../styles/NavbarStyle.css";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../../public/logo.png";
import { FaSearch } from "react-icons/fa";
import HomeIcon from "@/components/molecules/icons/HomeIcon";
import AproposIcon from "@/components/molecules/icons/AproposIcon";
import ServiceIcon from "@/components/molecules/icons/ServiceIcon";
import ConnexionIcon from "@/components/molecules/icons/ConnexionIcon";

function Navb() {

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar-dark navbar-blur fixed-top space-between "
    >
      <Container>
        <Link href="/">
        <motion.div whileHover={{ scale: 1.1 }} className="mr-10" >
          <Image
            src={Logo}
            alt="Logo"
            width="100"
            height="50"
            className="cursor-pointer rounded-circle "
            priority
          />
          </motion.div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <motion.div className="button-container" whileHover={{ scale: 1.1}}>
              <HomeIcon />
              <Nav.Link href="/">Accueil</Nav.Link>
            </motion.div>

            <motion.div className="button-container" whileHover={{ scale: 1.1}} >
              <ServiceIcon />
              <Nav.Link href="/services" className="label-container">
                {" "}
                Services{" "}
              </Nav.Link>
            </motion.div>

            <motion.div className="button-container" whileHover={{ scale: 1.1}}>
              <AproposIcon />
              <Nav.Link href="/Apropos" className="label-container">
                A Propos{" "}
              </Nav.Link>
            </motion.div>
          </Nav>
          <Form className="d-flex">
          <InputGroup>
                <InputGroup.Text id="basic-addon1">
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Button variant="outline-success"><FaSearch /></Button>
            </Form>
          <Nav className="ms-auto align-items-center">
            <motion.div className="button-container d-flex align-items-center" whileHover={{ scale: 1.1}}>
              <ConnexionIcon />
              <Nav.Link href="/Connexion" className="label-container flex">
                Login
              </Nav.Link>
            </motion.div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
