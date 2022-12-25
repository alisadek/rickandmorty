import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
const Home = lazy(() => import("./pages/home/home-page.component"));
const NavBar = lazy(() => import("./components/navbar/navbar.component"));
const Characters = lazy(
  () => import("./pages/characters/characters-page.component")
);
const Episodes = lazy(() => import("./pages/episodes/episodes-page.component"));
const Locations = lazy(
  () => import("./pages/locations/locations-page.component")
);
const CharacterWiki = lazy(
  () => import("./pages/character-wiki/character-wiki.component")
);

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="characters" element={<Characters />} />
            <Route path="character/:id" element={<CharacterWiki />} />
            <Route path="episodes" element={<Episodes />} />
            <Route path="locations" element={<Locations />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
