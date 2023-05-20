import { FC } from "react";
import './SearchFilterAgeMax.css'
import { Form, Button } from "react-bootstrap";

interface SearchFilterAgeMaxProps{
    ageMax: number;
    setAgeMax: React.Dispatch<React.SetStateAction<number>>
}

const SearchFilterAgeMax: FC<SearchFilterAgeMaxProps> = ({ageMax, setAgeMax}) => {

    function handleChange(evt: { target: { value: any; }; }) {
        setAgeMax( evt.target.value );
        
      }

  return (
    <>      
      <Form.Label htmlFor="inputAgeMax">Max Age</Form.Label>
      <Form.Control
        type="number"
        id="inputMaxAge"
        aria-describedby="ageMaxHelpBlock"
        value={ageMax} // Use MaxAge as the value
        onChange={handleChange}
        min={0}
      />
      <Form.Text id="MaxAgeHelpBlock" muted>
        Enter a num {">"}= 0
      </Form.Text>
    </>
  );
};

export default SearchFilterAgeMax;