import React, { FC, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

import "./SelectBreedsFilter.css";

interface SelectBreedsFilterProps {
  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectBreedsFilter: FC<SelectBreedsFilterProps> = ({
  selectedBreeds,
  setSelectedBreeds,
}) => {
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [listBreed, setListBreed] = useState("");

  let breedsUrl = `https://frontend-take-home-service.fetch.com/dogs/breeds`;

  async function getAllBreeds() {
    let breeds = await fetch(breedsUrl, {
      credentials: "include",
    }).then((res) => res.json());
    console.log(breeds);
    setAllBreeds(breeds);
  }

  function handleChange(evt: { target: { name: any; value: any } }) {
    setListBreed(evt.target.value);
    // setError('');
  }

  function handleCheck(event: any) {
    console.log(
      "check?",
      typeof event.target.id,
      event.target.checked,
      selectedBreeds
    );
    if (event.target.checked) {
      selectedBreeds.push(event.target.id);
      console.log(selectedBreeds);
    } else {
      let idx = selectedBreeds.indexOf(event.target.id);
      selectedBreeds.splice(idx, 1);
      console.log(selectedBreeds);
    }
    setSelectedBreeds(selectedBreeds);
  }

  useEffect(() => {
    getAllBreeds();
    console.log("GETTING ALL BREEDS");
  }, []);

  return (
    <>
      {/* <Container fluid> */}
        <Dropdown className="breed-drop mb-2 rounded">
          <Dropdown.Toggle variant="" id="dropdown-basic" className="breed-drop w-100 ">
            Select Breeds
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100 p-1 breed-bg-col">
            <Form autoComplete="off">
              {/* <Form.Group className="m-3" controlId="formBasicPassword">
              <Form.Label>Search for Breed(case sensitive)</Form.Label>
              <Form.Control
                className=""
                type="search"
                placeholder="search for Breed"
                value={listBreed}
                onChange={handleChange}
                />
              </Form.Group> */}
              <div className="m-2 breed-container ">
                {allBreeds
                  .filter((elem) => elem.includes(listBreed))
                  .map((breed, k) => (
                    <Form.Group key={k} className="mb-3" controlId={breed}>
                      <Form.Check
                        key={k}
                        type="checkbox"
                        onChange={handleCheck}
                        label={breed}
                      />
                    </Form.Group>
                  ))}
              </div>
            </Form>
          </Dropdown.Menu>
        </Dropdown>
      {/* </Container> */}
    </>
  );
};

export default SelectBreedsFilter;
