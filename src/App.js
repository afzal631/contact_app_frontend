import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
// import Header from "./components/header/Header";
// import { Login } from "@mui/icons-material";
import Signup from "./components/singup/Signup";

function App() {
  return (
    <div className="App flex justify-center items-center bg-[#2C2A2A] text-white h-screen">
      {/* <Header /> */}
      {/* <Dashboard /> */}
      {/* <p>hello</p> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/homePage" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
