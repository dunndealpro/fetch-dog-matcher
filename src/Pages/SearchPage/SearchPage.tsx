import { FC, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import SearchResultsContainer from "../../Components/SearchResultsContainer/SearchResultsContainer";
import SearchPageWelcome from "../../Components/SearchPageWelcome/SearchPageWelcome";

interface SearchResult{
    resultIds: Array<any>,
    total: number,
    next: string | undefined,
    prev: string | undefined
  }

const SearchPage: FC = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult>();
  console.log(searchResults)

  useEffect(()=>{
    console.log("search page use effect", searchResults)
  }, [searchResults])

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
          />
        </Row>
        
      </Container>
      <SearchResultsContainer searchResults={searchResults}/>
      {/* <SearchResultsContainer searchResults={searchResults} setSearchResults={setSearchResults}/> */}
    </>
  );
};

export default SearchPage;
