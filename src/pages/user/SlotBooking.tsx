const SlotBooking = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Slot Booking</h1>
        <p className="text-gray-600 mt-2">Book your parking slot in advance</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Slots</h2>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({length: 20}, (_, i) => (
                <div key={i} className={`p-4 rounded-lg border-2 text-center cursor-pointer transition-colors ${
                  i % 3 === 0 ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50 hover:bg-green-100'
                }`}>
                  <div className="text-sm font-medium">A-{i + 1}</div>
                  <div className={`text-xs mt-1 ${i % 3 === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {i % 3 === 0 ? 'Occupied' : 'Available'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
            <p className="text-gray-500">Select a slot to begin booking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;