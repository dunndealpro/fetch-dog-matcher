import { FC, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import LogInForm from "../../Components/LogInForm/LogInForm";

interface AuthPageProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthPage: FC<AuthPageProps> = ({ setUser }) => {
  

  return (
    <>
      <Container className="bg-light text-center">
        AuthPage
        <Row>
          <Col>
            <LogInForm setUser={setUser} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthPage;
