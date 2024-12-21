import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./components/Landing";
import UserForm from "./components/RegisterForm";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import FileListData from "./components/FileListData";
import Navbar from "./components/Navbar";
import DropZone from "./components/DropZone";

function App() {
  const [isAuth, setIsAuth] = useState();
  const [activeUserId, setActiveUserId] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [token]);
  return (
    <div>
      <Router>
        <Routes>  
          <Route index path="/" element={<RegisterForm />} />
          <Route index path="/register" element={<RegisterForm />} />
          {token ? (
            <Route path="/home" element={<Landing />} />
          ) : (
            <Route path="/register" element={<RegisterForm />} />
          )}
          <Route
            index
            path="/login"
            element={
              <LoginForm
                activeUserId={activeUserId}
                setActiveUserId={setActiveUserId}
              />
            }
          />
          <Route path="/drop" element={<DropZone />} />
          <Route path="/home" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
