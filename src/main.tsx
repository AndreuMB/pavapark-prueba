import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import Login from "./pages/Login.tsx";
import SensorForm from "./components/SensorForm.tsx";
import Sensors from "./pages/Sensors.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { AuthProvider, useAuth } from "./components/AuthProvider.tsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <ProtectedRoute>
  //       <Login />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/sensors",
    element: (
      <ProtectedRoute>
        <Sensors />
      </ProtectedRoute>
    ),
  },
  {
    path: "/createSensor",
    element: (
      <ProtectedRoute>
        <SensorForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Login />,
  },
  // {
  //   path: "/sensors",
  //   element: <Sensors />,
  // },
  // {
  //   path: "/createSensor",
  //   element: <SensorForm />,
  // },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
