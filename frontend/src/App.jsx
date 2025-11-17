import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { TOKEN_KEY, fetchCurrentUser } from "./api";

function App() {
  const [view, setView] = useState("landing");
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) return;
      try {
        await fetchCurrentUser();
      } catch (error) {
        console.warn("Token invalid, logging out");
        handleLogout();
      }
    };
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleRequestAdmin = () => {
    if (isAuthenticated) {
      setView("admin");
    } else {
      setView("login");
    }
  };

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setView("admin");
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setView("landing");
  };

  const renderView = () => {
    if (view === "login") {
      return <LoginPage onSuccess={handleLoginSuccess} />;
    }

    if (view === "admin" && isAuthenticated) {
      return <AdminPanel />;
    }

    return <LandingPage />;
  };

  return (
    <div>
      <Navbar
        currentView={view}
        isAuthenticated={isAuthenticated}
        onRequestAdmin={handleRequestAdmin}
        onGoLanding={() => setView("landing")}
        onLogout={handleLogout}
      />
      {renderView()}
    </div>
  );
}

export default App;
