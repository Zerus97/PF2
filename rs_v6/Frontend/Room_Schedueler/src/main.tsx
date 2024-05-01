import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
//import App from "./App";
import Login from "./screens/LoginScreen";
import MainMenu from "./screens/MainMenu";
import ErrorPage from "./screens/ErrorPage";
import ReserveScreen from "./screens/ReserveScreen";
import Teste from "./screens/teste";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/main_menu",
    element: <MainMenu></MainMenu>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/reserving",
    element: <ReserveScreen></ReserveScreen>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/teste",
    element: <Teste></Teste>,
    errorElement: <ErrorPage></ErrorPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
