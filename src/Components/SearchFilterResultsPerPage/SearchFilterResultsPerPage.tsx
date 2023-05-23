import { FC } from "react";
import { Col, Form } from "react-bootstrap";

import "./SearchFilterResultsPerPage.css";

interface SearchFilterResultsPerPageProps {
  resultsPerPage: number;
  setResultsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchFilterResultsPerPage: FC<SearchFilterResultsPerPageProps> = ({
  resultsPerPage,
  setResultsPerPage,
}) => {
  function handleChange(evt: { target: { value: any } }) {
    setResultsPerPage(evt.target.value);
  }
  return (
    <>
      <Col xs={6} sm={6} md={3} lg={3} xl={2} xxl={1} className="mt-2">
        <Form.Label htmlFor="inputAgeMax"># of Results per Page</Form.Label>
      </Col>
      <Col xs={6} sm={6} md={3} lg={3} xl={1} xxl={1} className="mt-2">
        <Form.Control
          type="number"
          id="inputResultsPerPage"
          aria-describedby="resultsPerPageHelpBlock"
          value={resultsPerPage}
          onChange={handleChange}
          min={10}
          max={50}
        />
      </Col>
    </>
  );
};

export default SearchFilterResultsPerPage;
