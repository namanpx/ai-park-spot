const PaymentGateway = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment Gateway</h1>
        <p className="text-gray-600 mt-2">Secure payment processing with FASTag integration</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">FASTag Payment</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 border border-primary-200 rounded-lg bg-primary-50">
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <div>
                <div className="font-medium text-gray-900">FASTag Balance</div>
                <div className="text-sm text-gray-600">₹2,500</div>
              </div>
            </div>
            <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
              Pay with FASTag
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Payment Methods</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span>Credit/Debit Card</span>
            </button>
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span>UPI</span>
            </button>
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span>Net Banking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;