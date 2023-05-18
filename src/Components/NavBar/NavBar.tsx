import { FC } from "react";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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

  let title = "Welcome " + Cookies.get("hasCookies") + "!";

  return (
    <>
      <Navbar sticky="top" className="bg-secondary">
        <Navbar.Brand className="ms-2"> Dog-Matcher</Navbar.Brand>
        <Nav className="ms-auto me-5" defaultActiveKey="/">
          <NavDropdown
            
            title={title}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item className="" onClick={handleLogOut} href="">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
