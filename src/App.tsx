import { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Users, LogOut, Shield, UserX, Check, Mail } from 'lucide-react';

const API_URL = 'http://localhost:3000/api';

interface User {
  id: string;
  fullName: string;
  birthDate: string;
  email: string;
  role: 'ADMIN' | 'USER';
  isActive: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Alert Component - Defined outside to prevent re-creation
const Alert = ({ type, message, onClose }: { type: 'error' | 'success', message: string, onClose: () => void }) => (
  <div className={`mb-4 p-4 rounded-lg flex items-center justify-between ${
    type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
  }`}>
    <div className="flex items-center gap-2">
      <AlertCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
    <button onClick={onClose} className="text-xl font-bold hover:opacity-70">&times;</button>
  </div>
);

// Login View Component
const LoginView = ({ 
  loginData, 
  setLoginData, 
  handleLogin, 
  loading, 
  error, 
  success, 
  setError, 
  setSuccess, 
  setView 
}: any) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setView('register');
            setError('');
            setSuccess('');
          }}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  </div>
);

// Register View Component
const RegisterView = ({ 
  registerData, 
  setRegisterData, 
  handleRegister, 
  loading, 
  error, 
  setError, 
  setView 
}: any) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Users className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        <p className="text-gray-600 mt-2">Join us today</p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={registerData.fullName}
            onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
          <input
            type="date"
            value={registerData.birthDate}
            onChange={(e) => setRegisterData({ ...registerData, birthDate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password (min 8 characters)</label>
          <input
            type="password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setView('login');
            setError('');
          }}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  </div>
);

// Verify OTP View Component
const VerifyOTPView = ({ 
  otpData, 
  setOtpData, 
  handleVerifyOTP, 
  loading, 
  error, 
  success, 
  setError, 
  setSuccess, 
  setView 
}: any) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Verify Email</h1>
        <p className="text-gray-600 mt-2">Enter the OTP sent to your email</p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
          <input
            type="text"
            maxLength={6}
            value={otpData.otpCode}
            onChange={(e) => setOtpData({ ...otpData, otpCode: e.target.value.replace(/\D/g, '') })}
            onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest outline-none"
            placeholder="000000"
          />
        </div>

        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setView('login');
            setError('');
          }}
          className="text-green-600 hover:text-green-800 font-medium"
        >
          Back to login
        </button>
      </div>
    </div>
  </div>
);

// Dashboard View Component
const DashboardView = ({ 
  user, 
  users, 
  pagination, 
  loading, 
  error, 
  success, 
  setError, 
  setSuccess, 
  handleLogout, 
  handleBlockUser, 
  fetchUsers 
}: any) => {
  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800">{user?.fullName}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                user?.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-semibold text-gray-800">{user?.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-800">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Birth Date</p>
              <p className="font-semibold text-gray-800">
                {user?.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                user?.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {user?.isActive ? <Check className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                {user?.isActive ? 'Active' : 'Blocked'}
              </span>
            </div>
          </div>
          {user?.isActive && (
            <button
              onClick={() => user && handleBlockUser(user.id)}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              <UserX className="w-4 h-4" />
              Block My Account
            </button>
          )}
        </div>

        {user?.role === 'ADMIN' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Users</h2>
            {loading ? (
              <p className="text-center py-8 text-gray-600">Loading users...</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u: User) => (
                        <tr key={u.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{u.fullName}</td>
                          <td className="py-3 px-4">{u.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              u.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {u.isActive ? 'Active' : 'Blocked'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {u.isActive && (
                              <button
                                onClick={() => handleBlockUser(u.id)}
                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                              >
                                Block
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {users.length} of {pagination.total} users
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fetchUsers(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => fetchUsers(pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [view, setView] = useState<'login' | 'register' | 'verify-otp' | 'dashboard'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    birthDate: '',
    email: '',
    password: ''
  });
  const [otpData, setOtpData] = useState({ userId: '', otpCode: '' });
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ 
    page: 1, 
    limit: 10, 
    total: 0,
    totalPages: 0 
  });

  const apiCall = useCallback(async (
    endpoint: string, 
    method = 'GET', 
    body: any = null, 
    auth = true
  ) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (auth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = { method, headers };
    if (body) {
      config.body = JSON.stringify(body);
    }

    const res = await fetch(`${API_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  }, [token]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const data = await apiCall('/auth/me');
      setUser(data.data);
      setView('dashboard');
    } catch (err) {
      setToken(null);
    }
  }, [apiCall]);

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [token, fetchCurrentUser]);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await apiCall('/auth/login', 'POST', loginData, false);
      setToken(data.data.tokens.accessToken);
      setUser(data.data.user);
      setSuccess('Login successful!');
      setView('dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await apiCall('/auth/register', 'POST', registerData, false);
      setOtpData({ ...otpData, userId: data.data.userId });
      setSuccess('Registration successful! Please check your email for OTP.');
      setView('verify-otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await apiCall('/auth/verify-otp', 'POST', otpData, false);
      setToken(data.data.tokens.accessToken);
      setUser(data.data.user);
      setSuccess('Email verified successfully!');
      setView('dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setView('login');
    setSuccess('Logged out successfully');
  };

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const data = await apiCall(`/users?page=${page}&limit=10`);
      setUsers(data.data.users);
      setPagination(data.data.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const handleBlockUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to block this user?')) return;
    try {
      await apiCall(`/users/${userId}/block`, 'PATCH');
      setSuccess('User blocked successfully');
      if (user?.role === 'ADMIN') {
        fetchUsers(pagination.page);
      } else {
        handleLogout();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      {view === 'login' && (
        <LoginView
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
          loading={loading}
          error={error}
          success={success}
          setError={setError}
          setSuccess={setSuccess}
          setView={setView}
        />
      )}
      {view === 'register' && (
        <RegisterView
          registerData={registerData}
          setRegisterData={setRegisterData}
          handleRegister={handleRegister}
          loading={loading}
          error={error}
          setError={setError}
          setView={setView}
        />
      )}
      {view === 'verify-otp' && (
        <VerifyOTPView
          otpData={otpData}
          setOtpData={setOtpData}
          handleVerifyOTP={handleVerifyOTP}
          loading={loading}
          error={error}
          success={success}
          setError={setError}
          setSuccess={setSuccess}
          setView={setView}
        />
      )}
      {view === 'dashboard' && (
        <DashboardView
          user={user}
          users={users}
          pagination={pagination}
          loading={loading}
          error={error}
          success={success}
          setError={setError}
          setSuccess={setSuccess}
          handleLogout={handleLogout}
          handleBlockUser={handleBlockUser}
          fetchUsers={fetchUsers}
        />
      )}
    </>
  );
}

export default App;