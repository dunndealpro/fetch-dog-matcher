import { FC, useState, useEffect } from "react";
import './MatchModal.css'
import { Button, Image, Modal } from "react-bootstrap";

interface Match{
    match: string
  }

  interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }
  

interface MatchModalProps{
    show: boolean
    match: Match | undefined
    onHide: () => void;
}

const MatchModal: FC<MatchModalProps> = (props) =>{

    console.log("match! ", props.match)

//     const [matchInfo, setMatchInfo] = useState<Dog>()

    // const matchInfoUrl = `https://frontend-take-home-service.fetch.com/dogs`;
    // const reqBodyParams = props.match;  

    const matchInfoUrl = `https://frontend-take-home-service.fetch.com/dogs`;
    const [matchInfo, setMatchInfo] = useState<Dog>()

    async function getMatchInfo() {
        console.log(props.match)
        if(props.match){
        const reqBodyParams = [props.match?.match]
        const info = await fetch(matchInfoUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBodyParams),
        }).then((res) => res.json());
        console.log(info);
        setMatchInfo(info[0]);
        }
      }
    
useEffect(()=>{
    getMatchInfo()
},[props.match])

    return(
        <>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            <div className="text-center w-100">{matchInfo && matchInfo?.name}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Image fluid src={matchInfo && matchInfo?.img}/>
        <div>Breed: <strong>{matchInfo && matchInfo?.breed}</strong></div>
        <div>Age: <strong>{matchInfo && matchInfo?.age}</strong></div>
        <div>Current Location: (feature coming soon)</div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
        </>
    )
}

export default MatchModal;