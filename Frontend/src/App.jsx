import "./App.css";
import Footer from "./component/Footer";
import Benefits from "./pages/benefits";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CallToAction from "./pages/Call-to-action";


function App() {
  return (
    <>
      <Router>
        <Header />
        <CallToAction />
        <Benefits />
        <Footer />
      </Router>
    </>
  );
}

export default App;
