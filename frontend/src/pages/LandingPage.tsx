import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Search, MapPin, Zap, Navigation } from 'lucide-react';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative bg-slate-900 overflow-hidden min-h-[600px] flex items-center justify-center">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-[100px]"></div>
          <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-medium text-emerald-50">Over 5,000+ chargers live across India</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl 2xl:text-8xl 3xl:text-9xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Powering Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Electric Journey
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl 2xl:text-2xl text-slate-300 max-w-2xl 2xl:max-w-4xl mb-12"
          >
            Find compatible EV charging stations across India. Filter by speed, availability, and network. Plan your routes effortlessly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-3xl bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center"
          >
            <form onSubmit={handleSearch} className="w-full flex flex-col md:flex-row items-center">
              <div className="flex-1 w-full flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-slate-200">
                <MapPin className="text-slate-400 h-5 w-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="Enter city, pin code or landmark" 
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-auto p-2">
                <button type="submit" className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl md:rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl 2xl:max-w-[1920px] mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Why choose EV Charge India?</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">We provide the most comprehensive and up-to-date database of EV charging stations across all major networks in India.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <MapPin className="h-8 w-8 text-emerald-500" />, title: "Pan India Coverage", desc: "Find chargers from all major operators like Tata Power, Zeon, Jio-bp, and more." },
            { icon: <Zap className="h-8 w-8 text-emerald-500" />, title: "Real-time Status", desc: "Know if a charger is available, occupied, or offline before you reach there." },
            { icon: <Navigation className="h-8 w-8 text-emerald-500" />, title: "Smart Route Planner", desc: "Plan your long intercity trips with optimized charging stops based on your car's range." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
