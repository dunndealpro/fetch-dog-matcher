import React, { FC, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import "./SearchFilter.css";
import { stringify } from "querystring";
import SelectBreedsFilter from "../SelectBreedsFilter/SelectBreedsFilter";
import SearchFilterAgeMin from "../SearchFilterAgeMin/SearchFilterAgeMin";
import SearchFilterAgeMax from "../SearchFilterAgeMax/SearchFilterAgeMax";
import SearchFilterResultsPerPage from "../SearchFilterResultsPerPage/SearchFilterResultsPerPage";
import Modal from 'react-bootstrap/Modal';

interface SearchResult{
  resultIds: Array<any>,
  total: number,
  next: string | undefined,
  prev: string | undefined
}

interface SearchFilterProps {
  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
  searchResults: SearchResult | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult|undefined>>;
}

const SearchFilter: FC<SearchFilterProps> = ({
  selectedBreeds,
  setSelectedBreeds,
  setSearchResults,
}) => {

  const [ageMin, setAgeMin] = useState<number>(0)
  const [ageMax, setAgeMax] = useState<number>(31)
  const [show, setShow] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState<number>(25)

  const handleClose = () => setShow(false);
  
    
  let searchUrl = `https://frontend-take-home-service.fetch.com/dogs/search?`;

 

  async function handleSubmit() {
    if(ageMin>ageMax){
        return setShow(true)
    }
    let queryBreeds = selectedBreeds.map((breed) => "breeds=" + breed);
    let queryBreedsString = queryBreeds.join("&");
    queryBreedsString = queryBreedsString.replaceAll(" ", "%20");
    queryBreedsString = "&"+queryBreedsString   

    let maxAgeString = "&ageMax="+ageMax.toString()
    let minAgeString = "&ageMin="+ageMin.toString()
    let resultsPerPageString = "&size="+resultsPerPage.toString()

    searchUrl=searchUrl+queryBreedsString+maxAgeString+minAgeString+resultsPerPageString
   
    console.log("submit", searchUrl);
    let results: SearchResult|undefined = await fetch(searchUrl, {
      credentials: "include",
    }).then((res) => res.json());
    console.log(results);
    setSearchResults(results);
  }

  return (
    <>
      <Col>
        <SelectBreedsFilter
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
        />
      </Col>
      <Col sm={2}>
      <SearchFilterAgeMin ageMin={ageMin} setAgeMin={setAgeMin}/>
      </Col>
      <Col sm={2}>
      <SearchFilterAgeMax ageMax={ageMax} setAgeMax={setAgeMax}/>
      </Col>
      <Col sm={2}>
      <SearchFilterResultsPerPage resultsPerPage={resultsPerPage} setResultsPerPage={setResultsPerPage}/>
      </Col>
      <Col sm={2}>
        <Button className="m-2" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Col>
      <Modal show={show} onHide={handleClose}>
        
        <Modal.Body>The min age can not be larger than the max age.  Please make adjustments as needed.</Modal.Body>
        
      </Modal>
    </>
  );
};

export default SearchFilter;
