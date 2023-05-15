import React from "react";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import Researcher from "./pages/Researcher";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hospital from "./pages/Hospital";
import Mint from "./pages/Mint";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Patient" element={<Patient />}></Route>

          <Route path="/Hospital" element={<Hospital />}></Route>
          <Route path="/Researcher" element={<Researcher />}></Route>
          <Route path="/Hospital/Mint" element={<Mint />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
