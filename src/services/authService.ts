import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  FastagVerification,
  UserRole,
  VehicleType
} from '@/types';

// Dummy users for testing
const DUMMY_USERS: Array<User & {password: string}> = [
  {
    id: '1',
    firstName: 'Abhay',
    lastName: 'Yadav',
    email: 'yadavabhay0054@gmail.com',
    password: '9315880054',
    phone: '+91 9315880054',
    role: UserRole.USER,
    fastagId: 'FT123456789',
    fastagBalance: 1500,
    isVerified: true,
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        showProfile: true,
        shareLocation: false,
      },
      theme: 'light',
      language: 'en',
    },
    vehicles: [
      {
        id: 'v1',
        userId: '1',
        licensePlate: 'MH 12 AB 1234',
        make: 'Toyota',
        model: 'Camry',
        color: 'Blue',
        vehicleType: VehicleType.CAR,
        fastagEnabled: true,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    firstName: 'Admin',
    lastName: 'Abhay',
    email: 'admin.yadavabhay0054@gmail.com',
    password: '9315880054',
    phone: '+91 9315880054',
    role: UserRole.ADMIN,
    fastagId: 'FT987654321',
    fastagBalance: 5000,
    isVerified: true,
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: true,
      },
      privacy: {
        showProfile: true,
        shareLocation: true,
      },
      theme: 'dark',
      language: 'en',
    },
    vehicles: [
      {
        id: 'v2',
        userId: '2',
        licensePlate: 'MH 12 AD 5678',
        make: 'BMW',
        model: 'X5',
        color: 'Black',
        vehicleType: VehicleType.CAR,
        fastagEnabled: true,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@test.com',
    password: 'jane123',
    phone: '+91 9876543230',
    role: UserRole.USER,
    fastagId: 'FT456789123',
    fastagBalance: 800,
    isVerified: true,
    preferences: {
      notifications: {
        email: true,
        push: false,
        sms: true,
      },
      privacy: {
        showProfile: false,
        shareLocation: false,
      },
      theme: 'light',
      language: 'en',
    },
    vehicles: [
      {
        id: 'v3',
        userId: '3',
        licensePlate: 'MH 12 JS 9012',
        make: 'Honda',
        model: 'CBR',
        color: 'Red',
        vehicleType: VehicleType.MOTORCYCLE,
        fastagEnabled: true,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Backup test accounts for quick testing
  {
    id: '4',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@test.com',
    password: 'password123',
    phone: '+91 9876543210',
    role: UserRole.USER,
    fastagId: 'FT111111111',
    fastagBalance: 1200,
    isVerified: true,
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        showProfile: true,
        shareLocation: false,
      },
      theme: 'light',
      language: 'en',
    },
    vehicles: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    firstName: 'Admin',
    lastName: 'Test',
    email: 'admin@test.com',
    password: 'admin123',
    phone: '+91 9876543220',
    role: UserRole.ADMIN,
    fastagId: 'FT999999999',
    fastagBalance: 5000,
    isVerified: true,
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: true,
      },
      privacy: {
        showProfile: true,
        shareLocation: true,
      },
      theme: 'dark',
      language: 'en',
    },
    vehicles: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }
];

export interface AuthService {
  login(credentials: LoginRequest): Promise<AuthResponse>;
  register(userData: RegisterRequest): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  updateProfile(userData: Partial<User>): Promise<User>;
  verifyFastag(fastagId: string): Promise<FastagVerification>;
  refreshToken(): Promise<{ token: string; refreshToken: string }>;
  resetPassword(email: string): Promise<void>;
  changePassword(oldPassword: string, newPassword: string): Promise<void>;
  verifyEmail(token: string): Promise<void>;
  resendVerificationEmail(): Promise<void>;
}

class AuthServiceImpl implements AuthService {
  private generateToken(user: User): string {
    return `dummy_token_${user.id}_${Date.now()}`;
  }

  private generateRefreshToken(user: User): string {
    return `dummy_refresh_${user.id}_${Date.now()}`;
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = DUMMY_USERS.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Store tokens in localStorage for dummy implementation
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);

    return {
      user: userWithoutPassword,
      token,
      refreshToken,
    };
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = DUMMY_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User & {password: string} = {
      id: `${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      role: UserRole.USER,
      fastagId: userData.fastagId,
      fastagBalance: 0,
      isVerified: false,
      preferences: {
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        privacy: {
          showProfile: true,
          shareLocation: false,
        },
        theme: 'light',
        language: 'en',
      },
      vehicles: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to dummy users (in real app, this would be saved to database)
    DUMMY_USERS.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    const token = this.generateToken(newUser);
    const refreshToken = this.generateRefreshToken(newUser);

    // Store tokens in localStorage for dummy implementation
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);

    return {
      user: userWithoutPassword,
      token,
      refreshToken,
    };
  }

  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  async getCurrentUser(): Promise<User> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    // Extract user ID from token (in real implementation, would verify JWT)
    const userId = token.split('_')[2];
    const user = DUMMY_USERS.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const userId = token.split('_')[2];
    const userIndex = DUMMY_USERS.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update user data
    DUMMY_USERS[userIndex] = { 
      ...DUMMY_USERS[userIndex], 
      ...userData, 
      updatedAt: new Date().toISOString() 
    };
    
    const { password, ...userWithoutPassword } = DUMMY_USERS[userIndex];
    return userWithoutPassword;
  }

  async verifyFastag(fastagId: string): Promise<FastagVerification> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simulate FASTag verification
    return {
      fastagId,
      balance: Math.floor(Math.random() * 5000) + 500,
      isActive: true,
      lastTransaction: new Date().toISOString(),
    };
  }

  async refreshToken(): Promise<{ token: string; refreshToken: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const userId = refreshToken.split('_')[2];
    const user = DUMMY_USERS.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const newToken = this.generateToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    // Update tokens in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }

  async resetPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = DUMMY_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('User with this email does not exist');
    }
    
    // In real implementation, would send reset email
    console.log('Password reset email sent to:', email);
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const userId = token.split('_')[2];
    const userIndex = DUMMY_USERS.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    if (DUMMY_USERS[userIndex].password !== oldPassword) {
      throw new Error('Current password is incorrect');
    }

    DUMMY_USERS[userIndex].password = newPassword;
  }

  async verifyEmail(token: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // In real implementation, would verify the email token
    console.log('Email verified with token:', token);
  }

  async resendVerificationEmail(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 600));
    // In real implementation, would resend verification email
    console.log('Verification email resent');
  }
}

// Export a singleton instance
export const authService = new AuthServiceImpl();
export default authService;