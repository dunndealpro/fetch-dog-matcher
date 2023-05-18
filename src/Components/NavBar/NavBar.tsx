import { FC } from "react";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./NavBar.css";

interface NavBarProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: FC<NavBarProps> = ({ setUser }) => {
  async function handleLogOut() {
    let response = await fetch(
      `https://frontend-take-home-service.fetch.com/auth/logout`,
      { method: "POST", credentials: "include" }
    );
    console.log(response);
    Cookies.remove("hasCookies");
    setUser(false);
  }
  return (
    <>
      <Navbar sticky="top" className="bg-secondary">
        {/* <Container> */}
        <Navbar.Brand className="ms-2"> Dog-Matcher</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link href="">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="">Projects</Nav.Link>
            </Nav.Item>
            <Nav.Item className="justify-content-end">
              <Nav.Link onClick={handleLogOut} href="">
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  );
};

export default NavBar;
