import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

import ResultsPagination from "../ResultsPagination/ResultsPagination";
import SearchResultItem from "../SearchResultItem/SearchResultItem";

import "./SearchResultsContainer.css";

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

interface LikedDogs {
  likedDogs: string[] | undefined;
}

interface SearchResultsContainerProps {
  matchButtonActive: boolean;
  setMatchButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: SearchResult | undefined;
  setSearchResults: React.Dispatch<
    React.SetStateAction<SearchResult | undefined>
  >;
  resultsPerPage: number;
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
  setMatchButtonActive,
}) => {

  return (
    <>
      <Container>
        <Row></Row>
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
            <Col
              key={result}
              className="mb-2"
              xl={3}
              lg={3}
              md={4}
              sm={6}
              xs={12}
            >
              <SearchResultItem
                key={result}
                dog={result}
                searchResult={searchResults}
                likedDogs={likedDogs}
                setLikedDogs={setLikedDogs}
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
    </>
  );
};

export default SearchResultsContainer;
