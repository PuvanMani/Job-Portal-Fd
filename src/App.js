import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
