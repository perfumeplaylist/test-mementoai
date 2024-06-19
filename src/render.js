import React from "react";
import { createRoot } from "react-dom/client";
import App from "./index";
import "./main.css";

const app = document.getElementById("root");

createRoot(app).render(<App />);
