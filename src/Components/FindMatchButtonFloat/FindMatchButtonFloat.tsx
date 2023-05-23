import { FC, useState } from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";

import MatchModal from "../MatchModal/MatchModal";

import "./FindMatchButtonFloat.css";

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

interface SearchResult {
  resultIds: Array<any>;
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

interface FindMatchButtonFloatProps {
  matchButtonActive: boolean;
  setMatchButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: SearchResult | undefined;
  setSearchResults: React.Dispatch<
    React.SetStateAction<SearchResult | undefined>
  >;

  likedDogs: LikedDogs | undefined;
  setLikedDogs: React.Dispatch<React.SetStateAction<LikedDogs | undefined>>;
  className?: string;
  showFindMatchButtonFloat: boolean;
}

const FindMatchButtonFloat: FC<FindMatchButtonFloatProps> = ({
  likedDogs,
  setLikedDogs,
  searchResults,
  setSearchResults,
  matchButtonActive,
  setMatchButtonActive,
}) => {
  const [match, setMatch] = useState<Match>();
  const [matchModal, setMatchModal] = useState(false);

  const matchUrl = process.env.REACT_APP_API_URL + `/dogs/match`;

  async function findMatch() {
    const reqBodyParams = likedDogs?.likedDogs;
    const matchedDog = await fetch(matchUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBodyParams),
    }).then((res) => res.json());
    setMatch(matchedDog);
    setMatchModal(true);
  }

  function handleClose() {
    setMatchModal(false);
    setLikedDogs(undefined);
    setSearchResults(searchResults);
    setMatchButtonActive(false);
  }

  if (likedDogs?.likedDogs && likedDogs.likedDogs.length > 0) {
    setMatchButtonActive(true);
  } else {
    setMatchButtonActive(false);
  }

  

  return (
    <>
      <Container
        className={`find-match-button-float fixed-bottom ${
          !matchButtonActive ? "invisible" : ""
        }`}
      >
        <Row>
          <Col md={12} >
            <Button
              className="find-match-button-float-col"
              onClick={findMatch}
              disabled={!matchButtonActive}
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
