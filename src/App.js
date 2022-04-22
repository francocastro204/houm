import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetalleAves from "./pages/DetalleAves";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aves/:uid" element={<DetalleAves />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
