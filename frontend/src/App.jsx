import React from "react";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import Researcher from "./pages/Researcher";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hospital from "./pages/Hospital";
import MintNft from "./pages/MintNft";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Patient" element={<Patient />}></Route>

          <Route path="/Hospital" element={<Hospital />}></Route>
          <Route path="/Researcher" element={<Researcher />}></Route>
          <Route path="/Hospital/Mint" element={<MintNft />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
