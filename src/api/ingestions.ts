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

const API_URL = import.meta.env.VITE_API_URL;

export async function addIngestion(sensorId: string) {
  const res = await fetch(`${API_URL}sensors/${sensorId}/ingest/`);

  if (!res.ok) {
    throw new Error("Invalid ingestion");
  }

  return res.json();
}

export async function getIngestionsBySensor(sensorId: string, limit: number) {
  const res = await fetch(
    `${API_URL}sensors/${sensorId}/ingestions?limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error("Invalid ingestion");
  }

  return res.json();
}
