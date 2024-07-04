import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./utils/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
