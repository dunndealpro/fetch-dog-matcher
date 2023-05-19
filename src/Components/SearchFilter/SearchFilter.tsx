import React, { FC, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import "./SearchFilter.css";
import { stringify } from "querystring";
import SelectBreedsFilter from "../SelectBreedsFilter/SelectBreedsFilter";

interface SearchFilterProps {
  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
  searchResults: object[] | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<object[]>>;
}

const SearchFilter: FC<SearchFilterProps> = ({
  selectedBreeds,
  setSelectedBreeds,
  setSearchResults,
}) => {
  let searchUrl = `https://frontend-take-home-service.fetch.com/dogs/search`;

  async function handleSubmit() {
    let queryBreeds = selectedBreeds.map((breed) => "breeds=" + breed);
    let queryBreedsString = queryBreeds.join("&");
    queryBreedsString = queryBreedsString.replaceAll(" ", "%20");
    console.log(queryBreedsString);
    if (queryBreedsString) {
      console.log("YES");
      searchUrl = searchUrl + "?" + queryBreedsString + "&size=10000";
    } else {
      searchUrl = searchUrl + "?size=10000";
    }
    console.log("submit", searchUrl);
    let results = await fetch(searchUrl, {
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
      <Col>
        <Button className="m-2" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Col>
    </>
  );
};

export default SearchFilter;
