import { FC, useState, useEffect, ChangeEvent } from "react";
import Card from "react-bootstrap/Card";
import { Accordion } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./SearchResultItem.css";

interface LikedDogs {
  likedDogs: string[] | undefined;
}

// interface LikedDog{
//   likedDog: string
// }

// interface Display{
//   display: string;
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
  matchButtonActive: boolean
  setMatchButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  // display: string
  // setDisplay: React.Dispatch<React.SetStateAction<string>>;
  dog: string;
  searchResult: SearchResult;
  likedDogs?: LikedDogs;
  setLikedDogs: React.Dispatch<React.SetStateAction<LikedDogs | undefined>>;
}

const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  const [dogInfo, setDogInfo] = useState<Dog>();
  const [display, setDisplay] = useState("I am not sure...");
  const [isLiked, setIsLiked] = useState(false);
  const [locationInfo, setLocationInfo] = useState<Array<any>>([]);

  let dogSearchUrl = `https://frontend-take-home-service.fetch.com/dogs`;
  let locationUrl = `https://frontend-take-home-service.fetch.com/locations`;

  const reqBodyParams = [props.dog];
  // const locationParams = [dogInfo?.zip_code]

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
    getLocation(dogResults[0].zip_code);
  }

  async function getLocation(location: string | undefined) {
    const locationParams = [location];
    if (locationParams !== undefined && locationParams) {
      let locationResults = await fetch(locationUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationParams),
      }).then((res) => res.json());
      setLocationInfo(locationResults);
    }
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
        if(idx === 0){
          console.log("WHY ARE YOU DOING THIS")
          props.setMatchButtonActive(false)
        }
      }
    }
  };

  useEffect(() => {
    getDog();
  }, [props.searchResult, props.likedDogs, isLiked]);


  return (
    <>
      <Card className="">
        <Card.Text className="p-2 rounded-top ">
          {dogInfo?.breed}
        </Card.Text>
        <Card.Img variant="bot" src={dogInfo?.img} />
        <Card.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Meet {dogInfo?.name}</Accordion.Header>
              <Accordion.Body className="align-left">
                  <div>
                    Breed: <strong>{dogInfo?.breed}</strong>
                  </div>
                  <div>
                    Age: <strong>{dogInfo?.age}</strong>
                  </div>
                  <br />
                  <div>
                    City: <strong>{locationInfo[0]?.city}</strong>
                  </div>
                  <div>
                    County: <strong>{locationInfo[0]?.county}</strong>
                  </div>
                  <div>
                    State: <strong>{locationInfo[0]?.state}</strong>
                  </div>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
            <Form.Check
              className="mt-3 text-center"
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
