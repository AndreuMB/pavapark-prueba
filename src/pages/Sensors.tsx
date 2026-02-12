import { useEffect, useState } from "react";
import { deleteSensor, getSensors, type Sensor } from "../api/sensors";
import SensorUpdate from "../components/SensorUpdate";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router";

export default function SensorsTable() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sensorId, setSensorId] = useState<string | null>(null);
  const [useremail, setUserEmail] = useState<string>("");
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = () => {
    auth.logoutUser();
  };

  const fetchSensors = async () => {
    const sensors = await getSensors();
    if (sensors) setSensors(sensors);
  };

  useEffect(() => {
    fetchSensors();
    setUserEmail(auth.user!.email);
  }, []);

  const handleDeleteSensor = async (e: React.MouseEvent, sensorId: string) => {
    e.stopPropagation();
    await deleteSensor(sensorId);
    fetchSensors();
  };

  const handleSetSensorId = async (e: React.MouseEvent, sensorId: string) => {
    e.stopPropagation();
    setSensorId(sensorId);
  };

  return (
    <>
      <button onClick={handleLogout}>LOGOUT</button>
      <h1>{useremail}</h1>
      <button onClick={() => navigate("/createSensor")}>Add sensor</button>

      <table className="sensorTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sensor Code</th>
            <th>Type</th>
            <th>Status</th>
            {/* <th>Created</th> */}
            {/* <th>Updated</th> */}
          </tr>
        </thead>

        <tbody>
          {sensors.map((sensor) => (
            <tr
              onClick={() => navigate(`${sensor._id}/ingestions`)}
              key={sensor._id}
            >
              <td>{sensor.name}</td>
              <td>{sensor.sensorCode}</td>
              <td>{sensor.type}</td>
              <td>{sensor.status ? "Active" : "Paused"}</td>
              {/* <td>{new Date(sensor.createdAt).toLocaleString()}</td>
            <td>{new Date(sensor.updatedAt).toLocaleString()}</td> */}
              <td>
                <button onClick={(e) => handleSetSensorId(e, sensor._id)}>
                  Update
                </button>
              </td>
              <td>
                <button onClick={(e) => handleDeleteSensor(e, sensor._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sensorId && (
        <SensorUpdate onUpdated={fetchSensors} id={sensorId}></SensorUpdate>
      )}
    </>
  );
}
