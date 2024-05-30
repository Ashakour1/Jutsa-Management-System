import "./App.css";
import Footer from "./component/Footer";
import Benefits from "./pages/benefits";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./pages/Hero-section";
import { Toaster, toast } from "sonner";
import CallToAction from "./pages/Call-to-action";
import NotFound from "./pages/not-found";
import About from "./pages/about";
import RegisterForm from "./component/Register-form";
import RegisterPage from "./pages/Register-page";
import FAQPage from "./pages/FAQ-page";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <HelmetProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <CallToAction />
                  <Benefits />
                </>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about/faq" element={<FAQPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
