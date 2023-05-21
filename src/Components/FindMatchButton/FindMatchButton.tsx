import { FC, useEffect, useState } from "react";
import "./FindMatchButton.css";
import { Button, Modal } from "react-bootstrap";

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

interface FindMatchButtonProps {
  likedDogs: LikedDogs | undefined;
  setLikedDogs:React.Dispatch<React.SetStateAction<LikedDogs | undefined>>
}

const FindMatchButton: FC<FindMatchButtonProps> = ({ likedDogs,setLikedDogs }) => {
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
    setMatchModal(true)
    // getMatchInfo()
  }

function handleClose(){
    setMatchModal(false)
    setLikedDogs(undefined)

}

let buttonActive = false
if(likedDogs?.likedDogs){
    console.log(likedDogs)
    buttonActive = true
}


  useEffect(() => {
    console.log(likedDogs);
  }, [likedDogs]);

  return (
    <>
      FindMatchButton
      <Button onClick={findMatch} disabled={!buttonActive}>Get matched!</Button>
      <MatchModal
        show={matchModal}
        match={match}
        onHide={handleClose}
      />
    </>
  );
};

export default FindMatchButton;
