import { FC } from "react";
import "./Footer.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

const Footer: FC = () => {
  return (
    <>
      <div className="">
        <Navbar
          className="bg-secondary p-1 nav-bg justify-content-center"
          id="footer"
        >
          <Nav variant="" className="">
            <a
              className="d-md-none ms-2 me-2"
              style={{ color: "rgba(0,0,0,1" }}
              href="https://www.linkedin.com/in/dunnevan/"
              target="blank"
            >
              <BsLinkedin size={25} className="" />
            </a>
            <a
              className="d-md-none ms-2 me-2"
              style={{ color: "rgba(0,0,0,1" }}
              href="https://github.com/dunndealpro"
              target="blank"
            >
              <BsGithub size={25} className="" />
            </a>
            <a
              className="d-md-none ms-2 me-2"
              style={{ color: "rgba(0,0,0,1" }}
              href="mailto:dunn.evan.f@gmail.com?subject=I would love to connect!&body=Great website and portfolio, let's chat!"
              target="blank"
            >
              <MdOutlineEmail size={25} className="" />
            </a>
            <a
              style={{ color: "inherit" }}
              className="m-1 d-none d-md-inline fs-6"
              href="https://www.linkedin.com/in/dunnevan/"
              target="blank"
            >
              LinkedIn
            </a>
            <a
              style={{ color: "inherit" }}
              className="m-1 d-none d-md-inline fs-6"
              href="https://github.com/dunndealpro/fetch-dog-matcher"
              target="blank"
            >
              GitHub
            </a>
            <a
              style={{ color: "inherit" }}
              className="m-1 d-none d-md-inline fs-6"
              href="mailto:dunn.evan.f@gmail.com?subject=Cool App!&body=Cool app, let's chat!"
              target="blank"
            >
              Contact
            </a>           
          </Nav>          
        </Navbar>
      </div>
    </>
  );
};

export default Footer;
