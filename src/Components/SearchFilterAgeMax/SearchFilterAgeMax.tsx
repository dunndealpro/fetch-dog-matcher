import { FC } from "react";
import './SearchFilterAgeMax.css'
import { Col, Form, Button } from "react-bootstrap";

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
    <Col xs={6} sm={6} md={2} lg={2}  xl={1} xxl={1} className="mt-2">
      <Form.Label htmlFor="inputAgeMax">Max Age</Form.Label>
      
      {/* <Form.Text id="MaxAgeHelpBlock" muted>
        Enter a num {">"}= 0
      </Form.Text> */}
    </Col>  
    <Col xs={6} sm={6} md={4} lg={4}  xl={1} xxl={1}className="mt-2">
      <Form.Control
      className="text-align-center"
        type="number"
        id="inputMaxAge"
        aria-describedby="ageMaxHelpBlock"
        value={ageMax} // Use MaxAge as the value
        onChange={handleChange}
        min={0}
        
      />
    </Col>
    </>
  );
};

export default SearchFilterAgeMax;