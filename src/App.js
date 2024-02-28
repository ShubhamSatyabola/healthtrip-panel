// src/App.jsx
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"; // Import your existing CSS file for styling
import { Admin } from "./features/admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <Admin></Admin>
    ),
  },
]);
const App = () => {
  return(
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
