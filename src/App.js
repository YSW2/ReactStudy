import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./utils/Navbar";
import Todo from "./views/todo/Todo";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
