const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your parking slot A-12 has been confirmed for today 10:00 AM',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of ₹150 completed successfully via FASTag',
      time: '1 hour ago',
      read: true
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Parking Reminder',
      message: 'Your booking expires in 30 minutes at slot B-05',
      time: '3 hours ago',
      read: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Stay updated with your parking activities</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
            <button className="text-sm text-primary-600 hover:text-primary-800">Mark all as read</button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div key={notification.id} className={`px-6 py-4 ${!notification.read ? 'bg-blue-50' : ''}`}>
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                  !notification.read ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="mt-2">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      notification.type === 'booking' ? 'bg-green-100 text-green-800' :
                      notification.type === 'payment' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {notification.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 bg-gray-50">
          <button className="text-sm text-primary-600 hover:text-primary-800">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;