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
import './App.css';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <ErrorBoundary>
      <LoadingProvider>
        <BrowserRouter>
        <Routes>
        {/* Rota de Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />

        {/* Rota inicial - redireciona para login se não autenticado */}
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
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>🏢 Estabelecimentos</h1>
                <p>Página em desenvolvimento...</p>
              </div>
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

        {/* Rota padrão - redireciona para login ou home */}
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
