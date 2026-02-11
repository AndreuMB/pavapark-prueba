import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  createSensor,
  getSensor,
  updateSensor,
  type Sensor,
} from "../api/sensors";

export default function SensorForm({
  id,
  onUpdated,
}: {
  id: string;
  onUpdated: (sensor: Sensor) => void;
}) {
  //   const [form, setForm] = useState<Sensor>({
  //     name: "",
  //     sensorCode: 0,
  //     // type: "MANUAL_UPLOAD",
  //     status: true,
  //     // url: "",
  //   });
  const [name, setName] = useState<string>();
  const [sensorCode, setSensorCode] = useState<number>();
  const [status, setStatus] = useState<boolean>();

  const [error, setError] = useState<string>();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Form data:", name);
    console.log("Form data:", sensorCode);
    console.log("Form data:", status);
    // console.log("Form data:", form);
    setError("");

    if (!name || !sensorCode || status === undefined) {
      setError("bad data");
      return;
    }

    try {
      const result = await updateSensor(id, name, sensorCode, status);
      console.log(result);
      if (result) onUpdated(result);
      // navigate("/sensors");
    } catch (err) {
      setError("Sensor error updating");
    }
  };

  const fetchSensor = async () => {
    const sensor = await getSensor(id);
    if (sensor) {
      setName(sensor.name);
      setSensorCode(sensor.sensorCode);
      setStatus(sensor.status);
    }
  };

  useEffect(() => {
    fetchSensor();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label>Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Sensor Code */}
      <div>
        <label>Sensor Code</label>
        <input
          type="number"
          name="sensorCode"
          value={sensorCode}
          onChange={(e) => setSensorCode(Number(e.target.value))}
          required
        />
      </div>

      {/* Status */}
      <div>
        <label>Status</label>
        <input
          type="checkbox"
          name="status"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        ></input>
      </div>

      <button type="submit">Save</button>
      {error}
    </form>
  );
}
