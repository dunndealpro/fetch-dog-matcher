import React, { FC, useState } from "react";
import { Button, Col, Modal } from "react-bootstrap";

import SelectBreedsFilter from "../SelectBreedsFilter/SelectBreedsFilter";
import SearchFilterAgeMin from "../SearchFilterAgeMin/SearchFilterAgeMin";
import SearchFilterAgeMax from "../SearchFilterAgeMax/SearchFilterAgeMax";
import SearchFilterResultsPerPage from "../SearchFilterResultsPerPage/SearchFilterResultsPerPage";
import SearchResultSort from "../SearchResultSort/SearchResultSort";

import "./SearchFilter.css";

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

interface SearchFilterProps {
  resultsPerPage: number;
  setResultsPerPage: React.Dispatch<React.SetStateAction<number>>;

  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
  searchResults: SearchResult | undefined;
  setSearchResults: React.Dispatch<
    React.SetStateAction<SearchResult | undefined>
  >;
}

const SearchFilter: FC<SearchFilterProps> = ({
  selectedBreeds,
  setSelectedBreeds,
  setSearchResults,
  resultsPerPage,
  setResultsPerPage,
}) => {
  const [ageMin, setAgeMin] = useState<number>(5);
  const [ageMax, setAgeMax] = useState<number>(15);
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState<string>("breed");
  const [sortDir, setSortDir] = useState<string>("asc");

  const handleClose = () => setShow(false);

  let searchUrl = process.env.REACT_APP_API_URL + `/dogs/search?`;

  async function handleSubmit() {
    if (ageMin > ageMax) {
      return setShow(true);
    }
    let queryBreeds = selectedBreeds.map((breed) => "breeds=" + breed);
    let queryBreedsString = queryBreeds.join("&");
    queryBreedsString = queryBreedsString.replaceAll(" ", "%20");
    queryBreedsString = "&" + queryBreedsString;

    let maxAgeString = "&ageMax=" + ageMax.toString();
    let minAgeString = "&ageMin=" + ageMin.toString();
    let resultsPerPageString = "&size=" + resultsPerPage.toString();
    let sortString = `&sort=${sort}:${sortDir}`;

    searchUrl =
      searchUrl +
      queryBreedsString +
      maxAgeString +
      minAgeString +
      resultsPerPageString +
      sortString;

    let results: SearchResult | undefined = await fetch(searchUrl, {
      credentials: "include",
    }).then((res) => res.json());
    setSearchResults(results);
  }

  return (
    <>
      <Col sm={12} md={12} lg={12} xl={2} xxl={2} className="mt-2">
        <SelectBreedsFilter
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
        />
      </Col>
      <SearchFilterAgeMin ageMin={ageMin} setAgeMin={setAgeMin} />
      <SearchFilterAgeMax ageMax={ageMax} setAgeMax={setAgeMax} />
      <SearchFilterResultsPerPage
        resultsPerPage={resultsPerPage}
        setResultsPerPage={setResultsPerPage}
      />
      <SearchResultSort
        sort={sort}
        setSort={setSort}
        sortDir={sortDir}
        setSortDir={setSortDir}
      />
      <Col sm={12} md={12} lg={4} xl={3} xxl={1} className="mt-2 text-center ">
        <Button className="btn-filter w-100 " variant="" onClick={handleSubmit}>
          Search for Dogs
        </Button>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          The min age can not be larger than the max age. Please make
          adjustments as needed.
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchFilter;
