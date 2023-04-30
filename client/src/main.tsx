import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Root from "./routes/Root";
import Home from "./routes/Home";
import ErrorPage from "./ErrorPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/chat",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/chat",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
