import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Game from "./pages/Game";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
