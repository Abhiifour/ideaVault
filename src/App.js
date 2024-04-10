import logo from "./logo.svg";
import "./App.css";
import Nav from "./pages/Elements/Nav";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Vault from "./pages/Vault";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import Footer from "./pages/Elements/Footer";

function App() {
  return (
    <div className="App bg-gradient-to-r from-blue-200 to-purple-200">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Vault" element={<Vault />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
      <div className="toast">
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </div>
  );
}

export default App;
