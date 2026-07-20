import { useParams, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStationById, toggleFavorite } from '../services/api';
import { MapPin, Zap, Star, Navigation, Clock, Phone, Heart, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const StationDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: station, isLoading } = useQuery({
    queryKey: ['station', id],
    queryFn: () => getStationById(id as string),
    enabled: !!id,
  });

  const isFavorite = user?.favorites?.includes(id as string);

  const favoriteMutation = useMutation({
    mutationFn: () => toggleFavorite(id as string),
    onSuccess: (newFavorites) => {
      // Assuming context has a way to update or we fetch profile again
      // For MVP, we can invalidate profile or just let the button state manage optimistically
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });

  if (isLoading) {
    return <div className="flex-1 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>;
  }

  if (!station) {
    return <div className="flex-1 flex justify-center items-center">Station not found</div>;
  }

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md">{station.network}</span>
              <span className="flex items-center text-sm font-medium text-amber-500">
                <Star className="h-4 w-4 mr-1 fill-current" />
                {station.rating} ({station.reviewsCount} reviews)
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{station.name}</h1>
            <p className="text-slate-500 mt-2 flex items-start">
              <MapPin className="h-5 w-5 mr-1.5 flex-shrink-0 mt-0.5" />
              {station.address}, {station.city}, {station.state} {station.pinCode}
            </p>
          </div>
          <div className="flex space-x-3 w-full md:w-auto">
            <button 
              onClick={() => user ? favoriteMutation.mutate() : alert('Please log in')}
              className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-colors border ${isFavorite ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${station.location.coordinates[1]},${station.location.coordinates[0]}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Navigation className="h-5 w-5" />
              <span>Navigate</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chargers */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 text-emerald-500 mr-2" />
                Chargers & Pricing
              </h2>
              <div className="space-y-4">
                {station.chargers.map((charger: any, idx: number) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <Zap className="h-8 w-8 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{charger.type}</h3>
                        <p className="text-slate-500 text-sm">{charger.powerKw} kW • DC Fast</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto">
                      <div className={`flex items-center text-sm font-medium ${charger.status === 'Available' ? 'text-emerald-600' : 'text-red-600'} mb-1`}>
                        {charger.status === 'Available' ? <CheckCircle className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
                        {charger.status}
                      </div>
                      <span className="font-bold text-slate-900">{charger.pricing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map Mini */}
            <div className="bg-white rounded-2xl shadow-sm p-2 h-[300px] overflow-hidden">
                <MapContainer 
                  center={[station.location.coordinates[1], station.location.coordinates[0]]} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[station.location.coordinates[1], station.location.coordinates[0]]} />
                </MapContainer>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Station Info</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Timing</p>
                    <p className="text-sm text-slate-500">{station.open24x7 ? 'Open 24x7' : '9:00 AM - 10:00 PM'}</p>
                  </div>
                </div>
                {station.contactNumber && (
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Contact</p>
                      <p className="text-sm text-slate-500">{station.contactNumber}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {station.amenities.map((amenity: string, idx: number) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetailsPage;
