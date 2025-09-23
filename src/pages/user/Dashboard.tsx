import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import Chart from '../../components/shared/Chart';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { slots } = useSelector((state: RootState) => state.parking);
  
  const [stats] = useState({
    totalBookings: 12,
    activeBookings: 2,
    totalSpent: 1250,
    savedTime: 180
  });

  const availableSlots = slots.filter(slot => slot.status === 'available').length;
  
  // Sample chart data
  const weeklyUsageData = [
    { name: 'Mon', value: 2 },
    { name: 'Tue', value: 1 },
    { name: 'Wed', value: 3 },
    { name: 'Thu', value: 2 },
    { name: 'Fri', value: 4 },
    { name: 'Sat', value: 1 },
    { name: 'Sun', value: 2 }
  ];

  // Sample recent bookings
  const recentBookings = [
    {
      id: '1',
      slotId: 'A-12',
      startTime: '2024-01-20T10:00:00Z',
      totalAmount: 150,
      status: 'active'
    },
    {
      id: '2', 
      slotId: 'B-05',
      startTime: '2024-01-19T14:30:00Z',
      totalAmount: 200,
      status: 'completed'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your parking dashboard with real-time updates and quick actions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.totalSpent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-info-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-info-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Time Saved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.savedTime}m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            {/* Book Slot removed intentionally */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/parking-map"
                className="flex flex-col items-center p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <span className="mt-3 text-sm font-medium text-gray-900">Find Parking</span>
                <span className="text-xs text-gray-500">{availableSlots} spots available</span>
              </Link>

              <Link
                to="/my-bookings"
                className="flex flex-col items-center p-6 bg-warning-50 rounded-lg hover:bg-warning-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-warning-600 rounded-lg flex items-center justify-center group-hover:bg-warning-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="mt-3 text-sm font-medium text-gray-900">My Bookings</span>
                <span className="text-xs text-gray-500">{stats.activeBookings} active</span>
              </Link>
            </div>
          </div>
        </div>

        {/* FASTag Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">FASTag Status</h3>
          {user?.fastagId ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">FASTag ID</span>
                <span className="text-sm font-medium">{user.fastagId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Balance</span>
                <span className="text-sm font-medium text-success-600">
                  ₹{user.fastagBalance || 0}
                </span>
              </div>
              <div className="pt-4 border-t">
                <Link
                  to="/payment"
                  className="w-full bg-primary-600 text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors block"
                >
                  Recharge FASTag
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No FASTag connected</p>
              <Link
                to="/profile"
                className="mt-3 w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors block"
              >
                Link FASTag
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Usage Chart */}
        <div>
          <Chart
            data={weeklyUsageData}
            type="bar"
            title="Weekly Parking Usage"
            height={300}
            colors={['#3B82F6']}
          />
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <Link
              to="/my-bookings"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View all
            </Link>
          </div>
          
          {recentBookings.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No bookings yet</p>
              <Link
                to="/parking-map"
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Find Parking
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      booking.status === 'active' ? 'bg-success-500' :
                      booking.status === 'completed' ? 'bg-gray-400' :
                      'bg-warning-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Slot {booking.slotId}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.startTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{booking.totalAmount}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;