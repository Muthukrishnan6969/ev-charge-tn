import { useState } from 'react';
import { Link } from 'react-router';
import { Zap, Menu, User, Search, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
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
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/search" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
            >
              Find Chargers
            </Link>
            <Link 
              to="/route-planner" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
            >
              Route Planner
            </Link>
            <Link 
              to="/networks" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
            >
              Networks
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-slate-200">
            {user ? (
              <div className="px-5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 text-emerald-800 p-2 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="text-base font-medium text-slate-800">{user.name}</div>
                </div>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-500 p-2 hover:bg-red-50 rounded-full">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="px-5">
                <Link 
                  to="/auth" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-base font-medium"
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
