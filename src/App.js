import Layout from "./component/layout/layout";
import "./asset/style/style.css"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./pages/authPage/Login";
import RegisterPage from "./pages/authPage/Register";
import { useEffect } from "react";
function App() {
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      if (location.pathname == "/auth/login" || location.pathname == "/auth/signup") {
      } else {
        navigate('/auth/login')
      }
    }
  }, [])
  return (
    <div>
      {
        localStorage.getItem('token') ? <Layout /> : (
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<RegisterPage />} />
          </Routes>
        )
      }
    </div>
  );
}

export default App;
