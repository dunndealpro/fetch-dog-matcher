import { FC, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import "./SearchFilter.css";
import { stringify } from "querystring";

const SearchFilter: FC = () => {
  //get all available breeds
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [listBreed, setListBreed] = useState("");
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState({});

  let breedsUrl = `https://frontend-take-home-service.fetch.com/dogs/breeds`;
  let searchUrl = `https://frontend-take-home-service.fetch.com/dogs/search`;

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

  async function handleSubmit() {
    let queryBreeds = selectedBreeds.map((breed)=> "breeds="+breed )
    let queryBreedsString = queryBreeds.join("&")
    queryBreedsString = queryBreedsString.replaceAll(' ', '%20')
    console.log( queryBreedsString)
    // searchUrl = `${searchUrl}?breeds=${selectedBreeds.join("&")}`;
    if(queryBreedsString){
        console.log("YES")
        searchUrl=searchUrl+"?"+queryBreedsString
    }
    // searchUrl = searchUrl+'?breeds=Basset'
    console.log("submit", searchUrl);
    let results = await fetch(searchUrl, {
      credentials: "include",
      // body: JSON.stringify(selectedBreeds),
    }).then((res) => res.json());
    console.log(results);
    setSearchResults(results);
  }

  console.log(searchResults);

  useEffect(() => {
    getAllBreeds();
  }, []);

  return (
    <>
      SearchFilter
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Breeds
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Form autoComplete="off">
            <Form.Group className="m-3" controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                className=""
                type="search"
                placeholder="search for Breed"
                value={listBreed}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="m-2 breed-container">
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
            <Button className="m-2" variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SearchFilter;
