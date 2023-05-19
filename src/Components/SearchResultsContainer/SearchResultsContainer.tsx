import { FC } from "react";
import './SearchResultsContainer.css'
import {Container, Row, Col,} from "react-bootstrap"; 
import SearchResultItem from "../SearchResultItem/SearchResultItem";

interface SearchResultsContainerProps{
    searchResults: object[]|undefined
    setSearchResults: React.Dispatch<React.SetStateAction<object[]>>
}

const SearchResultsContainer: FC = () =>{

    return(
        <>
        SearchResultsContainer
        <Container>

        </Container>
        </>
    )
}

export default SearchResultsContainer;