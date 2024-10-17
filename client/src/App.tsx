import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Navigate replace to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
