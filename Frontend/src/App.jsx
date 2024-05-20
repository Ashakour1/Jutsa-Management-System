import "./App.css";
import Footer from "./component/Footer";
import Benefits from "./pages/benefits";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./pages/Hero-section";

function App() {
  return (
    <>
      <Router>
        <Header />
        <HeroSection/>
        {/* <Benefits /> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
