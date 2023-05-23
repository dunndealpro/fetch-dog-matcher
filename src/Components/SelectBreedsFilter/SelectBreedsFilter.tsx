import React, { FC, useEffect, useState } from "react";

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

  let breedsUrl = process.env.REACT_APP_API_URL + `/dogs/breeds`;

  async function getAllBreeds() {
    let breeds = await fetch(breedsUrl, {
      credentials: "include",
    }).then((res) => res.json());
    setAllBreeds(breeds);
  }

  function handleCheck(event: any) {
    if (event.target.checked) {
      selectedBreeds.push(event.target.id);
    } else {
      let idx = selectedBreeds.indexOf(event.target.id);
      selectedBreeds.splice(idx, 1);
    }
    setSelectedBreeds(selectedBreeds);
  }

  useEffect(() => {
    getAllBreeds();
  }, []);

  return (
    <>
      <Dropdown className="breed-drop mb-2 rounded">
        <Dropdown.Toggle
          variant=""
          id="dropdown-basic"
          className="breed-drop w-100 "
        >
          Select Breeds
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100 p-1 breed-bg-col">
          <Form autoComplete="off">
           
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
    </>
  );
};

export default SelectBreedsFilter;
