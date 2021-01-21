import React from 'react';
import QrReader from 'react-qr-reader';

const QRScanner = () => {
    const [data, setData] = React.useState('')
    const [scan, setScan] = React.useState(false);

    function formatData(str) {
      return "Match #:" + str.substring(0, str.indexOf('@')) + "  " + 
             "Regional: " + str.substring(str.indexOf('@') + 1, str.indexOf(':')) + "  " +
             "Alliance: " + (str.charAt(str.indexOf(':'))  === 'b' ? 'Blue' : 'Red') + "  " +
             "Team 1: " + str.substring(str.indexOf('[') + 1, str.indexOf(',')) + "  " + 
             "Team 2: " + str.substring(str.indexOf(',') + 1, str.lastIndexOf(',')) + "  " +
             "Team 3: " + str.substring(str.lastIndexOf(',') + 1, str.indexOf(']'));
    }

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
                  setData(formatData(str));
                  setScan(true);
                  console.log(data);
                }
              }}
              
              style={{ width: "50%", alignSelf: "center" }}
          />}
          <p>{data}</p>
        </>
    )
}
export default QRScanner;