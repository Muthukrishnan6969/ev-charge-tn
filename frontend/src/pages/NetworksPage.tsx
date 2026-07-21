import { Zap, ShieldCheck, Map, CreditCard } from 'lucide-react';

const networks = [
  {
    name: 'Tata Power EZ Charge',
    description: 'India\'s largest EV charging network with over 4,000+ public and semi-public chargers.',
    chargers: '4000+',
    type: 'Fast & Slow',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    iconColor: 'text-blue-500'
  },
  {
    name: 'ChargeZone',
    description: 'Specialized in high-speed DC fast charging for inter-city travel and fleet operations.',
    chargers: '1500+',
    type: 'DC Fast Only',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    iconColor: 'text-orange-500'
  },
  {
    name: 'Zeon Charging',
    description: 'Premium EV charging experience focusing on South India highway routes with reliable chargers.',
    chargers: '300+',
    type: 'Premium DC Fast',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconColor: 'text-emerald-500'
  },
  {
    name: 'Jio-bp pulse',
    description: 'Rapidly expanding network at fuel stations offering ultra-fast charging capabilities.',
    chargers: '1000+',
    type: 'Ultra Fast',
    color: 'bg-green-50 text-green-700 border-green-200',
    iconColor: 'text-green-500'
  },
  {
    name: 'Ather Grid',
    description: 'Extensive two-wheeler and four-wheeler charging network optimized for city commuting.',
    chargers: '2500+',
    type: 'Slow & Fast',
    color: 'bg-slate-50 text-slate-700 border-slate-200',
    iconColor: 'text-slate-500'
  },
  {
    name: 'Statiq',
    description: 'Aggregator and operator providing a unified app experience for multiple chargers.',
    chargers: '7000+',
    type: 'Aggregator',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    iconColor: 'text-purple-500'
  }
];

const NetworksPage = () => {
  return (
    <div className="flex-grow flex flex-col bg-slate-50">
      <div className="bg-emerald-800 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-emerald-700/20">
          <Zap className="h-64 w-64" />
        </div>
        <div className="max-w-7xl 2xl:max-w-[1920px] mx-auto relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Supported Networks
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            We partner with the leading EV charging operators in India to provide you with the most reliable and extensive charging coverage.
          </p>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {networks.map((network, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 ${network.color}`}>
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{network.name}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                {network.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Total Chargers</p>
                  <p className="font-bold text-slate-700">{network.chargers}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Charging Type</p>
                  <p className="font-bold text-slate-700">{network.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Why rely on our platform?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Map className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Unified Map</h4>
              <p className="text-sm text-slate-500">See all operators on a single map without switching between multiple apps.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Live Status</h4>
              <p className="text-sm text-slate-500">Real-time availability updates so you never drive to a broken or occupied charger.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Clear Pricing</h4>
              <p className="text-sm text-slate-500">Compare rates across different networks instantly before planning your stop.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworksPage;
