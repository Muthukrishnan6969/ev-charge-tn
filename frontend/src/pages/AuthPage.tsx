import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Zap } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const { data } = await api.post(endpoint, payload);
      login(data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-emerald-500 py-8 px-6 text-center">
          <div className="inline-flex bg-white p-2 rounded-xl mb-4">
            <Zap className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-emerald-100">
            {isLogin ? 'Sign in to access your saved stations' : 'Join the largest EV network in India'}
          </p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
