import { FC, useState, useEffect } from "react";
import "./SearchResultsContainer.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import ResultsPagination from "../ResultsPagination/ResultsPagination";

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

// interface ResultPerPage{
//     resultsPerPage: number;  
//   }

// interface LikedDog{
//   likedDog: string
// }

interface LikedDogs{
  likedDogs: string[] | undefined
}

interface SearchResultsContainerProps {
    searchResults: SearchResult | undefined;
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResult | undefined>>;
    // resultsPerPage: ResultPerPage;
    // setResultsPerPage:  React.Dispatch<React.SetStateAction<ResultPerPage>>;
    likedDogs?: LikedDogs;
    setLikedDogs: React.Dispatch<React.SetStateAction<LikedDogs | undefined>>;
}

const SearchResultsContainer: FC<SearchResultsContainerProps> = ({
  searchResults,
  setSearchResults,
  likedDogs,
  setLikedDogs
//   resultsPerPage
}) => {
  console.log(searchResults?.resultIds);

  return (
    <>
      SearchResultsContainer
      <br />
      <br />
      <Container >
        <Row className="">
          <Col xs={12} >
            <ResultsPagination searchResult={searchResults} setSearchResults={setSearchResults} />
          </Col>
        </Row>
        <Row className="mb-2">
          {searchResults?.resultIds.map((result, k) => (
            <Col className="mb-2" lg={2} md={3} sm={6}>
              <SearchResultItem
                key={k}
                dog={result}
                searchResult={searchResults}
                likedDogs={likedDogs}
                setLikedDogs={setLikedDogs}
              />
            </Col>
          ))}
        </Row>
        <Row className="">
          <Col xs={12} >
            <ResultsPagination searchResult={searchResults} setSearchResults={setSearchResults} />
          </Col>
        </Row>
      </Container>
      {/* <SearchResultItem result={searchResults?.resultIds[1]} /> */}
    </>
  );
};

export default SearchResultsContainer;
