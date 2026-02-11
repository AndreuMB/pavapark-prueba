import { useEffect, useState } from "react";
import SensorUpdate from "../components/SensorUpdate";
import { useAuth } from "../components/AuthProvider";
import {
  addIngestion,
  getIngestionsBySensor,
  type Ingestion,
} from "../api/ingestions";
import { useParams } from "react-router";

export default function Ingestions() {
  const [error, setError] = useState<string | null>(null);
  const [ingestions, setIngestions] = useState<Ingestion[]>([]);
  const [useremail] = useState<string>("");
  const { sensorId } = useParams(); // grabs :sensorId from URL
  const auth = useAuth();
  const handleLogout = () => {
    auth.logoutUser();
  };
  const fetchIngestions = async () => {
    try {
      const data = await getIngestionsBySensor(sensorId!);
      console.log(data);

      setIngestions(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchIngestions();
  }, [sensorId]);

  const handleAddIngestion = async () => {
    await addIngestion(sensorId!, 25.4);
    fetchIngestions();
  };

  return (
    <>
      <button onClick={handleLogout}>LOGOUT</button>
      <h1>{useremail}</h1>
      <button onClick={handleAddIngestion}>ADD INGESTION</button>
      <table>
        <thead>
          <tr>
            <th>Sensor Code</th>
            <th>Value C</th>
            {/* <th>Created</th> */}
            {/* <th>Updated</th> */}
          </tr>
        </thead>

        <tbody>
          {ingestions.length > 0 &&
            ingestions.map((ingest) => (
              <tr key={ingest._id}>
                <td>{ingest.sensorCode}</td>
                <td>{ingest.valueC}</td>
                {/* <td>{ingesta.sensorCode}</td>
              <td>{ingesta.status ? "Active" : "Paused"}</td>
              <td>
                <button onClick={() => setSensorId(ingesta._id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDeleteSensor(sensor._id)}>
                  Delete
                </button>
              </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
