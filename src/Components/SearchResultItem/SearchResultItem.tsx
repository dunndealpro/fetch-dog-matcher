import { FC, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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



interface SearchResultItemProps {
  result: string;
}

const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  const [dogInfo, setDogInfo] = useState<Dog>();

  let dogSearchUrl = `https://frontend-take-home-service.fetch.com/dogs`;

  const reqBodyParams = [props.result];
  console.log(props.result);

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
    console.log(dogResults);
  }

  useEffect(() => {
    getDog();
    console.log(dogInfo);
  }, []);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={dogInfo?.img} />
        <Card.Body>
          <Card.Title>{dogInfo?.name}</Card.Title>
          <Card.Text>
            Hi, I am {dogInfo?.age} years old and I am currently located in {dogInfo?.zip_code}
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
      
    </>
  );
};

export default SearchResultItem;
