import React, { FC } from "react";
import { Col, Form } from "react-bootstrap";

import "./SearchFilterAgeMin.css";

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
      <Col xs={6} sm={6} md={3} lg={3} xl={1} xxl={1} className="mt-2">
        <Form.Label htmlFor="inputAgeMin">Min Age</Form.Label>
      </Col>
      <Col xs={6} sm={6} md={3} lg={3} xl={1} xxl={1} className="mt-2">
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
