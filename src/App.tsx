import React from "react";
import NavBar from "./components/navbar/navbar.component";
import Home from "./pages/home/home-page.component";
import { Routes, Route } from "react-router-dom";
import Characters from "./pages/characters/characters-page.component";
import Episodes from "./pages/episodes/episodes-page.component";
import Locations from "./pages/locations/locations-page.componen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="characters" element={<Characters />} />
        <Route path="episodes" element={<Episodes />} />
        <Route path="locations" element={<Locations />} />
      </Route>
    </Routes>
  );
}

export default App;
