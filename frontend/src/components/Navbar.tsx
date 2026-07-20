import { Link } from 'react-router';
import { Zap, Menu, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">EV Charge India</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Find Chargers</Link>
            <Link to="/route-planner" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Route Planner</Link>
            <Link to="/networks" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Networks</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={logout} className="flex items-center space-x-1 text-slate-500 hover:text-red-500 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
