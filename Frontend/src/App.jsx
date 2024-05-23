import "./App.css";
import Footer from "./component/Footer";
import Benefits from "./pages/benefits";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./pages/Hero-section";

import CallToAction from "./pages/Call-to-action";
import NotFound from "./pages/not-found";

function App() {
  return (
    <>
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
                <Footer />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
