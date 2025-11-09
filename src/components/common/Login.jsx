import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Adjust path
import { Loader2, LogIn } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed
const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully!');
      
      // We need a small delay for the `isAdmin` state to update
      // from the AuthContext after login.
      setTimeout(() => {
        // This check is slightly complex because state updates
        // from context aren't instant.
        // A more robust way is to check the profile role from the login response,
        // but for now, we'll navigate based on a small delay.
        // A better check would be to see if `isAdmin` is true
        // from the auth context *after* it refreshes.
        // For simplicity, we'll just redirect to home.
        // The Header will show the Admin link if they are one.
        navigate('/');
      }, 1000);

    } catch (error) {
      toast.error(error.message || 'Invalid email or password.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-20">
      <Toaster position="top-right" />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`w-full p-3 mt-1 border rounded-md ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full p-3 mt-1 border rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <LogIn className="w-5 h-5 mr-2" />
            )}
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;