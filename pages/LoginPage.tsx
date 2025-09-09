import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setNotification('');
        // Mock login validation for demonstration
        if (email === 'user@example.com' && password === 'password') {
            setNotification('Login successful! Redirecting to homepage...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            setError('Invalid email or password. Use user@example.com and password.');
        }
    };

    const handleLinkClick = (e: React.MouseEvent, feature: string) => {
        e.preventDefault();
        setError('');
        setNotification(`${feature} feature is coming soon!`);
        setTimeout(() => {
            setNotification('');
        }, 4000); // Hide notification after 4 seconds
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('pages.login.title')}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                {t('pages.login.emailLabel')}
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 bg-white text-black rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder={t('pages.login.emailLabel')}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {t('pages.login.passwordLabel')}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 bg-white text-black rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder={t('pages.login.passwordLabel')}
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <div className="text-center p-3 rounded-md bg-red-100 text-red-800 text-sm" role="alert">
                            {error}
                        </div>
                    )}
                    {notification && !error && (
                        <div className={`text-center p-3 rounded-md text-sm ${notification.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`} role="alert">
                            {notification}
                        </div>
                    )}

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a 
                                href="#" 
                                onClick={(e) => handleLinkClick(e, 'Forgot Password')}
                                className="font-medium text-orange-600 hover:text-orange-500"
                            >
                                {t('pages.login.forgotPassword')}
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            {t('pages.login.loginButton')}
                        </button>
                    </div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">{t('pages.login.or')}</span>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={(e) => handleLinkClick(e, 'Google Login')}
                        className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                         <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 36.31 44 30.865 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
                        </svg>
                        {t('pages.login.googleLogin')}
                    </button>
                </div>

                <div className="text-sm text-center">
                    <p className="text-gray-600">
                        {t('pages.login.signupPrompt')}
                        {' '}
                        <Link 
                            to="#" 
                            onClick={(e) => handleLinkClick(e, 'Sign Up')}
                            className="font-medium text-orange-600 hover:text-orange-500"
                        >
                            {t('pages.login.signupLink')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;