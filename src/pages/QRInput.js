import { useState } from 'react';
function QRInput() {
    var QRCode = require('qrcode.react');

    const [qrcode, setQRCode] = useState();
    function genQrCode (matchNum, regional, alliance, team1, team2, team3)
    {
    
      let json = `${matchNum}@${regional}:${alliance}[${team1},${team2},${team3}]`;
      console.log( json );
    
      return (
        <QRCode value={json} />
      );
    }

    function getInput(event)
    {
      event.preventDefault();
    
      console.log( event.target );
      const matchNum = event.target.elements["match-num"].value;
      const regional = event.target.elements["regional"].value;
      const alliance = event.target.elements["alliance"].value;
      const team1 = event.target.elements["team 1"].value;
      const team2 = event.target.elements["team 2"].value;
      const team3 = event.target.elements["team 3"].value;
    
      console.log("Hello world")
      setQRCode( genQrCode( matchNum, regional, alliance, team1, team2, team3));
      
    }

    return (
        <div className="input">
            <form onSubmit={getInput}>
                <h3>Regional:</h3>
                <div className="rounded-md order-red-600">
                <select  name="regional">
                  <option value="">Select</option>
                  <option value="LAN">LAN</option>
                </select>
                </div>

                <h3>Match Number:</h3>
                <input type = "number" id="match-num" min="1"/>

                <h3>Alliance:</h3>
                <select className="rounded-md" id="alliance">
                  <option className="rounded-md" value="">Select</option>
                  <option className="rounded-md" value="b">Blue</option>
                  <option className="rounded-md" value="r">Red</option>
                </select>

                <h3>Team Numbers:</h3>
                  <input type = "number" id="team1" min="1" className="input"/>
                  <input type = "number" id="team2" min="1" className="input"/>
                  <input type = "number" id="team3" min="1" className="input"/>

                <button>Generate QR Code</button>
            </form>
            {qrcode}
        </div>
  )
}
export default QRInput;