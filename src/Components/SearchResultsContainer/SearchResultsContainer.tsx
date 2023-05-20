import { FC, useState, useEffect } from "react";
import './SearchResultsContainer.css'
import {Container, Row, Col,} from "react-bootstrap"; 
import SearchResultItem from "../SearchResultItem/SearchResultItem";

interface SearchResult{
    resultIds: Array<any>,
    total: number,
    next: string | undefined,
    prev: string | undefined
  }

interface SearchResultsContainerProps{
    searchResults: SearchResult | undefined;
    
}

const SearchResultsContainer: FC<SearchResultsContainerProps> = ({searchResults}) =>{

    
console.log(searchResults?.resultIds)

    return(
        <>
        SearchResultsContainer
        <br />
        <Container>
        {searchResults?.resultIds.map((result, k)=>(
            <SearchResultItem key={k}result={result}/>)
    )}
        </Container>
        {/* <SearchResultItem result={searchResults?.resultIds[1]} /> */}
        </>
    )
}

export default SearchResultsContainer;