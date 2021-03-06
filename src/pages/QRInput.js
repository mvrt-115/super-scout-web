import { useEffect, useState } from "react";
import { db } from "../firebase";
function QRInput() {
  let QRCode = require("qrcode.react");

  const [regionals, setRegionals] = useState([]);
  const [qrcode, setQRCode] = useState();

  useEffect(() => {
    const fetchData = async() => {
      const regionalRef = await db.collection("regional").get();

      setRegionals(regionalRef.docs.map(doc => doc.id))
    }
    fetchData();
  }, [])

  function genQrCode(matchNum, regional, alliance, team1, team2, team3) {
    let json = `${matchNum}@${regional}:${alliance}[${team1},${team2},${team3}]`;

    return <QRCode value={json} size="256" style={{marginLeft: "33%", marginRight: "33%"}} />;
  }

  function getInput(event) {
    event.preventDefault();

    console.log(event.target);
    const matchNum = event.target.elements["match-num"].value;
    const regional = event.target.elements["regional"].value;
    const alliance = event.target.elements["alliance"].value;
    const team1 = event.target.elements["team 1"].value;
    const team2 = event.target.elements["team 2"].value;
    const team3 = event.target.elements["team 3"].value;

    setQRCode(genQrCode(matchNum, regional, alliance, team1, team2, team3));
  }

  return (
    <div className="p-5 pt-2">
      <form onSubmit={getInput} className="flex flex-col space-y-10">
        <div className="flex flex-col">
          <h3>Regional:</h3>
          <select required
            className="background-color-yellow px-3	py-1 rounded-md appearence-none"
            name="regional"
            defaultValue=""
          >
            <option value="" disabled>Select</option>
            {regionals.map(regional => <option value={regional} key={regional} >{regional}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <h3>Match Number:</h3>
          <input required
            type="number"
            className="border rounded-md py-1 px-3 background-color-purple	"
            id="match-num"
            min="1"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="">Alliance:</h3>
          <select required defaultValue=""
            className="background-color-yellow px-3	py-1 rounded-md appearence-none"
            id="alliance"
          >
            <option disabled
              className="background-color-yellow	rounded-md appearence-none"
              value=""
            >
              Select
            </option>
            <option
              className="rounded-md appearence-none"
              style={{color: "blue"}}
              value="b"
            >
              Blue
            </option>
            <option
              className="rounded-md appearence-none"
              style={{color: "red"}}
              value="r"
            >
              Red
            </option>
          </select>
        </div>

        <div className="flex flex-col">
          <h3>Team Numbers:</h3>
          <div className="flex flex-row flex-wrap">
            <input required
              type="number"
              className="border rounded-md py-1 px-2 background-color-purple flex-1 flex-auto m-1"
              id="team 1"
              min="1"
              placeholder="team 1"
            />
            <input required
              type="number"
              className="border rounded-md py-1 px-2 background-color-purple flex-1 flex-auto m-1"
              id="team 2"
              min="1"
              placeholder="team 2"
            />
            <input required
              type="number"
              className="border rounded-md py-1 px-2 background-color-purple flex-1 flex-auto m-1"
              id="team 3"
              min="1"
              placeholder="team 3"
            />
          </div>
        </div>
        <button
          className="bg-blue-700 text-gray-50 uppercase text-lg font-bold  p-4 rounded"
          type="submit"
        >
          Generate QR Code
        </button>
      </form>

      <br />
      <hr />
      <br />

      {qrcode && <h1 className="text-2xl">Your QR Code:</h1>}
      {qrcode}
    </div>
  );
}

//for commuit
export default QRInput;
