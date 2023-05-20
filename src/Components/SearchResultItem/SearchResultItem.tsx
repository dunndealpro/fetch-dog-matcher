import { FC, useState, useEffect, ChangeEvent } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Accordion } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import "./SearchResultItem.css";

interface LikedDogs{
  likedDogs: string[] | undefined
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
  likedDogs?: LikedDogs
  setLikedDogs: React.Dispatch<React.SetStateAction<LikedDogs | undefined>>;
}

const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  const [dogInfo, setDogInfo] = useState<Dog>();
  const [display, setDisplay] = useState("I am not sure...")

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
   console.log(e.target.checked)
   console.log(e.target.id)
   
   let temp = props.likedDogs?.likedDogs
  //  temp = props.likedDogs
   console.log(temp)
   if(e.target.checked){
    setDisplay("I like this doggo!")
    if(temp === undefined){
      let tempNew = [e.target.id]
      console.log(tempNew)
      props.setLikedDogs({likedDogs: tempNew})
    }
    if (temp){
      temp.push(e.target.id)
      props.setLikedDogs({likedDogs: temp})
    }    
   }else{
    setDisplay("I am not sure...")
    let idx = temp?.indexOf(e.target.id)
    console.log(idx)
    if(idx=== undefined || idx === -1){
      console.log("not found")
      return
    }else{
      console.log("splicing")
      temp?.splice(idx, 1)
      props.setLikedDogs({likedDogs: temp})
    }
    


   }
   console.log(props.likedDogs)
}

  useEffect(() => {
    getDog();
    // console.log(dogInfo);
    
  }, [props.searchResult, props.likedDogs]);

  console.log(props.likedDogs)

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
          <Form.Check className="mt-3"
        type="switch"
        id={dogInfo?.id}
        label={display}
        onChange={e => handleChange(e)}
      />
        </Card.Body>
      </Card>
    </>
  );
};

export default SearchResultItem;
