import React, { useEffect } from "react";
import QrReader from "react-qr-reader";
import { db } from "../firebase";
import { Button, Heading, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";
const QRScanner = () => {
  const [data, setData] = React.useState([]);
  const [scan, setScan] = React.useState(false);

  useEffect(() => {
    const storedMatches = JSON.parse(localStorage.getItem("matches"));
    if (storedMatches) setData(storedMatches);
  }, []);

  function uploadData() {
    data.forEach((match) => {
      console.log(match.data.regional + "");
      db.collection("regional")
        .doc(match.data.regional)
        .collection("matches")
        .doc(match.data.matchNum + "")
        .collection(match.data.alliance)
        .doc(match.data.teamNum + "")
        .set({ data: match.data });
      db.collection("regional")
        .doc(match.data.regional)
        .collection("matches")
        .doc(match.data.matchNum + "")
        .set({});

      db.collection("regional")
        .doc(match.data.regional)
        .collection("teams")
        .doc(match.data.teamNum + "")
        .collection("matches")
        .doc(match.data.matchNum + "")
        .set({ data: match.data });
      db.collection("regional")
        .doc(match.data.regional)
        .collection("teams")
        .doc(match.data.teamNum + "")
        .set({});

      db.collection("regional")
        .doc(match.data.regional)
        .collection("raw")
        .doc(match.data.minfo + match.data.teamNum)
        .set(match.data);
    });

    setData([]);
    localStorage.setItem("matches", JSON.stringify(data));
  }

  return (
    <div>
      {!scan ? (
        <Button onClick={() => setScan(true)}>Scan</Button>
      ) : (
        <Button onClick={() => setScan(false)}>Cancel</Button>
      )}
      {data.length && (
        <Button onClick={uploadData} colorScheme="green">
          Upload Matches
        </Button>
      )}
      {scan && (
        <QrReader
          delay={300}
          onError={(err) => {
            console.error(err);
          }}
          onScan={(str) => {
            if (str) {
              setData([...data, { data: JSON.parse(str).data }]);
              setScan(!scan);
              localStorage.setItem(
                "matches",
                JSON.stringify([...data, { data: JSON.parse(str).data }])
              );
            }
          }}
        />
      )}
      {data.length ? (
        <>
          <Heading as="h4">Matches to be Uploaded</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Match #</Th>
                <Th>Team #</Th>
              </Tr>
            </Thead>
            <tbody>
              {data.map((match) => (
                <Tr>
                  <Td>{match.data.matchNum}</Td>
                  <Td>{match.data.teamNum}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default QRScanner;
