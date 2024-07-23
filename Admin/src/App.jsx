import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Login from "./pages/Login";
import NotFound from "./pages/not-found";
import Signup from "./pages/Signup";

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
              path="/signup"
              element={
                <LoginAndSignLayout>
                  <Signup />
                </LoginAndSignLayout>
              }
            />
            <Route
              path="/"
              element={
                <LoginAndSignLayout>
                  <Login />
                </LoginAndSignLayout>
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
