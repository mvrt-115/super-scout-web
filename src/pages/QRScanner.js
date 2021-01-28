import React from 'react';
import QrReader from 'react-qr-reader';
import { DataContext } from "../globalState";
import {db} from '../firebase'
const QRScanner = () => {
    const [data, setData] = React.useState(React.useContext(DataContext));
    const [scan, setScan] = React.useState(false);
  
    function formatData(str) {
      console.log(str.substring(0, str.indexOf('@')));
      return {
        match: str.substring(0, str.indexOf('@')),
        regional: str.substring(str.indexOf('@') + 1, str.indexOf(':')),
        alliance: (str.charAt(str.indexOf(':'))  === 'b' ? 'Blue' : 'Red'),
        team1: str.substring(str.indexOf('[') + 1, str.indexOf(',')),
        team2: str.substring(str.indexOf(',') + 1, str.lastIndexOf(',')),
        team3: str.substring(str.lastIndexOf(',') + 1, str.indexOf(']'))
      }
    }

    function uploadData() {
      console.log( data[0]['regional']);
      for(let i = 0;i < data.length;i++) {
        const getData = async () => {
          await db
          .collection("regional")
          .doc(data[i]['regional'])
          .collection("matches")
          .doc(data[i]['match'])
          .collection(data[i]['alliance'])
          .doc(data[i]['team1'])
          .set({data: data[i]});
        }
        console.log( data[i] );

       // getData();
      }
    }

    function testGetData()
    {
      const getData = async () => { 
        let ref = db.collection("regional").doc("LAN").collection("matches").doc('123').collection("Red").doc('123');
        let doc = await ref.get();
        console.log( 'Data', doc.data() );
      }
      getData();
    }


    React.useEffect(testGetData, []);
    return (
        <>
          <button onClick={() => setScan(true)}>Scan</button>
          {scan && <QrReader
              delay={300}
              onError={(err) => {
                  console.error(err);
              }}
              onScan={(str) => {
                if(str) {
                  setData([...data, formatData(str)]);
                  setScan(!scan);
                }
              }}
              
              style={{ width: "50%", alignSelf: "center" }}
          />}
          {data.length > 1 && <button onClick={uploadData}>Upload</button>}
          <button onClick = {testGetData}>GetData</button>
        </>
    )
}
export default QRScanner;