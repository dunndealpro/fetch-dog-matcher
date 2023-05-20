import { FC, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Accordion } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import "./SearchResultItem.css";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

interface SearchResultItemProps {
  dog: string;
  searchResult: SearchResult;
}

const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  const [dogInfo, setDogInfo] = useState<Dog>();

  let dogSearchUrl = `https://frontend-take-home-service.fetch.com/dogs`;

  const reqBodyParams = [props.dog];
//   console.log(props.dog);

  async function getDog() {
    let dogResults = await fetch(dogSearchUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBodyParams),
    }).then((res) => res.json());
    setDogInfo(dogResults[0]);
    // console.log(dogResults);
  }

  useEffect(() => {
    getDog();
    // console.log(dogInfo);
  }, [props.searchResult]);

  return (
    <>
      <Card>
      
        <Card.Img variant="top" src={dogInfo?.img} />
        <Card.Body>
          <Accordion >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Meet {dogInfo?.name}</Accordion.Header>
              <Accordion.Body>
                <Card.Text>
                  Hi, I am a {dogInfo?.age} year old {dogInfo?.breed} and I am
                  currently located in {dogInfo?.zip_code}
                </Card.Text>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* <Card.Text>
            Hi, I am {dogInfo?.age} years old {dogInfo?.breed} and I am currently located in {dogInfo?.zip_code}
          </Card.Text> */}
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default SearchResultItem;
