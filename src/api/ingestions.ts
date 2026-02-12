export type IngestionRecord = {
  _id: string;
  status: string;
  errorMessage: string;
  recordsProcessed: string;
  startedAt: string;
  finishedAt: string;
  sensorId: string;
};

export type Ingestion = {
  _id: string;
  sensorCode: string;
  ts: string;
  valueC: number;
};

export async function addIngestion(sensorId: string) {
  const res = await fetch(`http://localhost:3000/sensors/${sensorId}/ingest/`);

  if (!res.ok) {
    throw new Error("Invalid ingestion");
  }

  return res.json();
}

export async function getIngestionsBySensor(sensorId: string) {
  const res = await fetch(
    `http://localhost:3000/sensors/${sensorId}/ingestions`,
  );

  if (!res.ok) {
    throw new Error("Invalid ingestion");
  }

  return res.json();
}
