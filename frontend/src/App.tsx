import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AuthPage from './pages/AuthPage';
import StationDetailsPage from './pages/StationDetailsPage';
import RoutePlannerPage from './pages/RoutePlannerPage';
import NetworksPage from './pages/NetworksPage';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/station/:id" element={<StationDetailsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/route-planner" element={<RoutePlannerPage />} />
              <Route path="/networks" element={<NetworksPage />} />
            </Routes>
          </main>
        </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
