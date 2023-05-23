import { FC, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import LogInForm from "../../Components/LogInForm/LogInForm";
import './AuthPage.css'

interface AuthPageProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthPage: FC<AuthPageProps> = ({ setUser }) => {
  

  return (
    <>
    <div className='d-flex justify-content-center align-items-center vh-100'>
      {/* <Container className="bg-white text-center rounded"> */}
        
        <Row  className="m-2 justify-content-center align-items-center">
          <Col sm={8} className="m-2 rounded log-in">
            <div className="m-2 p-1" ><h2>Welcome to Fetch's Dog-Matcher!</h2>
            <h4>Please enter your name and email to continue</h4>
            </div>
            <LogInForm setUser={setUser} />
          </Col>
        </Row>
      {/* </Container> */}

    </div>
    </>
  );
};

export default AuthPage;