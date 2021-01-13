import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
var QRCode = require('qrcode.react');

function Home() {
  const [qrcode, setQRCode] = useState();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // what data from the qr code will look like
        const data = {
          data: {
            matchNum: 10,
            teamNum: 31,
            startLocations: 'true,false,false',
            initLineCrosses: true,
            preloads: 6,
            autonUpper: 7,
            autonInner: 3,
            autonUpperMissed: 5,
            autonBottom: 8,
            autonBottomMissed: 2,
            teleopUpper: 2,
            teleopInner: 0,
            teleopUpperMissed: 1,
            teleopBottom: 12,
            teleopBottomMissed: 6,
            trench: true,
            defense: true,
            rotation: false,
            position: true,
            stuck: true,
            disabled: true,
            cycles: 16,
            climbTime: 2495,
            hangFail: false,
            levelFail: false,
            attemptHang: true,
            attemptLevel: true,
            buddy: false,
            comments: '',
            minfo: '31@CASF:b[31,75,95]',
            sctid: 0,
          },
          verif: 9613,
        };

        const minfo = data['data']['minfo'];

        const regional = minfo.substring(
          minfo.indexOf('@') + 1,
          minfo.indexOf(':')
        );
        const match = data['data']['matchNum'] + '';
        const isBlueAlliance =
          minfo.substring(minfo.indexOf(':') + 1, minfo.indexOf('[')) === 'b';
        const alliance = isBlueAlliance ? 'blue' : 'red';
        const team = data['data']['teamNum'] + '';

        console.log(regional, match, alliance, team);

        await db
          .collection('regional')
          .doc(regional)
          .collection('matches')
          .doc(match)
          .collection(alliance)
          .doc(team)
          .set(data['data']);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);



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
    <>
      <section className = "bg-purple-900" id="title">
        <h1 className="text-5xl text-red-50">Super Scout</h1>
        <h2 className="text-2xl text-red-50">Home</h2>
        <hr />
      </section>
      <Link to="/scanner">Scanner</Link>
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
            <input type = "number" id="team 1" min="1" className="input"/>
            <input type = "number" id="team 2" min="1" className="input"/>
            <input type = "number" id="team 3" min="1" className="input"/>
          
          <button>Generate QR Code</button>
          
        </form>
      </div>
      {/* <ul>
        {qrcodes.map((i, qrcode) => (
          <li key={i}>{qrcode}</li>
        ))}
      </ul> */}

      {qrcode}

    </>
  );
}
function genQrCode (matchNum, regional, alliance, team1, team2, team3)
{
  
  let json = `${matchNum}@${regional}:${alliance}[${team1},${team2},${team3}]`;
  console.log( json );
  
  return (
    <QRCode value={json} />
  );
}

export default Home;
