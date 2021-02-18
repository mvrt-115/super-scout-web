import React from 'react';
import QrReader from 'react-qr-reader';
import { DataContext } from "../globalState";
import {db} from '../firebase'
import { Link } from 'react-router-dom';
const QRScanner = () => {
    const [data, setData] = React.useState(React.useContext(DataContext));
    const [scan, setScan] = React.useState(false);
  
    function formatData(str) {
      return {
        match: str.substring(0, str.indexOf('@')),
        regional: str.substring(str.indexOf('@') + 1, str.indexOf(':')),
        alliance: (str.charAt(str.indexOf(':'))  === 'b' ? 'blue' : 'red'),
        team1: str.substring(str.indexOf('[') + 1, str.indexOf(',')),
        team2: str.substring(str.indexOf(',') + 1, str.lastIndexOf(',')),
        team3: str.substring(str.lastIndexOf(',') + 1, str.indexOf(']'))
      }
    }

    function uploadData() {
      console.log(data);
      for(let i = 0;i < data.length;i++) {
        const getData = async () => {
          await db
          .collection("regional")
          .doc(data[i]['regional'])
          .collection("matches")
          .doc(data[i]['match'])
          .collection(data[i]['alliance'])
          .doc(data[i]['team1'])
          .set({data: data[i]['data']});

          await db.collection("regional").doc(data[i]['regional']).collection("teams").doc(data[i]['team1']).collection("matches").doc(data[i]['match']).set({data: data[i]['data']});

          await db.collection("regional").doc(data[i]['regional']).collection("teams").doc(data[i]['team1']).set({});
          
          await db.collection("regional").doc(data[i]['regional']).collection("matches").doc(data[i]['match']).set({}); 
        }
        console.log( data[i] );

       getData();
      }
    }

    return (
        <div className="p-5 pt-2">
          <button className="text-lg p-2 rounded bg-gray-300"><Link to="/">Back To Create QR Code</Link></button>
          <br />
          {!scan &&<button onClick={() => setScan(true)} className="bg-blue-700 text-gray-50 uppercase text-lg font-bold  p-4 rounded center" >Scan</button>}
          {scan && 
            <QrReader
              className="center"
              delay={300}
              onError={(err) => {
                  console.error(err);
              }}
              style={{marginTop: "100%"}}
              onScan={(str) => {
                if(str) {
                  setData([...data, {...formatData(JSON.parse(str).data.minfo), data: JSON.parse(str).data}]);
                  setScan(!scan);
                }
              }}
              
              style={{ width: "50%", alignSelf: "center" }}
          />}
          {data.length ? 
            <>
              <br />
              <button onClick={uploadData} className="text-lg p-2 rounded bg-green-300">Upload Matches</button>
              <ul>
                {data.map(match => (
                  <li>
                    Match # {match.match}
                  </li>
                ))}
              </ul>
            </> : <></>}
        </div>
    )
}
export default QRScanner;