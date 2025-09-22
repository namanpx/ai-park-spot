const ProfileManagement = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="john.doe@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                Save Changes
              </button>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium">MH01AB1234</div>
                  <div className="text-sm text-gray-600">Honda City - White</div>
                </div>
                <button className="text-red-600 hover:text-red-800">Remove</button>
              </div>
            </div>
            <button className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
              Add Vehicle
            </button>
          </div>
        </div>

        {/* FASTag Section */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">FASTag Account</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">FASTag ID</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="FT123456789" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Balance</span>
                <span className="text-lg font-semibold text-green-600">₹2,500</span>
              </div>
              <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700">
                Recharge FASTag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;