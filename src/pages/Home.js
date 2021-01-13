import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import QRInput from "./QRInput";



function Home() {

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

  return (
    <>
      <section className = "bg-purple-900" id="title">
        <h1 className="text-5xl text-red-50">Super Scout</h1>
        <h2 className="text-2xl text-red-50">Home</h2>
      </section>
      
      <Link to="/scanner">Scanner</Link>
      <QRInput />
      {/* <ul>
        {qrcodes.map((i, qrcode) => (
          <li key={i}>{qrcode}</li>
        ))}
      </ul> */}

    </>
  );
}

export default Home;
