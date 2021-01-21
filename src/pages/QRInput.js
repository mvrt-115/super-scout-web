import { useState } from "react";
import QRScanner from "./QRScanner"
function QRInput() {
  let QRCode = require("qrcode.react");

  const [qrcode, setQRCode] = useState();
  function genQrCode(matchNum, regional, alliance, team1, team2, team3) {
    let json = `${matchNum}@${regional}:${alliance}[${team1},${team2},${team3}]`;
    console.log(json);

    return <QRCode value={json} />;
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

    console.log("Hello world");
    setQRCode(genQrCode(matchNum, regional, alliance, team1, team2, team3));
  }

  return (
    <div className="p-5 pt-2">
      <form onSubmit={getInput} className="flex flex-col space-y-10">
        <div className="flex flex-col">
          <h3>Regional:</h3>
          <select
            className="bg-yellow-300 px-3	py-1 rounded-md appearence-none"
            name="regional"
            placeholder="select"
          >
            <option value="">Select</option>
            <option value="LAN">LAN</option>
          </select>
        </div>

        <div className="flex flex-col">
          <h3>Match Number:</h3>
          <input
            type="number"
            className="border rounded-md py-1 px-3 text-grey-darkes bg-green-200	"
            id="match-num"
            min="1"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="">Alliance:</h3>
          <select
            className="bg-yellow-300 px-3	py-1 rounded-md appearence-none"
            id="alliance"
          >
            <option
              className="bg-yellow-300	rounded-md appearence-none"
              value=""
            >
              Select
            </option>
            <option
              className="bg-yellow-300	rounded-md appearence-none"
              value="b"
            >
              Blue
            </option>
            <option
              className="bg-yellow-300	rounded-md appearence-none"
              value="r"
            >
              Red
            </option>
          </select>
        </div>

        <div className="flex flex-col">
          <h3>Team Numbers:</h3>
          <div className="flex flex-row flex-wrap">
            <input
              type="number"
              className="border rounded-md py-1 px-2 text-grey-darkes bg-green-200 flex-1 flex-auto m-1"
              id="team 1"
              min="1"
              placeholder="team 1"
            />
            <input
              type="number"
              className="border rounded-md py-1 px-2 text-grey-darkes bg-green-200 flex-1 flex-auto m-1"
              id="team 2"
              min="1"
              placeholder="team 2"
            />
            <input
              type="number"
              className="border rounded-md py-1 px-2 text-grey-darkes bg-green-200 flex-1 flex-auto m-1"
              id="team 3"
              min="1"
              placeholder="team 3"
            />
          </div>
        </div>
        <button
          className="bg-blue-700 text-green-500 uppercase text-lg font-bold  p-4 rounded hover:bg-green-700 "
          type="submit"
        >
          Generate QR Code
        </button>
      </form>
      {qrcode}

      {/* <vh/> */}

      <QRScanner/>
    </div>
  );
}

//for commuit
export default QRInput;
