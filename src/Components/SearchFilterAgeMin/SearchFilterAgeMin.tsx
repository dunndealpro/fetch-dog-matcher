import React, { FC } from "react";
import "./SearchFilterAgeMin.css";
import { Form, Button } from "react-bootstrap";

interface SearchFilterAgeMinProps{
    ageMin: number;
    setAgeMin: React.Dispatch<React.SetStateAction<number>>
}

const SearchFilterAgeMin: FC<SearchFilterAgeMinProps> = ({ageMin, setAgeMin}) => {

    function handleChange(evt: { target: { value: any; }; }) {
        setAgeMin( evt.target.value );
        
      }

  return (
    <>      
      <Form.Control
        type="number"
        id="inputMinAge"
        aria-describedby="ageMinHelpBlock"
        value={ageMin} // Use minAge as the value
        onChange={handleChange}
        min={0}
      />
      <Form.Label htmlFor="inputAgeMin">Min Age</Form.Label>
      <br />
      <Form.Text id="minAgeHelpBlock" muted>
        Enter a num {">"}= 0
      </Form.Text>
    </>
  );
};

export default SearchFilterAgeMin;
