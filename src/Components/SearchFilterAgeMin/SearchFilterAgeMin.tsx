import React, { FC } from "react";
import "./SearchFilterAgeMin.css";
import { Col, Form, Button } from "react-bootstrap";

interface SearchFilterAgeMinProps {
  ageMin: number;
  setAgeMin: React.Dispatch<React.SetStateAction<number>>;
}

const SearchFilterAgeMin: FC<SearchFilterAgeMinProps> = ({
  ageMin,
  setAgeMin,
}) => {
  function handleChange(evt: { target: { value: any } }) {
    setAgeMin(evt.target.value);
  }

  return (
    <>
    <Col className="mt-2">
      <Form.Label htmlFor="inputAgeMin">Min Age</Form.Label>
      {/* <Form.Text id="minAgeHelpBlock" muted >
        Enter a num {">"}= 0
      </Form.Text> */}
    </Col>
    <Col className="mt-2">
      <Form.Control
        type="number"
        id="inputMinAge"
        aria-describedby="ageMinHelpBlock"
        value={ageMin}
        onChange={handleChange}
        
        min={0}
      />    
    </Col>
    </>
  );
};

export default SearchFilterAgeMin;
