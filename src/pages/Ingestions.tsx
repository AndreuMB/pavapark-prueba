import { useEffect, useState } from "react";
import SensorUpdate from "../components/SensorUpdate";
import { useAuth } from "../components/AuthProvider";
import {
  addIngestion,
  getIngestionsBySensor,
  type IngestionRecord,
} from "../api/ingestions";
import { useNavigate, useParams } from "react-router";

export default function Ingestions() {
  const [error, setError] = useState<string | null>(null);
  const [ingestions, setIngestions] = useState<IngestionRecord[]>([]);
  const [useremail] = useState<string>("");
  const { sensorId } = useParams(); // sensorid from URL
  const auth = useAuth();
  const navigation = useNavigate();

  if (!sensorId) {
    return "no sensor";
  }

  const fetchIngestions = async () => {
    try {
      const data = await getIngestionsBySensor(sensorId);
      console.log("ingestionsRecords = ", data);

      setIngestions(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchIngestions();
  }, [sensorId]);

  const handleAddIngestion = async () => {
    await addIngestion(sensorId);
    fetchIngestions();
  };

  return (
    <>
      <button onClick={() => navigation("/sensors")}>BACK</button>
      <p>
        Sensor ID <span>{sensorId}</span>{" "}
      </p>
      <button onClick={handleAddIngestion}>ADD INGESTION</button>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Error Message</th>
            <th>Records</th>
            <th>Started</th>
            <th>Finished</th>
            {/* <th>Created</th> */}
            {/* <th>Updated</th> */}
          </tr>
        </thead>

        <tbody>
          {ingestions.length > 0 &&
            ingestions.map((ingestion) => (
              <tr key={ingestion._id}>
                <td>{ingestion.status}</td>
                <td>{ingestion.errorMessage}</td>
                <td>{ingestion.recordsProcessed}</td>
                <td>{ingestion.startedAt}</td>
                <td>{ingestion.finishedAt}</td>
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
