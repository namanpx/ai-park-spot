import { Routes, Route } from 'react-router-dom';

const SimpleHomepage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Park-Prabandh - Smart Parking System</h1>
      <p>Welcome to our smart parking management system!</p>
      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', marginRight: '10px' }}>Login</button>
        <button style={{ padding: '10px 20px' }}>Register</button>
      </div>
    </div>
  );
};

const SimpleFallback = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

const TestAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SimpleHomepage />} />
      <Route path="*" element={<SimpleFallback />} />
    </Routes>
  );
};

export default TestAppRoutes;