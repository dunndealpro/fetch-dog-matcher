import { FC, useState } from "react";
import Cookies from "js-cookie";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./LogInForm.css";

interface LogInFormProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogInForm: FC<LogInFormProps> = (props) => {
  const expirationHours = 1;
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + expirationHours * 60 * 60 * 1000
  );  

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
  });

  const [error, setError] = useState("");

  function handleChange(evt: { target: { name: any; value: any } }) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  const loginURL = process.env.REACT_APP_API_URL+`/auth/login`;

  async function handleSubmit(evt: { preventDefault: () => void }) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      console.log(credentials);
      const response = await fetch(loginURL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.status === 200) {
        console.log(response.status)
        Cookies.set("hasCookies", `${credentials.name}`, { expires: expirationDate });
        props.setUser(true);
      }
    } catch {
      console.log("user");
      setError("Log In Failed - Try Again");
      console.log(error);
    }
  }

  return (
    <>
      
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="name"
            placeholder="Enter your name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button className="m-2 login-btn" type="submit">
          Login
        </Button>
        <p className="error-message">&nbsp;{error}</p>
      </Form>
    </>
  );
};

export default LogInForm;
