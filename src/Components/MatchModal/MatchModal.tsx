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

    const matchInfoUrl = `https://frontend-take-home-service.fetch.com/dogs`;
    const [matchInfo, setMatchInfo] = useState<Dog>()
    const [matchLocationInfo, setMatchLocationInfo] = useState<Array<any>>([])

    async function getMatchInfo() {
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
        setMatchInfo(info[0]);
        getLocation(info[0].zip_code)
        }
      }

      async function getLocation(location: string | undefined){
        const locationUrl = `https://frontend-take-home-service.fetch.com/locations`;
        const locationParams = [location]
        console.log(locationParams)
        if(locationParams !== undefined){
        let locationResults = await fetch(locationUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(locationParams),
          
      }).then((res) => res.json());
      console.log(locationResults)
      setMatchLocationInfo(locationResults)}
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
            <div className="text-center w-100">Congrats, you have been mathced with <strong>{matchInfo && matchInfo?.name}</strong></div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Image fluid src={matchInfo && matchInfo?.img}/>
        <div>Name: <strong>{matchInfo && matchInfo?.name}</strong></div>
        <div>Breed: <strong>{matchInfo && matchInfo?.breed}</strong></div>
        <div>Age: <strong>{matchInfo && matchInfo?.age}</strong></div>
        
        
          <br />
          <div>
            City: <strong>{matchLocationInfo[0]?.city}</strong>
          </div>
          <div>
            County: <strong>{matchLocationInfo[0]?.county}</strong>
          </div>
          <div>
            State: <strong>{matchLocationInfo[0]?.state}</strong>
          </div>
      </Modal.Body>
    
    </Modal>
        </>
    )
}

export default MatchModal;