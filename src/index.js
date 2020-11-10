import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom"; // creates a const called render that references react-dom's render function
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
