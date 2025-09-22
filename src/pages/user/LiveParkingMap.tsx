const LiveParkingMap = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Live Parking Map</h1>
        <p className="text-gray-600 mt-2">Real-time parking slot availability with OpenCV detection</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Interactive Map</h3>
            <p className="mt-1 text-sm text-gray-500">Real-time parking availability map coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveParkingMap;