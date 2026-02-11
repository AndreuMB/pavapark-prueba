import { useEffect, useState } from "react";
import { getSensors, type Sensor } from "../api/sensors";

export default function SensorsTable() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSensors = async () => {
      const sensors = await getSensors();
      if (sensors) setSensors(sensors);
    };
    fetchSensors();
  }, []);

  if (loading) return <p>Loading sensors…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
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
          <tr key={sensor.sensorCode}>
            <td>{sensor.name}</td>
            <td>{sensor.sensorCode}</td>
            <td>{sensor.status ? "Active" : "Paused"}</td>
            {/* <td>{new Date(sensor.createdAt).toLocaleString()}</td>
            <td>{new Date(sensor.updatedAt).toLocaleString()}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
