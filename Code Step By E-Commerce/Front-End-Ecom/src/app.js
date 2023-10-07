import React from "react";
import "../app.css";
import Header from "./Components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Update from "./Pages/Update/Update";
import AddData from "./Pages/Add/AddData";
import Footer from "./Components/Footer/Footer";
import Signup from "./Pages/Signup/Signup";
import Protected from "./Components/Protected";
import Login from "./Pages/Login/Login";
import PageNotFound from "./404";

function App() {
  return (
    <div>
      <Header />
      <div className="main-body">
        <Routes>
          <Route element={<Protected />}>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddData />} />
            <Route path="/update/:id" element={<Update />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
