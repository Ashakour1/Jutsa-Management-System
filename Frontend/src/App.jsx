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
import Login from "./pages/Login";

// Layout with header and footer
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

// Layout without header and footer
const LoginAndSignLayout = ({ children }) => <>{children}</>;

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
                <MainLayout>
                  <HeroSection />
                  <CallToAction />
                  <Benefits />
                </MainLayout>
              }
            />

            <Route
              path="/about"
              element={
                <MainLayout>
                  <About />
                </MainLayout>
              }
            />
            <Route
              path="/login"
              element={
                <LoginAndSignLayout>
                  <Login />
                </LoginAndSignLayout>
              }
            />
            <Route
              path="/register"
              element={
                <MainLayout>
                  <RegisterPage />
                </MainLayout>
              }
            />
            <Route
              path="/about/faq"
              element={
                <MainLayout>
                  <FAQPage />
                </MainLayout>
              }
            />
            <Route
              path="*"
              element={
                <MainLayout>
                  <NotFound />
                </MainLayout>
              }
            />
          </Routes>
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
