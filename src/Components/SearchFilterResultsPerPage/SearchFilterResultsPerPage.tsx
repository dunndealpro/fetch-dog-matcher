import { FC } from "react";
import './SearchFilterResultsPerPage.css'
import { Form, Button } from "react-bootstrap";

// interface ResultPerPage{
//   resultsPerPage: number;  
// }

interface SearchFilterResultsPerPageProps{
    resultsPerPage:number;
    setResultsPerPage: React.Dispatch<React.SetStateAction<number>>
}

const SearchFilterResultsPerPage: FC<SearchFilterResultsPerPageProps> = ({resultsPerPage, setResultsPerPage}) => {

    function handleChange(evt: { target: { value: any; }; }) {
        setResultsPerPage( evt.target.value );
        
      }
console.log(resultsPerPage)
  return (
    <>      
      <Form.Control
        type="number"
        id="inputResultsPerPage"
        aria-describedby="resultsPerPageHelpBlock"
        value={resultsPerPage} // Use MaxAge as the value
        onChange={handleChange}
        min={10}
        max={50}
      />
      <Form.Label htmlFor="inputAgeMax"># of Results per Page</Form.Label>
      <br />
      <Form.Text id="MaxAgeHelpBlock" muted>
        Enter a number
      </Form.Text>
    </>
  );
};

export default SearchFilterResultsPerPage;