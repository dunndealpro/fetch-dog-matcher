import { FC } from "react";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./NavBar.css";


interface NavBarProps {
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
  }

const NavBar: FC<NavBarProps> = ({setUser}) => {

   async function handleLogOut(){
       let response = await fetch(`https://frontend-take-home-service.fetch.com/auth/logout`, {method: "POST", credentials: "include",});
       console.log(response)
        setUser(false)
    }
  return (
    <>
      <Navbar className="bg-secondary">
        {/* <Container> */}
          <Navbar.Brand> Dog-Matcher</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav  className="me-auto" defaultActiveKey="/">
              <Nav.Item>
                <Nav.Link href="">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="">Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleLogOut} href="">
                  Logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
      NavBar
    </>
  );
};

export default NavBar;
