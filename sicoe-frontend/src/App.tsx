import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { ProtectedRoute } from '@components/auth';
import { ErrorBoundary } from '@/components/common';
import { LoadingProvider } from '@/contexts/LoadingContext';
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Audit from '@pages/Audit';
import Email from '@pages/Email';
import { EstabHome } from '@pages/EstabHome';
import './App.css';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <ErrorBoundary>
      <LoadingProvider>
        <BrowserRouter>
        <Routes>
        {}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />

        {}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/establishments"
          element={
            <ProtectedRoute>
              <EstabHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit"
          element={
            <ProtectedRoute>
              <Audit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/email"
          element={
            <ProtectedRoute>
              <Email />
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
        />
      </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
