import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Dashboard from "./pages/Dashboard";
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
            <Route path="/" element={<Dashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
