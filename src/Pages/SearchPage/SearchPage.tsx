import { FC, useState, useEffect, SetStateAction } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import SearchResultsContainer from "../../Components/SearchResultsContainer/SearchResultsContainer";
import SearchPageWelcome from "../../Components/SearchPageWelcome/SearchPageWelcome";
import FindMatchButton from "../../Components/FindMatchButton/FindMatchButton";

// interface ResultPerPage {
//   resultsPerPage: number;
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
  
//   const [resultsPerPage, setResultsPerPage] = useState<ResultPerPage>({
//     resultsPerPage: 25,
//   });
  console.log(searchResults);

//   const handleScroll = () => {
//     const scrollY = window.scrollY;
//     const windowHeight = window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;
//     const bottomThreshold = 100; // adjust this value as needed

//     if (scrollY + windowHeight >= documentHeight - bottomThreshold) {
//       setShowFindMatchButton(true);
//     } else {
//       setShowFindMatchButton(false);
//     }
//   };

  useEffect(() => {
    console.log("search page use effect", searchResults);
  }, [searchResults, likedDogs]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

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
            <FindMatchButton  likedDogs={likedDogs} setLikedDogs={setLikedDogs} showFindMatchButton={showFindMatchButton}/>
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
