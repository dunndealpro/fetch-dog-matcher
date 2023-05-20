import { FC } from "react";
import './SearchFilterResultsPerPage.css'
import { Form, Button } from "react-bootstrap";

interface SearchFilterResultsPerPageProps{
    resultsPerPage: number;
    setResultsPerPage: React.Dispatch<React.SetStateAction<number>>
}

const SearchFilterResultsPerPage: FC<SearchFilterResultsPerPageProps> = ({resultsPerPage, setResultsPerPage}) => {

    function handleChange(evt: { target: { value: any; }; }) {
        setResultsPerPage( evt.target.value );
        
      }

  return (
    <>      
      <Form.Label htmlFor="inputAgeMax"># of Results per Page</Form.Label>
      <Form.Control
        type="number"
        id="inputMaxAge"
        aria-describedby="ageMaxHelpBlock"
        value={resultsPerPage} // Use MaxAge as the value
        onChange={handleChange}
        min={10}
      />
      <Form.Text id="MaxAgeHelpBlock" muted>
        Enter a number
      </Form.Text>
    </>
  );
};

export default SearchFilterResultsPerPage;