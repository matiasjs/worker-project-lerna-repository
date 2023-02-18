import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RolesEnum } from "shared-workers";
import Home from "./components/GlobalComponents/Home";
import LoginForm from "./components/GlobalComponents/LoginForm";
import RegisterPage from "./pages/Register";

// TODO: move this to another file
function ProtectedRoute({ children, user }: any) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/register/worker"
          element={<RegisterPage rol={RolesEnum.worker} />}
        />
        <Route
          path="/register/user"
          element={<RegisterPage rol={RolesEnum.user} />}
        />
        <Route
          path="/register/business"
          element={<RegisterPage rol={RolesEnum.business} />}
        />
        <Route
          index
          path="/projects"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
