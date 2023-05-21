import { FC, useState, useEffect, ChangeEvent } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./SearchResultItem.css";

interface LikedDogs {
  likedDogs: string[] | undefined;
}

// interface LikedDog{
//   likedDog: string
// }

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
  likedDogs?: LikedDogs;
  setLikedDogs: React.Dispatch<React.SetStateAction<LikedDogs | undefined>>;
}

const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  const [dogInfo, setDogInfo] = useState<Dog>();
  const [display, setDisplay] = useState("I am not sure...");
  const [isLiked, setIsLiked] = useState(false);

  let dogSearchUrl = `https://frontend-take-home-service.fetch.com/dogs`;

  const reqBodyParams = [props.dog];

  function checkForLikes(dogId: string | undefined) {
    if (props.likedDogs === undefined) {
      setIsLiked(false);
    } else {
      const likedDogTemp = props.likedDogs.likedDogs;
      const idx = likedDogTemp?.indexOf(dogId || "");
      if (idx !== undefined && idx > -1) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }

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
    checkForLikes(dogResults[0].id);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let temp = props.likedDogs?.likedDogs;
    if (e.target.checked) {
      setDisplay("I like this doggo!");
      setIsLiked(true);
      if (temp === undefined) {
        let tempNew = [e.target.id];
        props.setLikedDogs({ likedDogs: tempNew });
      }
      if (temp) {
        temp.push(e.target.id);
        props.setLikedDogs({ likedDogs: temp });
      }
    } else {
      setDisplay("I am not sure...");
      setIsLiked(false);
      let idx = temp?.indexOf(e.target.id);
      if (idx === undefined || idx === -1) {
        return;
      } else {
        temp?.splice(idx, 1);
        props.setLikedDogs({ likedDogs: temp });
      }
    }
  };

  useEffect(() => {
    getDog();
  }, [props.searchResult, props.likedDogs, isLiked]);

  console.log(props.likedDogs);

  return (
    <>
      <Card className="">
        <Card.Text className="p-2 bg-secondary">{dogInfo?.breed}</Card.Text>
        <Card.Img variant="bot" src={dogInfo?.img} />
        <Card.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Meet {dogInfo?.name}</Accordion.Header>
              <Accordion.Body>
                <Card.Text>
                  <div>Age: <strong>{dogInfo?.age}</strong></div>
                  <div>Location: <strong>{dogInfo?.zip_code}</strong></div>

                  {/* Hi, I am a {dogInfo?.age} year old {dogInfo?.breed} and I am
                  currently located in {dogInfo?.zip_code} */}
                </Card.Text>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Form.Check
            className="mt-3"
            type="switch"
            id={dogInfo?.id}
            label={display}
            checked={isLiked}
            onChange={(e) => handleChange(e)}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default SearchResultItem;
