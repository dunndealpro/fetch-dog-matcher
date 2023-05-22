import { FC, useEffect, useState } from "react";
import "./FindMatchButtonFloat.css";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";

import MatchModal from "../MatchModal/MatchModal";
import { propTypes } from "react-bootstrap/esm/Image";

interface LikedDogs {
  likedDogs: string[] | undefined;
}

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Match {
  match: string;
}

interface ShowFindMatchButtonFloat {
  showFindMatchButtonFloat: boolean;
}

interface FindMatchButtonFloatProps {
  likedDogs: LikedDogs | undefined;
  setLikedDogs: React.Dispatch<React.SetStateAction<LikedDogs | undefined>>;
  className?: string; // Add the className prop
  showFindMatchButtonFloat: boolean;
}

const FindMatchButtonFloat: FC<FindMatchButtonFloatProps> = ({
  likedDogs,
  setLikedDogs,
  className,
  showFindMatchButtonFloat,
}) => {
  const [match, setMatch] = useState<Match>();
  const [matchModal, setMatchModal] = useState(false);
  const matchUrl = `https://frontend-take-home-service.fetch.com/dogs/match`;
  //   const matchInfoUrl = `https://frontend-take-home-service.fetch.com/dogs`;
  //   const [matchInfo, setMatchInfo] = useState<Dog>()

  // console.log(liks)

  async function findMatch() {
    const reqBodyParams = likedDogs?.likedDogs;
    console.log(likedDogs);
    const matchedDog = await fetch(matchUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBodyParams),
    }).then((res) => res.json());
    console.log(matchedDog);
    setMatch(matchedDog);
    setMatchModal(true);
    // getMatchInfo()
  }

  function handleClose() {
    setMatchModal(false);
    setLikedDogs(undefined);
  }
  let buttonActive = false;
  if (likedDogs?.likedDogs) {
    console.log(likedDogs);
    buttonActive = true;
  }

  useEffect(() => {
    console.log(likedDogs);
    //   if(likedDogs?.likedDogs){
    //     console.log(likedDogs)
    //     buttonActive = true
    // }
  }, [likedDogs]);

  return (
    <>
      <Container className={`find-match-button-float fixed-bottom ${
                !buttonActive ? "invisible" : ""
              }`}>
        <Row>
          <Col md={12} fluid>
            <Button
              className="find-match-button-float-col"
              onClick={findMatch}
              disabled={!buttonActive}
            >
              Get matched with a new Friend!
            </Button>
          </Col>
        </Row>
        <MatchModal show={matchModal} match={match} onHide={handleClose} />
      </Container>
      {/* </Container> */}
    </>
  );
};

export default FindMatchButtonFloat;
