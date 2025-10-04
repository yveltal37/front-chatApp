import { Routes, Route } from "react-router-dom";
import Signup from "./pages/authentication/Signup";
import Login from "./pages/authentication/Login";
import NavBar from "./components/navBar/NavBar";

import Home from "./pages/home/Home";

function App() {


  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home"  element={<Home />}/>
      <Route path="*" element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;
