import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../Layout/AdminDashboard";
import Random from "../Components/Random";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Random />} />
          <Route path="/docters" element={<Random />} />
          <Route path="/patients" element={<Random />} />
          <Route path="/appointments" element={<Random />} />
          <Route path="/pharmacy" element={<Random />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
