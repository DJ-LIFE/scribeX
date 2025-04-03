import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { NewStory } from "./pages/NewStory";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/new-story" element={<NewStory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
