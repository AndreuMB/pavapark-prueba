import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SensorForm from "./components/SensorForm.tsx";
import Sensors from "./pages/Sensors.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sensorForm" element={<SensorForm />} />
        <Route path="/sensors" element={<Sensors />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
