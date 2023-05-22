import { FC, useState, useEffect, SetStateAction } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import SearchResultsContainer from "../../Components/SearchResultsContainer/SearchResultsContainer";
import SearchPageWelcome from "../../Components/SearchPageWelcome/SearchPageWelcome";
import FindMatchButton from "../../Components/FindMatchButton/FindMatchButton";
import FindMatchButtonFloat from "../../Components/FindMatchButtonFloat/FindMatchButtonFloat";

// interface ResultsPerPage {
//   resultsPerPage: number ;
// }

// interface LikedDog{
//     likedDog: string
// }

interface showFindMatchButton{
    showFindMatchButton: boolean
}

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
  const [likedDogs, setLikedDogs] = useState<LikedDogs | undefined>();
  const [showFindMatchButton, setShowFindMatchButton] = useState(false)
  const [resultsPerPage, setResultsPerPage] = useState<number>(25);
  
//   const [resultsPerPage, setResultsPerPage] = useState<ResultsPerPage>({
//     resultsPerPage: 25,
//   });
  console.log(searchResults);



  useEffect(() => {
    console.log("search page use effect", searchResults);
  }, [searchResults, likedDogs]);

//  

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
            {/* <FindMatchButton  likedDogs={likedDogs} setLikedDogs={setLikedDogs} showFindMatchButton={showFindMatchButton}/> */}
      </Container>
      {searchResults?
      <SearchResultsContainer
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        likedDogs={likedDogs}
        setLikedDogs={setLikedDogs}
        resultsPerPage={resultsPerPage}
        // setResultsPerPage={setResultsPerPage}
      />:""
      
    }
      <FindMatchButtonFloat  likedDogs={likedDogs} setLikedDogs={setLikedDogs} showFindMatchButtonFloat={showFindMatchButton}/>
      {/* <SearchResultsContainer searchResults={searchResults} setSearchResults={setSearchResults}/> */}
    </>
  );
};

export default SearchPage;
