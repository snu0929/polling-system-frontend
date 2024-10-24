import { useState } from "react";

import "./App.css";
import { MainRoute } from "./components/MainRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <MainRoute />
    </>
  );
}

export default App;
