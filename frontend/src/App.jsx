import Hospital from "./pages/Hospital";
import Patient from "./pages/Patient";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MintPage from "./pages/MintPage";
import Researcher from "./pages/Researcher";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Hospital" element={<Hospital />}></Route>
          <Route path="/Patient" element={<Patient />}></Route>
          <Route path="/Researcher" element={<Researcher />}></Route>
          <Route path="/Hospital/Mint" element={<MintPage />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
