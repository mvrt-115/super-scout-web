import React from 'react';
import QrReader from 'react-qr-reader';
import {db} from '../firebase'
import { Link } from 'react-router-dom';
const QRScanner = () => {
    const [data, setData] = React.useState([]);
    const [scan, setScan] = React.useState(false);

    function uploadData() {
      data.forEach(match => {
        db.collection("regional").doc(match.data.regional).collection("matches").doc(match.data.matchNum + "").collection(match.data.alliance).doc(match.data.teamNum).set({data: match.data});
        db.collection("regional").doc(match.data.regional).collection("matches").doc(match.data.matchNum + "").set({})
        
        db.collection("regional").doc(match.data.regional).collection("teams").doc(match.data.teamNum  + "").collection("matches").doc(match.data.matchNum + "").set({data: match.data});
        db.collection("regional").doc(match.data.regional).collection("teams").doc(match.data.teamNum  + "").set({});
      });

      setData([]);
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
              onScan={(str) => {
                if(str) {
                  setData([...data, {data: JSON.parse(str).data}]);
                  setScan(!scan);
                }
              }}
              
              style={{ width: "50%", alignSelf: "center"}}
          />}
          {data.length ? 
            <>
              <br />
              <button onClick={uploadData} className="text-lg p-2 rounded bg-green-300">Upload Matches</button>
              <ul>
                {data.map(match => (
                  <li>
                    Match # {match.match}, Team # {match.data.teamNum}
                  </li>
                ))}
              </ul>
            </> : <></>}
        </div>
    )
}
export default QRScanner;