export type Sensor = {
  _id: string;
  name: string;
  sensorCode: string;
  type: string;
  url?: string;
  status: boolean;
};

export async function createSensor(
  name: string,
  sensorCode: string,
  type: string,
  url: string,
  status: boolean,
) {
  const res = await fetch("http://localhost:3000/sensors/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, sensorCode, type, url, status }),
  });

  if (!res.ok) {
    throw new Error("Invalid sensor");
  }

  return res.json();
}

export async function getSensors(): Promise<Sensor[] | null> {
  const res = await fetch(`http://localhost:3000/sensors/`);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export async function getSensor(id: string): Promise<Sensor | null> {
  const res = await fetch(`http://localhost:3000/sensors/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export async function updateSensor(
  id: string,
  name: string,
  sensorCode: string,
  type: string,
  url: string,
  status: boolean,
): Promise<Sensor | null> {
  const res = await fetch(`http://localhost:3000/sensors/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, sensorCode, type, url, status }),
  });

  if (!res.ok) {
    throw new Error("error updating");
  }

  return res.json();
}

export async function deleteSensor(id: string): Promise<Sensor | null> {
  const res = await fetch(`http://localhost:3000/sensors/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
