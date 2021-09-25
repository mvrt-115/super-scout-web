import React, { useEffect } from "react";
import QrReader from "react-qr-reader";
import { db } from "../firebase";
import {
  Button,
  Heading,
  IconButton,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
const QRScanner = () => {
  const [data, setData] = React.useState([]);
  const [scan, setScan] = React.useState(false);

  useEffect(() => {
    const storedMatches = JSON.parse(localStorage.getItem("matches"));
    if (storedMatches) setData(storedMatches);
  }, []);

  function uploadData() {
    data.forEach((match) => {
      console.log(match.regional + "");
      db.collection("regional")
        .doc(match.regional)
        .collection("matches")
        .doc(match.matchNum + "")
        .collection(match.alliance)
        .doc(match.teamNum + "")
        .set({ data: match });
      db.collection("regional")
        .doc(match.regional)
        .collection("matches")
        .doc(match.matchNum + "")
        .set({});

      db.collection("regional")
        .doc(match.regional)
        .collection("teams")
        .doc(match.teamNum + "")
        .collection("matches")
        .doc(match.matchNum + "")
        .set({ data: match });
      db.collection("regional")
        .doc(match.regional)
        .collection("teams")
        .doc(match.teamNum + "")
        .set({});

      db.collection("regional")
        .doc(match.regional)
        .collection("raw")
        .doc(match.minfo + match.teamNum)
        .set(match);
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
      {data.length ? (
        <Button onClick={uploadData} colorScheme="green">
          Upload Matches
        </Button>
      ) : (
        <></>
      )}
      {scan && (
        <QrReader
          delay={300}
          onError={(err) => {
            console.error(err);
          }}
          onScan={(str) => {
            if (str) {
              setData([...data, JSON.parse(str)]);
              setScan(!scan);
              localStorage.setItem(
                "matches",
                JSON.stringify([...data, JSON.parse(str)])
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
              {data.map((match, index) => (
                <Tr key={index}>
                  <Td>{match.matchNum}</Td>
                  <Td>{match.teamNum}</Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => {
                      const newData = [...data];
                      newData.splice(index, 1);
                      localStorage.setItem("matches", JSON.stringify(newData));
                      setData(newData);
                    }}
                  />
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
