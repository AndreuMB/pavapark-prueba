export type Ingestion = {
  _id: string;
  sensorCode: string;
  ts: string;
  valueC: number;
};

export async function addIngestion(sensorCode: string, valueC: number) {
  const res = await fetch("http://localhost:3000/ingestions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sensorCode, valueC }),
  });

  if (!res.ok) {
    throw new Error("Invalid ingestion");
  }

  return res.json();
}

export async function getIngestionsBySensor(sensorCode: string) {
  const res = await fetch(`http://localhost:3000/ingestions/by-sensor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sensorCode }),
  });

  if (!res.ok) {
    throw new Error("Invalid ingestion");
  }

  return res.json();
}
