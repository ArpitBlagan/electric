import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Regsiter from "./page/Regsiter";
import "./App.css";
import Login from "./page/Login";
import { Toaster } from "react-hot-toast";
import VechilePost from "./page/VeichlePost";
import Home from "./page/Home";
import Contexxt from "./Contexxt";
function App() {
  return (
    <Contexxt>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vechile/add" element={<VechilePost />} />
          <Route path="/register" element={<Regsiter />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Contexxt>
  );
}

export default App;
