import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./utils/Navbar";
import Todo from "./views/todo/Todo";
import Weather from "./views/weather/Weather";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/todo" element={<Todo />} />
          <Route exact path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
