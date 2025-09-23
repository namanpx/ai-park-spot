# Park-Prabandh Smart Parking Management System

A comprehensive React TypeScript frontend application for managing smart parking systems with OpenCV integration and real-time features.

## 🚀 Features

- **Real-time Parking Management**: Live slot status updates via WebSocket
- **OpenCV Integration**: Computer vision-based slot detection and violation monitoring
- **FASTag Integration**: Quick payment and authentication
- **Multi-role Support**: Public, User, Admin, and Security roles
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Progressive Web App**: PWA support for mobile installation

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Redux Toolkit + React Query
- **Routing**: React Router v6 with lazy loading
- **Real-time**: Socket.io client
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts for analytics
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── shared/        # Reusable components (Button, Modal, Table, Chart)
│   ├── layout/        # Header, Footer, Sidebar, Navigation
│   └── features/      # ParkingGrid, CameraFeed, BookingForm, PaymentForm
├── pages/            # All 15 page components
├── hooks/            # Custom React hooks for WebSocket, OpenCV, API
├── services/         # API client, WebSocket service, OpenCV integration
├── store/            # Redux Toolkit store configuration
├── types/            # TypeScript interfaces and types
├── utils/            # Helper functions and constants
└── styles/           # Global CSS and Tailwind configuration
```

## 📄 Pages Overview

### Public Pages (3)
1. **Homepage (/)** - Hero section with live stats and features
2. **Login (/login)** - User authentication with FASTag integration
3. **Register (/register)** - User registration with vehicle details

### User Dashboard Pages (7)
4. **User Dashboard (/dashboard)** - Overview with quick stats and recommendations
5. **Live Parking Map (/parking-map)** - Interactive map with real-time slot status
6. **Slot Booking (/book-slot)** - Booking system with availability and pricing
7. **Payment Gateway (/payment)** - Multi-method payment with FASTag support
8. **My Bookings (/my-bookings)** - Booking history and management
9. **Profile Management (/profile)** - User profile and vehicle management
10. **Notifications (/notifications)** - Real-time notifications and alerts

### Admin Dashboard Pages (5)
11. **Admin Dashboard (/admin)** - System overview and monitoring
12. **Slot Management (/admin/slots)** - Parking slot configuration and management
13. **Analytics Dashboard (/admin/analytics)** - Revenue, occupancy, and usage analytics
14. **User Management (/admin/users)** - User administration and role management
15. **Violation Detection (/admin/violations)** - OpenCV-based violation monitoring

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd park-prabandh
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Configure your API endpoints and keys
```

4. **Start the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🌐 API Integration

The application connects to a backend API with the following endpoints:

- **Authentication**: `/api/auth/*`
- **Parking Management**: `/api/parking/*`
- **Bookings**: `/api/bookings/*`
- **Payments**: `/api/payments/*`
- **OpenCV Integration**: `/api/opencv/*`
- **Admin Functions**: `/api/admin/*`

## 🔌 WebSocket Events

Real-time features are powered by Socket.io with these events:

- `slot-status-update`: Live parking slot status changes
- `user-notification`: Personal notifications
- `violation-alert`: Security violation alerts
- `booking-update`: Booking status changes
- `payment-status`: Payment confirmation/failure
- `camera-status`: Camera feed status updates
- `stats-update`: System statistics updates

## 📱 OpenCV Integration

Computer vision features include:

- **Slot Detection**: Automatic vehicle presence detection
- **License Plate Recognition**: Vehicle identification
- **Violation Monitoring**: Unauthorized parking detection
- **Real-time Feeds**: Live camera streaming
- **Detection Zones**: Configurable monitoring areas

## 🎨 Design System

Custom Tailwind CSS configuration with:

- **Color Palette**: Primary, Secondary, Success, Warning, Danger
- **Typography**: Inter font family with consistent sizing
- **Components**: Reusable UI components with variants
- **Animations**: Smooth transitions and loading states
- **Responsive**: Mobile-first approach with breakpoints

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions for user types
- **Route Protection**: Protected routes based on authentication
- **Input Validation**: Client-side and server-side validation
- **XSS Protection**: Sanitized user inputs

## 📊 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Responsive images with lazy loading
- **Caching**: React Query for API response caching
- **Virtual Scrolling**: Efficient large list rendering
- **Bundle Optimization**: Optimized Vite build configuration

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

The application can be deployed to various platforms:

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```bash
docker build -t park-prabandh-frontend .
docker run -p 3000:3000 park-prabandh-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React TypeScript specialists
- **UI/UX Design**: Modern design system implementation
- **Backend Integration**: API and WebSocket connectivity
- **DevOps**: Deployment and optimization

## 📞 Support

For support and questions:
- Email: support@park-prabandh.com
- Documentation: [docs.park-prabandh.com](https://docs.park-prabandh.com)
- Issues: [GitHub Issues](https://github.com/your-org/park-prabandh/issues)

---

**Park-Prabandh** - Smart Parking Management Made Simple 🅿️