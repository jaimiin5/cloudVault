import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthRoute from "./context/AuthRoute";
import Login from "./components/auth/Login";
import Signin from "./components/auth/SignIn";
import FileGrid from "./components/FileGrid";
import Layout from "./components/Layout";
import Fallback from "./components/Fallback";

function RootLayout() {
  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />

        {/* secure routes */}
        <Route
          path="/"
          element={
            <AuthRoute>
              <Layout>
                <Home />
              </Layout>
            </AuthRoute>
          }
        />
        <Route
          path="/files"
          element={
            <AuthRoute>
              <Layout>
                <FileGrid />
              </Layout>
            </AuthRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <AuthRoute>{/* make profilecard componenet here*/}</AuthRoute>
          }
        />

        {/* fallback route */}
        <Route path="*" element={<Fallback />} />
      </Routes>
    </Router>
  );
}

export default RootLayout;
