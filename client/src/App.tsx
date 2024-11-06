import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import CreateAccount from "./components/pages/CreateAccount";
import ActiveUsers from "./components/pages/ActiveUsers";
import LoginAdminPage from "./components/pages/LoginAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/CA" element={<CreateAccount />}></Route>
          <Route path="/UA" element={<ActiveUsers />}></Route>
          <Route path="/LA" element={<LoginAdminPage />}></Route>
          <Route path="*" element={<Navigate replace to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
