import { useEffect, useState } from "react";
import { db } from "../firebase";
import * as QRCode from "qrcode.react";
import { Button, Input, HStack, Select } from "@chakra-ui/react";

function QRInput() {
  const [regionals, setRegionals] = useState([]);
  const [qrcode, setQRCode] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const regionalRef = await db.collection("regional").get();

      setRegionals(regionalRef.docs.map((doc) => doc.id));
    };
    fetchData();
  }, []);

  function getInput(event) {
    event.preventDefault();

    const matchNum = event.target.elements["match-num"].value;
    const regional = event.target.elements["regional"].value;
    const alliance = event.target.elements["alliance"].value;
    const team1 = event.target.elements["team 1"].value;
    const team2 = event.target.elements["team 2"].value;
    const team3 = event.target.elements["team 3"].value;

    setQRCode(
      `${matchNum}@${regional}:${alliance}[${team1},${team2},${team3}]`
    );
  }

  return (
    <>
      <form onSubmit={getInput}>
        <div>
          <h3>Regional:</h3>
          <Select required name="regional" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {regionals.map((regional) => (
              <option value={regional} key={regional}>
                {regional}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <h3>Match Number:</h3>
          <Input required type="number" id="match-num" min="1" />
        </div>
        <div>
          <h3>Alliance:</h3>
          <Select required defaultValue="" id="alliance">
            <option disabled value="">
              Select
            </option>
            <option style={{ color: "blue" }} value="b">
              Blue
            </option>
            <option style={{ color: "red" }} value="r">
              Red
            </option>
          </Select>
        </div>

        <div>
          <h3>Team Numbers:</h3>
          <HStack>
            <Input
              required
              type="number"
              id="team 1"
              min="1"
              placeholder="Team 1"
            />
            <Input
              required
              type="number"
              id="team 2"
              min="1"
              placeholder="Team 2"
            />
            <Input
              required
              type="number"
              id="team 3"
              min="1"
              placeholder="Team 3"
            />
          </HStack>
        </div>
        <Button colorScheme="purple" type="submit" width="100%" marginTop="2">
          Generate QR Code
        </Button>
      </form>

      <hr />

      {qrcode && (
        <>
          <h1>Your QR Code:</h1>{" "}
          <QRCode
            value={qrcode}
            size={256}
            style={{ marginLeft: "33%", marginRight: "33%" }}
          />
        </>
      )}
    </>
  );
}

//for commuit
export default QRInput;
