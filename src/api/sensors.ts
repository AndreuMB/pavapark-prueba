export type Sensor = {
  name: string;
  sensorCode: number;
  status: boolean;
};

export async function createSensor(
  name: string,
  sensorCode: number,
  status: boolean,
) {
  const res = await fetch("http://localhost:3000/sensors/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, sensorCode, status }),
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
