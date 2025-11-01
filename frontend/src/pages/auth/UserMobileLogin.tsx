import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { sendOTP, verifyOTP } from '../../store/slices/authSlice';
import Button from '../../components/shared/Button';
import toast from 'react-hot-toast';

const UserMobileLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState(0);

  // Format mobile number as user types
  const formatMobileNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.slice(0, 10);
  };

  const validateMobile = () => {
    const newErrors: Record<string, string> = {};
    
    if (!mobileNumber) {
      newErrors.mobile = 'Mobile number is required';
    } else if (mobileNumber.length !== 10) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    } else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      newErrors.mobile = 'Please enter a valid Indian mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMobileNumber(e.target.value);
    setMobileNumber(formatted);
    if (errors.mobile) {
      setErrors({});
    }
  };

  const handleSendOTP = async () => {
    if (!validateMobile()) return;

    try {
      const result = await dispatch(sendOTP(mobileNumber));
      
      if (sendOTP.fulfilled.match(result)) {
        toast.success('OTP sent successfully!');
        setStep('otp');
        setTimer(60); // Start 60 second timer
        
        // Countdown timer
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(result.payload as string || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus last filled input or first empty
    const lastFilledIndex = Math.min(pastedData.length, 5);
    const targetInput = document.getElementById(`otp-${lastFilledIndex}`);
    targetInput?.focus();
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    try {
      const result = await dispatch(verifyOTP({ mobile: mobileNumber, otp: otpString }));
      
      if (verifyOTP.fulfilled.match(result)) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(result.payload as string || 'Invalid OTP');
        setOtp(['', '', '', '', '', '']); // Clear OTP on error
        const firstInput = document.getElementById('otp-0');
        firstInput?.focus();
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    }
  };

  const handleResendOTP = () => {
    if (timer > 0) return;
    handleSendOTP();
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('mobile');
      setOtp(['', '', '', '', '', '']);
      setTimer(0);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {step === 'mobile' ? 'User Login' : 'Verify OTP'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {step === 'mobile' 
                ? 'Enter your mobile number to receive OTP'
                : `OTP sent to +91 ${mobileNumber}`
              }
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Step 1: Mobile Number */}
          {step === 'mobile' && (
            <div className="space-y-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">+91</span>
                  </div>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobileNumber}
                    onChange={handleMobileChange}
                    className={`pl-14 w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.mobile ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                </div>
                {errors.mobile && (
                  <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>
                )}
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full"
                size="lg"
                loading={isLoading}
                disabled={isLoading}
              >
                Send OTP
              </Button>

              {/* Test Numbers */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Test Numbers:</h3>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setMobileNumber('9315880054')}
                    className="w-full text-left text-xs bg-blue-100 hover:bg-blue-200 p-2 rounded transition-colors"
                  >
                    📱 9315880054 (Abhay)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileNumber('9876543210')}
                    className="w-full text-left text-xs bg-blue-100 hover:bg-blue-200 p-2 rounded transition-colors"
                  >
                    📱 9876543210 (Test User)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <div className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex justify-center space-x-2 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Timer & Resend */}
              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in <span className="font-semibold text-primary-600">{timer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full"
                size="lg"
                loading={isLoading}
                disabled={isLoading || otp.join('').length !== 6}
              >
                Verify & Login
              </Button>

              {/* Test OTP Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800 text-center">
                  💡 <strong>Test Mode:</strong> Use OTP <strong>123456</strong> for any number
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Having trouble?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-primary-600 hover:text-primary-700 font-medium underline"
          >
            Create new account
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserMobileLogin;
