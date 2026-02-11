import { useEffect, useState } from "react";
import { deleteSensor, getSensors, type Sensor } from "../api/sensors";
import SensorUpdate from "../components/SensorUpdate";

export default function SensorsTable() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sensorId, setSensorId] = useState<string | null>(null);
  const fetchSensors = async () => {
    const sensors = await getSensors();
    if (sensors) setSensors(sensors);
  };
  useEffect(() => {
    fetchSensors();
  }, []);

  const handleDeleteSensor = async (sensorId: string) => {
    await deleteSensor(sensorId);
    fetchSensors();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sensor Code</th>
            <th>Status</th>
            {/* <th>Created</th> */}
            {/* <th>Updated</th> */}
          </tr>
        </thead>

        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor._id}>
              <td>{sensor.name}</td>
              <td>{sensor.sensorCode}</td>
              <td>{sensor.status ? "Active" : "Paused"}</td>
              {/* <td>{new Date(sensor.createdAt).toLocaleString()}</td>
            <td>{new Date(sensor.updatedAt).toLocaleString()}</td> */}
              <td>
                <button onClick={() => setSensorId(sensor._id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDeleteSensor(sensor._id)}>
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
