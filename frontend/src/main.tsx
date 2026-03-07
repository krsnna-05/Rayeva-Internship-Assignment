import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Invalid from "./pages/Invalid";
import Navbar from "./components/ui/Layout/Navbar";
import Proposal from "./pages/Proposal";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "proposal",
        element: <Proposal />,
      },
    ],
  },
  {
    path: "*",
    element: <Invalid />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
