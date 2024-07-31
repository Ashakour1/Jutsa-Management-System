import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import About from "./pages/about";
import Benefits from "./pages/benefits";
import CallToAction from "./pages/Call-to-action";
import FAQPage from "./pages/FAQ-page";
import HeroSection from "./pages/Hero-section";
import NotFound from "./pages/not-found";
import RegisterPage from "./pages/Register-page";

// Layout with header and footer

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <HelmetProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <CallToAction />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            ء
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about/faq" element={<FAQPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
