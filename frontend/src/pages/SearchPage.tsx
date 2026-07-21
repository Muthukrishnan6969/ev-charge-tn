
import { useSearchParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getStations } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Zap, Star } from 'lucide-react';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || '';
  const minRatingFilter = searchParams.get('minRating') || '';
  
  const { data: stations, isLoading } = useQuery({
    queryKey: ['stations', query, typeFilter, minRatingFilter],
    queryFn: () => getStations({ 
      ...(query && { city: query }),
      ...(typeFilter && { type: typeFilter }),
      ...(minRatingFilter && { minRating: minRatingFilter })
    }),
  });

  const mapCenter = stations && stations.length > 0 
    ? [stations[0].location.coordinates[1], stations[0].location.coordinates[0]] 
    : [20.5937, 78.9629]; // Center of India
  const mapZoom = stations && stations.length > 0 ? 12 : 5;

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* List View */}
      <div className="w-full md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[800px] h-[50vh] md:h-full flex flex-col bg-white shadow-xl z-10">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {query ? `Results for "${query}"` : 'All Charging Stations'}
          </h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-slate-500">
              {isLoading ? 'Loading...' : `${stations?.length || 0} stations found`}
            </p>
            <div className="flex space-x-2">
              <select 
                className="text-xs border-slate-200 rounded-md bg-slate-50 text-slate-700 py-1 pl-2 pr-6"
                value={typeFilter}
                onChange={(e) => setSearchParams(prev => { e.target.value ? prev.set('type', e.target.value) : prev.delete('type'); return prev; })}
              >
                <option value="">All Types</option>
                <option value="CCS2">CCS2</option>
                <option value="Type 2">Type 2</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          ) : stations?.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No charging stations found in this area.
            </div>
          ) : (
            stations?.map((station: any) => (
              <div 
                key={station._id} 
                onClick={() => navigate(`/station/${station._id}`)}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-emerald-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">{station.name}</h3>
                  <div className="flex items-center text-sm font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {station.rating}
                  </div>
                </div>
                <p className="text-sm text-slate-500 flex items-start mb-4">
                  <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  {station.address}, {station.city}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {station.chargers.map((charger: any, idx: number) => (
                    <div key={idx} className="flex items-center text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                      <Zap className="h-3 w-3 mr-1 text-emerald-500" />
                      {charger.type} ({charger.powerKw}kW)
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-500">{station.network}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${station.chargers.some((c: any) => c.status === 'Available') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {station.chargers.some((c: any) => c.status === 'Available') ? 'Available' : 'Occupied'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 h-[50vh] md:h-full relative z-0">
        <MapContainer 
          center={mapCenter as [number, number]} 
          zoom={mapZoom} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stations?.map((station: any) => (
            <Marker 
              key={station._id} 
              position={[station.location.coordinates[1], station.location.coordinates[0]]}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold text-sm mb-1">{station.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{station.network}</p>
                  <div className="text-xs mb-2">
                    {station.chargers.map((c: any) => c.type).join(', ')}
                  </div>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${station.location.coordinates[1]},${station.location.coordinates[0]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center bg-emerald-500 text-white text-xs font-medium py-1.5 rounded hover:bg-emerald-600 transition-colors"
                  >
                    Navigate
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SearchPage;
