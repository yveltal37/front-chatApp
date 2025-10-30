import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;
