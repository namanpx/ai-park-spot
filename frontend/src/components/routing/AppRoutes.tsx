import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserRole } from '../../types/auth';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorBoundary from '../shared/ErrorBoundary';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { 
  Homepage, 
  LoginPage, 
  RegisterPage,
  UserMobileLogin,
  AdminLogin,
  Dashboard,
  LiveParkingMap,
  SlotBooking,
  PaymentGateway,
  MyBookings,
  ProfileManagement,
  NotificationsPage,
  AdminDashboard,
  SlotManagement,
  AnalyticsDashboard,
  UserManagement,
  ViolationDetection
} from './LazyPages';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAuth = false, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && (!isAuthenticated || user?.role !== UserRole.ADMIN)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Suspense 
            fallback={
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="lg" />
                </div>
              }
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Homepage />} />
                
                {/* Auth Routes */}
                <Route 
                  path="/login" 
                  element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
                  } 
                />
                <Route 
                  path="/user-login" 
                  element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <UserMobileLogin />
                  } 
                />
                <Route 
                  path="/admin-login" 
                  element={
                    isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLogin />
                  } 
                />

                {/* Protected User Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute requireAuth>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/parking-map" 
                  element={
                    <ProtectedRoute requireAuth>
                      <LiveParkingMap />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/slot-booking" 
                  element={
                    <ProtectedRoute requireAuth>
                      <SlotBooking />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payment" 
                  element={
                    <ProtectedRoute requireAuth>
                      <PaymentGateway />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/my-bookings" 
                  element={
                    <ProtectedRoute requireAuth>
                      <MyBookings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute requireAuth>
                      <ProfileManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/notifications" 
                  element={
                    <ProtectedRoute requireAuth>
                      <NotificationsPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAuth requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/slots" 
                  element={
                    <ProtectedRoute requireAuth requireAdmin>
                      <SlotManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/analytics" 
                  element={
                    <ProtectedRoute requireAuth requireAdmin>
                      <AnalyticsDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <ProtectedRoute requireAuth requireAdmin>
                      <UserManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/violations" 
                  element={
                    <ProtectedRoute requireAuth requireAdmin>
                      <ViolationDetection />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 Route */}
                <Route 
                  path="*" 
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                        <p className="text-gray-600 mb-8 max-w-md">
                          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                        </p>
                        <div className="space-x-4">
                          <button
                            onClick={() => window.history.back()}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            Go Back
                          </button>
                          <button
                            onClick={() => window.location.href = '/'}
                            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                          >
                            Go Home
                          </button>
                        </div>
                      </div>
                    </div>
                  } 
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </ErrorBoundary>
  );
};

export default AppRoutes;