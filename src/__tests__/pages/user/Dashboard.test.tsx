import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../../../src/pages/user/Dashboard';
import authSlice from '../../../src/store/slices/authSlice';
import parkingSlice from '../../../src/store/slices/parkingSlice';

// Create a test store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      parking: parkingSlice,
    },
    preloadedState,
  });
};

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

describe('Dashboard Component', () => {
  const mockUser = {
    firstName: 'John',
    fastagId: 'FT123456',
    fastagBalance: 500,
  };

  const mockState = {
    auth: {
      user: mockUser,
      isAuthenticated: true,
    },
    parking: {
      slots: [
        { id: '1', status: 'available' },
        { id: '2', status: 'occupied' },
        { id: '3', status: 'available' },
      ],
    },
  };

  it('should render Find Parking and My Bookings quick actions', () => {
    renderWithProviders(<Dashboard />, { preloadedState: mockState });
    
    // Check that Find Parking card is present
    expect(screen.getByText('Find Parking')).toBeInTheDocument();
    
    // Check that My Bookings card is present
    expect(screen.getByText('My Bookings')).toBeInTheDocument();
  });

  it('should NOT render Book Slot quick action', () => {
    renderWithProviders(<Dashboard />, { preloadedState: mockState });
    
    // Check that Book Slot card is NOT present
    expect(screen.queryByText('Book Slot')).not.toBeInTheDocument();
  });

  it('should render only 2 quick action cards', () => {
    renderWithProviders(<Dashboard />, { preloadedState: mockState });
    
    const quickActionsSection = screen.getByText('Quick Actions').closest('div');
    const actionCards = quickActionsSection?.querySelectorAll('a');
    
    expect(actionCards).toHaveLength(2);
  });

  it('should have correct navigation links for Find Parking and My Bookings', () => {
    renderWithProviders(<Dashboard />, { preloadedState: mockState });
    
    const findParkingLink = screen.getByText('Find Parking').closest('a');
    const myBookingsLink = screen.getByText('My Bookings').closest('a');
    
    expect(findParkingLink).toHaveAttribute('href', '/parking-map');
    expect(myBookingsLink).toHaveAttribute('href', '/my-bookings');
  });
});