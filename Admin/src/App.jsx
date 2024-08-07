import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Login from "./pages/Login";
import NotFound from "./pages/not-found";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Signup />} />
            <Route path="/" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
