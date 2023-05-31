import React from "react";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import Researcher from "./pages/Researcher";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hospital from "./pages/Hospital";
import Mint from "./pages/Mint";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*toast({
position: "bottom-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});*/

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Patient" element={<Patient />}></Route>

          <Route path="/Hospital" element={<Hospital />}></Route>
          <Route path="/Researcher" element={<Researcher />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        toastClassName="min-w-40"
        className={""}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
