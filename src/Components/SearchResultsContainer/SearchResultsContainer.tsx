import { FC, useState, useEffect } from "react";
import "./SearchResultsContainer.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchResultItem from "../SearchResultItem/SearchResultItem";

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

interface SearchResultsContainerProps {
  searchResults: SearchResult | undefined;
}

const SearchResultsContainer: FC<SearchResultsContainerProps> = ({
  searchResults,
}) => {
  console.log(searchResults?.resultIds);

  return (
    <>
      SearchResultsContainer
      <br />
      <Container>
        <Row className="mb-2" >
            {searchResults?.resultIds.map((result, k) => (
          <Col className="mb-2" lg={2} md={3} sm={6}>
              <SearchResultItem
                key={k}
                dog={result}
                searchResult={searchResults}
              />
          </Col>
            ))}
        </Row>
      </Container>
      {/* <SearchResultItem result={searchResults?.resultIds[1]} /> */}
    </>
  );
};

export default SearchResultsContainer;
