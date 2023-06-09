import { FC, useState, useEffect } from "react";
import {  Image, Modal } from "react-bootstrap";

import "./MatchModal.css";

interface Match {
  match: string;
}

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface MatchModalProps {
  show: boolean;
  match: Match | undefined;
  onHide: () => void;
}

const MatchModal: FC<MatchModalProps> = (props) => {
  const matchInfoUrl = process.env.REACT_APP_API_URL+`/dogs`;
  const [matchInfo, setMatchInfo] = useState<Dog>();
  const [matchLocationInfo, setMatchLocationInfo] = useState<Array<any>>([]);

  async function getMatchInfo() {
    if (props.match) {
      const reqBodyParams = [props.match?.match];
      const info = await fetch(matchInfoUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBodyParams),
      }).then((res) => res.json());
      setMatchInfo(info[0]);
      getLocation(info[0].zip_code);
    }
  }

  async function getLocation(location: string | undefined) {
    const locationUrl = process.env.REACT_APP_API_URL+`/locations`;
    const locationParams = [location];
    if (locationParams !== undefined) {
      let locationResults = await fetch(locationUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationParams),
      }).then((res) => res.json());
      setMatchLocationInfo(locationResults);
    }
  }

  useEffect(() => {
    getMatchInfo();
  }, [props.match]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="text-center w-100">
              Congrats, you have been matched with{" "}
              <strong>{matchInfo && matchInfo?.name}</strong>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image fluid rounded src={matchInfo && matchInfo?.img} />
          <div>
            Name: <strong>{matchInfo && matchInfo?.name}</strong>
          </div>
          <div>
            Breed: <strong>{matchInfo && matchInfo?.breed}</strong>
          </div>
          <div>
            Age: <strong>{matchInfo && matchInfo?.age}</strong>
          </div>

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
  );
};

export default MatchModal;
