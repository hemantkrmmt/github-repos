import "./App.css";
import { Routes, Route } from "react-router-dom";
import RepoDetails from "./components/RepoDetails";
import Repos from "./components/Repos";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Repos />} />
        <Route path="/details/:id" element={<RepoDetails />} />
      </Routes>
    </div>
  );
}

export default App;
