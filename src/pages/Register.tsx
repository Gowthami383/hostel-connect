import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Lock, Phone, GraduationCap, Building2 } from 'lucide-react';
import { User as UserType } from '../types/User';

interface RegisterProps {
  onLogin: (user: UserType) => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<'student' | 'owner'>(
    (searchParams.get('role') as 'student' | 'owner') || 'student'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    college: '', // For students
    address: '' // For owners
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Mock registration - replace with real registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: UserType = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role,
        college: role === 'student' ? formData.college : undefined,
        address: role === 'owner' ? formData.address : undefined,
        createdAt: new Date()
      };

      onLogin(newUser);
      navigate(role === 'owner' ? '/owner-dashboard' : '/student-dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to existing account
            </Link>
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`${
              role === 'student'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300'
            } border-2 rounded-lg p-4 flex flex-col items-center space-y-2 hover:border-blue-600 transition-colors`}
          >
            <GraduationCap className="h-6 w-6" />
            <span className="font-medium">Student</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('owner')}
            className={`${
              role === 'owner'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300'
            } border-2 rounded-lg p-4 flex flex-col items-center space-y-2 hover:border-green-600 transition-colors`}
          >
            <Building2 className="h-6 w-6" />
            <span className="font-medium">Hostel Owner</span>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {role === 'student' && (
              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-700">
                  College/University
                </label>
                <div className="mt-1 relative">
                  <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="college"
                    name="college"
                    type="text"
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your college name"
                    value={formData.college}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {role === 'owner' && (
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Business Address
                </label>
                <div className="mt-1 relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your business address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;