import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { createSensor, type Sensor } from "../api/sensors";
import { useNavigate } from "react-router";
import { isValidUrl } from "../utils";

export default function SensorForm() {
  // const [form, setForm] = useState<Sensor>({
  //   name: "",
  //   sensorCode: 0,
  //   // type: "MANUAL_UPLOAD",
  //   status: true,
  //   // url: "",
  // });
  const [name, setName] = useState<string>("");
  const [sensorCode, setSensorCode] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [type, setType] = useState<string>("MANUAL_UPLOAD");
  const [url, setUrl] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    setError("");

    if (!name || !sensorCode || !type || status === undefined) {
      console.log(type);
      console.log(status);

      setError("bad data");
      return;
    }

    if (type === "HTTP_POLL" && !isValidUrl(url)) {
      setError("Invalid URL format");
      return;
    }

    try {
      const result = await createSensor(name, sensorCode, type, url, status);
      console.log(result);

      // navigate("/sensors");
      setError("Success");
    } catch (err) {
      setError("sensor error");
    }
  };

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
          type="string"
          name="sensorCode"
          value={sensorCode}
          onChange={(e) => setSensorCode(e.target.value)}
        />
      </div>

      {/* Type */}
      <div>
        <label>Type</label>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="MANUAL_UPLOAD">Manual Upload</option>
          <option value="HTTP_POLL">HTTP Poll</option>
        </select>
      </div>

      {type == "HTTP_POLL" && (
        <div>
          <label>Url</label>
          <input
            name="url"
            type="string"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      )}

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
      <button onClick={() => navigate("/sensors")}>Back</button>

      {error}
    </form>
  );
}
