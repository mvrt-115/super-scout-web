import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { db } from '../firebase';

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const regional = 'LAN';
        const match = '79';
        const alliance = 'red';
        const team = '115';
        const data = {
          name: 'hello',
        };
        await db
          .collection(regional)
          .doc(match)
          .collection(alliance)
          .doc(team)
          .set(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>home</h1>
      <Link to="/scanner">Scanner</Link>;
    </>
  );
}

export default Home;
