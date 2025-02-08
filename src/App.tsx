import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hangman from "./components/Hangman";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./layout/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/hangman-pokemon" element={<Hangman />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
