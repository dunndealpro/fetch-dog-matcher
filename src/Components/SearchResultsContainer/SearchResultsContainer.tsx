import { FC, useState, useEffect, SetStateAction } from "react";
import "./SearchResultsContainer.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import ResultsPagination from "../ResultsPagination/ResultsPagination";
import FindMatchButton from "../FindMatchButton/FindMatchButton";

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

// interface Display{
//   display: string;
// }

// interface ResultsPerPage{
//   resultsPerPage: number
// }

// interface LikedDog{
//   likedDog: string
// }

interface LikedDogs {
  likedDogs: string[] | undefined;
}

interface SearchResultsContainerProps {
  matchButtonActive: boolean
  setMatchButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  // display: string
  // setDisplay: React.Dispatch<React.SetStateAction<string>>;
  searchResults: SearchResult | undefined;
  setSearchResults: React.Dispatch<
    React.SetStateAction<SearchResult | undefined>
  >;
  resultsPerPage: number;
  // setResultsPerPage:  React.Dispatch<React.SetStateAction<ResultsPerPage>>;
  likedDogs?: LikedDogs;
  setLikedDogs: React.Dispatch<React.SetStateAction<LikedDogs | undefined>>;
}

const SearchResultsContainer: FC<SearchResultsContainerProps> = ({
  searchResults,
  setSearchResults,
  likedDogs,
  setLikedDogs,
    resultsPerPage,
    matchButtonActive,
    setMatchButtonActive
    // display,
    // setDisplay
}) => {
  console.log(searchResults?.resultIds);

  return (
    <>
      {/* <h1>Number of results: {searchResults?.total}</h1>
      <br />
      <br /> */}
      <Container>
      <Row>
          {/* <Col>
            <FindMatchButton  likedDogs={likedDogs} setLikedDogs={setLikedDogs}/>
          </Col> */}
        </Row>
        <Row className="">
          <Col xs={12}>
            <ResultsPagination
              searchResult={searchResults}
              setSearchResults={setSearchResults}
              resultsPerPage={resultsPerPage}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          {searchResults?.resultIds.map((result, k) => (
            <Col key={result} className="mb-2" xl={3}lg={3} md={4} sm={6} xs={12}>
              <SearchResultItem
                key={result}
                dog={result}
                searchResult={searchResults}
                likedDogs={likedDogs}
                setLikedDogs={setLikedDogs}
                // display={display}
                // setDisplay={setDisplay}
                matchButtonActive={matchButtonActive}
                setMatchButtonActive={setMatchButtonActive}

              />
            </Col>
          ))}
        </Row>
       
        <Row className="">
          <Col xs={12}>
            <ResultsPagination
              searchResult={searchResults}
              setSearchResults={setSearchResults}
              resultsPerPage={resultsPerPage}
            />

          </Col>
        </Row>
      </Container>
      {/* <SearchResultItem result={searchResults?.resultIds[1]} /> */}
    </>
  );
};

export default SearchResultsContainer;
