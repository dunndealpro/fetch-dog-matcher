import { FC, useState, useEffect, SetStateAction } from "react";
import { Container, Row } from "react-bootstrap";

import FindMatchButtonFloat from "../../Components/FindMatchButtonFloat/FindMatchButtonFloat";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import SearchPageWelcome from "../../Components/SearchPageWelcome/SearchPageWelcome";
import SearchResultsContainer from "../../Components/SearchResultsContainer/SearchResultsContainer";

interface showFindMatchButton {
  showFindMatchButton: boolean;
}

interface LikedDogs {
  likedDogs: string[] | undefined;
}

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

const SearchPage: FC = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult>();
  const [likedDogs, setLikedDogs] = useState<LikedDogs | undefined>();
  const [showFindMatchButton, setShowFindMatchButton] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [matchButtonActive, setMatchButtonActive] = useState(false);


  useEffect(() => {
    // console.log("search page use effect", searchResults);
  }, [searchResults, likedDogs]);

  return (
    <>
      <SearchPageWelcome />

      <Container>
        <Row className="bg-light rounded p-2 m-1 justify-content-center">
          <SearchFilter
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            resultsPerPage={resultsPerPage}
            setResultsPerPage={setResultsPerPage}
          />
        </Row>
      </Container>
      {searchResults ? (
        <SearchResultsContainer
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          likedDogs={likedDogs}
          setLikedDogs={setLikedDogs}
          resultsPerPage={resultsPerPage}
          matchButtonActive={matchButtonActive}
          setMatchButtonActive={setMatchButtonActive}
        />
      ) : (
        ""
      )}
      <FindMatchButtonFloat
        likedDogs={likedDogs}
        setLikedDogs={setLikedDogs}
        showFindMatchButtonFloat={showFindMatchButton}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        matchButtonActive={matchButtonActive}
        setMatchButtonActive={setMatchButtonActive}
      />
    </>
  );
};

export default SearchPage;
