import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { createSensor, type Sensor } from "../api/sensors";

export default function SensorForm() {
  const [form, setForm] = useState<Sensor>({
    name: "",
    sensorCode: 0,
    // type: "MANUAL_UPLOAD",
    status: true,
    // url: "",
  });
  const [name, setName] = useState<string>();
  const [sensorCode, setSensorCode] = useState<number>();
  const [status, setStatus] = useState<boolean>();

  const [error, setError] = useState<string>();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    console.log("Form data:", form);
    setError("");

    if (!name || !sensorCode || !status) return;
    try {
      const result = await createSensor(name, sensorCode, status);
      console.log(result);

      // navigate("/sensors");
    } catch (err) {
      setError("User not found");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label>Name</label>
        <input name="name" value={name} />
      </div>

      {/* Sensor Code */}
      <div>
        <label>Sensor Code</label>
        <input type="number" name="sensorCode" value={sensorCode} />
      </div>

      {/* Type
      <div>
        <label>Type</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="MANUAL_UPLOAD">Manual Upload</option>
          <option value="HTTP_POLL">HTTP Poll</option>
        </select>
      </div> */}

      {/* Status */}
      <div>
        <label>Status</label>
        <input type="checkbox" name="status" checked={status}></input>
      </div>

      {/* URL (solo HTTP_POLL)
      {form.type === "HTTP_POLL" && (
        <div>
          <label>URL</label>
          <input name="url" value={form.url} onChange={handleChange} />
          {errors.url && <p>{errors.url}</p>}
        </div>
      )} */}

      <button type="submit">Save</button>
    </form>
  );
}
