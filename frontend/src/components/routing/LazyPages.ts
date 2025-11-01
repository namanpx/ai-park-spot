import { lazy } from 'react';

// Lazy load all page components for code splitting
// Public pages
export const Homepage = lazy(() => import('../../pages/Homepage'));
export const LoginPage = lazy(() => import('../../pages/auth/LoginPage'));
export const RegisterPage = lazy(() => import('../../pages/auth/RegisterPage'));
export const UserMobileLogin = lazy(() => import('../../pages/auth/UserMobileLogin'));
export const AdminLogin = lazy(() => import('../../pages/auth/AdminLogin'));

// User dashboard pages
export const Dashboard = lazy(() => import('../../pages/user/Dashboard'));
export const LiveParkingMap = lazy(() => import('../../pages/user/LiveParkingMap'));
export const SlotBooking = lazy(() => import('../../pages/user/SlotBooking'));
export const PaymentGateway = lazy(() => import('../../pages/user/PaymentGateway'));
export const MyBookings = lazy(() => import('../../pages/user/MyBookings'));
export const ProfileManagement = lazy(() => import('../../pages/user/ProfileManagement'));
export const NotificationsPage = lazy(() => import('../../pages/user/NotificationsPage'));

// Admin pages
export const AdminDashboard = lazy(() => import('../../pages/admin/AdminDashboard'));
export const SlotManagement = lazy(() => import('../../pages/admin/SlotManagement'));
export const AnalyticsDashboard = lazy(() => import('../../pages/admin/AnalyticsDashboard'));
export const UserManagement = lazy(() => import('../../pages/admin/UserManagement'));
export const ViolationDetection = lazy(() => import('../../pages/admin/ViolationDetection'));