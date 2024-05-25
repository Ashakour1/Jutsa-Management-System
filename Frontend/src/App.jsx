import "./App.css";
import Footer from "./component/Footer";
import Benefits from "./pages/benefits";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./pages/Hero-section";
import { Toaster, toast } from "sonner";
import CallToAction from "./pages/Call-to-action";
import NotFound from "./pages/not-found";
import RegisterForm from "./component/Register-form";
import RegisterPage from "./pages/Register-page";
import FAQPage from "./pages/FAQ-page";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
