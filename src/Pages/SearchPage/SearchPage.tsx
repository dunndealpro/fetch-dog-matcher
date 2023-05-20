import { FC, useState, useEffect, SetStateAction } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import SearchResultsContainer from "../../Components/SearchResultsContainer/SearchResultsContainer";
import SearchPageWelcome from "../../Components/SearchPageWelcome/SearchPageWelcome";

// interface ResultPerPage {
//   resultsPerPage: number;
// }

// interface LikedDog{
//     likedDog: string
// }

interface LikedDogs{
    likedDogs: string[] | undefined
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
  const [likedDogs, setLikedDogs] = useState<LikedDogs | undefined>()
//   const [resultsPerPage, setResultsPerPage] = useState<ResultPerPage>({
//     resultsPerPage: 25,
//   });
  console.log(searchResults);

  useEffect(() => {
    console.log("search page use effect", searchResults);
  }, [searchResults, likedDogs]);

  return (
    <>
      <SearchPageWelcome />
      <Container>
        <Row>
          <SearchFilter
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            // resultsPerPage={resultsPerPage}
            // setResultsPerPage={setResultsPerPage}
          />
        </Row>
      </Container>
      <SearchResultsContainer
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        likedDogs={likedDogs}
        setLikedDogs={setLikedDogs}
        // resultsPerPage={resultsPerPage}
        // setResultsPerPage={setResultsPerPage}
      />
      {/* <SearchResultsContainer searchResults={searchResults} setSearchResults={setSearchResults}/> */}
    </>
  );
};

export default SearchPage;
