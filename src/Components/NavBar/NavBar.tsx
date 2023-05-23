import { FC } from "react";
import Cookies from "js-cookie";
// import { Image } from "react-bootstrap";
import Image from './yogi-circle.png'

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
      process.env.REACT_APP_API_URL+`/auth/logout`,
      { method: "POST", credentials: "include" }
    );
    console.log(response);
    Cookies.remove("hasCookies");
    setUser(false);
  }

  let title = "Welcome " + Cookies.get("hasCookies") + "!";

  return (
    <>
      <Navbar sticky="top" className="navbar-col">
        
        <Navbar.Brand className="ms-2 "> <img className="me-2" src={Image}  width="60"
              height="60"
               alt="Yogi Icon"  />Dog-Matcher</Navbar.Brand>
        <Nav className="ms-auto me-2" defaultActiveKey="/">
          <NavDropdown align="end" title={title} id="basic-nav-dropdown">
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
