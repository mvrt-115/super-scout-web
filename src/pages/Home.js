// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
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
            startLocations: "true,false,false",
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
            comments: "",
            minfo: "31@CASF:b[31,75,95]",
            sctid: 0,
          },
          verif: 9613,
        };

        const minfo = data["data"]["minfo"];

        const regional = minfo.substring(
          minfo.indexOf("@") + 1,
          minfo.indexOf(":")
        );
        const match = data["data"]["matchNum"] + "";
        const isBlueAlliance =
          minfo.substring(minfo.indexOf(":") + 1, minfo.indexOf("[")) === "b";
        const alliance = isBlueAlliance ? "blue" : "red";
        const team = data["data"]["teamNum"] + "";

        console.log(regional, match, alliance, team);

        await db
          .collection("regional")
          .doc(regional)
          .collection("matches")
          .doc(match)
          .collection(alliance)
          .doc(team)
          .set(data["data"]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="bg-purple-900 p-3" id="title">
        <h1 className="text-5xl text-blue-300	">Super Scout</h1>
        <div className="flex flex-row space-x-4">
          <h2 className="text-2xl text-blue-300	">Home</h2>
          <Link
            className="text-2xl no-underline hover:underline text-yellow-300"
            to="/scanner"
          >
            Scanner
          </Link>
        </div>
      </section>

      <div>
        <QRInput />
        {/* <ul>
        {qrcodes.map((i, qrcode) => (
          <li key={i}>{qrcode}</li>
        ))}
      </ul> */}
      </div>
    </div>
  );
}

export default Home;
