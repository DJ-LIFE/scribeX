import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { NewStory } from "./pages/NewStory";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthPage from "./pages/AuthForm";
import { AppContext } from "./context/AppContext";
import { Toaster } from "sonner";
import { UpdateStory } from "./pages/UpdateStory";
function App() {
  const {isSigned} = useContext(AppContext);
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isSigned ? <LandingPage/> : <HomePage />} />
          <Route path="/new-story" element={<NewStory />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path="/update" element={<UpdateStory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
