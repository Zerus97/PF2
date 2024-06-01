import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./screens/LoginScreen";
import MainMenu from "./screens/MainMenu";
import ErrorPage from "./screens/ErrorPage";
import ReserveScreen from "./screens/ReserveScreen";
import AvailableRooms from "./screens/AvailableRooms";
import Teste from "./screens/teste";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/main_menu",
    element: <MainMenu />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reserving",
    element: <ReserveScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/available-rooms",
    element: <AvailableRooms />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/teste",
    element: <Teste />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
