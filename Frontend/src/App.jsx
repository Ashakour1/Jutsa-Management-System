import "./App.css";
import Footer from "./component/Footer";
import Benefits from "./pages/benefits";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./pages/Hero-section";

import CallToAction from "./pages/Call-to-action";

function App() {
  return (
    <>
      <Router>
        <Header />
        <HeroSection />
        {/* <Benefits /> */}
        <CallToAction />
        <Footer />
      </Router>
    </>
  );
}

export default App;
