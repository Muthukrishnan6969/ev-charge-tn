import { MapPin, Navigation, BatteryCharging, Car, Zap, CheckCircle, Banknote, Bike, Bus } from 'lucide-react';
import { useState } from 'react';
import { TNCities, TNEvStations } from '../data/tnDirectory';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const EvIcon = L.divIcon({
  html: '<div style="background-color: #10b981; color: white; border-radius: 50%; padding: 4px; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>',
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const RoutePlannerPage = () => {
  const [source, setSource] = useState(TNCities[0].name);
  const [destination, setDestination] = useState(TNCities[2].name);
  
  // Settings
  const [evRange, setEvRange] = useState(250);
  const [currentCharge, setCurrentCharge] = useState(100);
  const [fuelMileage, setFuelMileage] = useState(15);
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeResult, setRouteResult] = useState<any>(null);

  const handleCalculate = async () => {
    if (!source || !destination || source === destination) return;
    setIsCalculating(true);
    setRouteResult(null);

    const srcObj = TNCities.find(c => c.name === source);
    const destObj = TNCities.find(c => c.name === destination);
    
    if(!srcObj || !destObj) return;

    try {
      // Fetch route from OSRM
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${srcObj.lng},${srcObj.lat};${destObj.lng},${destObj.lat}?overview=full&geometries=geojson`;
      const response = await fetch(osrmUrl);
      const data = await response.json();
      
      if (data.code !== 'Ok') throw new Error('Route not found');

      const route = data.routes[0];
      const distanceKm = route.distance / 1000;
      
      // Travel times based on transport modes
      // Car: avg 65 km/h
      // Bike: avg 50 km/h
      // Bus: avg 45 km/h
      const carHours = distanceKm / 65;
      const bikeHours = distanceKm / 50;
      const busHours = distanceKm / 45;

      // EV Calculations
      const availableRange = (currentCharge / 100) * evRange;
      const numStops = Math.max(0, Math.ceil((distanceKm - availableRange) / (evRange * 0.8)));
      const evChargeTimeMins = numStops * 45; // 45 mins per stop
      const evHours = (distanceKm / 65) + (evChargeTimeMins / 60);

      // Cost Calculations
      const fuelCost = (distanceKm / fuelMileage) * 105; // ₹105 per L petrol
      const evCost = (distanceKm / 7) * 20; // Assume 7km per kWh, ₹20 per kWh
      const cabCost = 100 + (distanceKm * 15); // Base ₹100 + ₹15/km

      // Suggest EV Stops (Simple geometric approximation)
      const suggestedStops = [];
      if (numStops > 0) {
        // Find stations that are roughly between origin and destination lat/lng
        const midLat = (srcObj.lat + destObj.lat) / 2;
        const midLng = (srcObj.lng + destObj.lng) / 2;
        
        // Sort stations by distance to midpoint
        const sortedStations = [...TNEvStations].sort((a, b) => {
          const distA = Math.pow(a.lat - midLat, 2) + Math.pow(a.lng - midLng, 2);
          const distB = Math.pow(b.lat - midLat, 2) + Math.pow(b.lng - midLng, 2);
          return distA - distB;
        });
        
        for(let i=0; i<Math.min(numStops, sortedStations.length); i++) {
          suggestedStops.push(sortedStations[i]);
        }
      }

      setRouteResult({
        distance: distanceKm.toFixed(1),
        geometry: route.geometry,
        bounds: [
          [Math.min(srcObj.lat, destObj.lat) - 0.2, Math.min(srcObj.lng, destObj.lng) - 0.2],
          [Math.max(srcObj.lat, destObj.lat) + 0.2, Math.max(srcObj.lng, destObj.lng) + 0.2]
        ],
        times: {
          car: formatTime(carHours),
          bike: formatTime(bikeHours),
          bus: formatTime(busHours),
          ev: formatTime(evHours)
        },
        costs: {
          fuel: Math.round(fuelCost),
          ev: Math.round(evCost),
          cab: Math.round(cabCost)
        },
        evStats: {
          stops: numStops,
          chargeTime: evChargeTimeMins,
          suggestedStops
        },
        srcObj,
        destObj
      });
    } catch (err) {
      console.error(err);
      alert("Failed to calculate route. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="flex-grow flex flex-col bg-slate-50">
      <div className="bg-emerald-700 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl 2xl:max-w-[1920px] mx-auto text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tamil Nadu Trip Planner
          </h1>
          <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
            Accurate point-to-point distance, travel times across transport modes, and EV charging stops across TN.
          </p>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Form */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Navigation className="mr-2 h-5 w-5 text-emerald-500" /> Plan Your Route
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Origin City</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                >
                  {TNCities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Destination City</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  {TNCities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800 mb-3">Vehicle Details</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">EV Range (km)</label>
                    <input
                      type="number"
                      className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                      value={evRange}
                      onChange={(e) => setEvRange(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Current Charge %</label>
                    <input
                      type="number"
                      max="100"
                      className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                      value={currentCharge}
                      onChange={(e) => setCurrentCharge(Number(e.target.value))}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">ICE Car Mileage (km/l)</label>
                  <input
                    type="number"
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                    value={fuelMileage}
                    onChange={(e) => setFuelMileage(Number(e.target.value))}
                  />
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                disabled={!source || !destination || isCalculating || source === destination}
                className={`w-full text-white font-medium py-3 px-4 rounded-lg transition mt-6 flex items-center justify-center ${
                  (!source || !destination || isCalculating || source === destination) ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isCalculating ? 'Calculating Route...' : 'Calculate Route'}
              </button>
            </div>
          </div>

          {routeResult && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Banknote className="mr-2 h-5 w-5 text-slate-500" /> Fare & Cost Estimator
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">EV Charging Cost</span>
                  <span className="font-bold text-emerald-600">₹{routeResult.costs.ev}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">Petrol/Diesel Cost</span>
                  <span className="font-bold text-red-500">₹{routeResult.costs.fuel}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">Cab / Taxi Fare (Approx)</span>
                  <span className="font-bold text-slate-700">₹{routeResult.costs.cab}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results & Map Section */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {routeResult ? (
            <>
              {/* Distance & Time Cards */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{routeResult.distance} km</h2>
                    <p className="text-slate-500 text-sm">Shortest road distance</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" /> Route Optimized
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-slate-100 rounded-lg p-3 text-center bg-slate-50">
                    <Car className="mx-auto h-5 w-5 text-slate-500 mb-1" />
                    <p className="text-xs text-slate-500 font-semibold">Car / SUV</p>
                    <p className="font-bold text-slate-800">{routeResult.times.car}</p>
                  </div>
                  <div className="border border-slate-100 rounded-lg p-3 text-center bg-slate-50">
                    <Bike className="mx-auto h-5 w-5 text-slate-500 mb-1" />
                    <p className="text-xs text-slate-500 font-semibold">Two Wheeler</p>
                    <p className="font-bold text-slate-800">{routeResult.times.bike}</p>
                  </div>
                  <div className="border border-emerald-200 rounded-lg p-3 text-center bg-emerald-50">
                    <Zap className="mx-auto h-5 w-5 text-emerald-500 mb-1" />
                    <p className="text-xs text-emerald-700 font-semibold">Electric Vehicle</p>
                    <p className="font-bold text-emerald-700">{routeResult.times.ev}</p>
                  </div>
                  <div className="border border-slate-100 rounded-lg p-3 text-center bg-slate-50">
                    <Bus className="mx-auto h-5 w-5 text-slate-500 mb-1" />
                    <p className="text-xs text-slate-500 font-semibold">State Bus</p>
                    <p className="font-bold text-slate-800">{routeResult.times.bus}</p>
                  </div>
                </div>
              </div>

              {/* EV Stops Recommendation */}
              {routeResult.evStats.stops > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                    <BatteryCharging className="mr-2 h-5 w-5 text-emerald-500" /> 
                    {routeResult.evStats.stops} Charging Stops Required
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Based on your EV's range ({evRange}km) and current charge ({currentCharge}%), you cannot reach the destination directly. We recommend stopping at these stations along the highway:
                  </p>
                  <div className="space-y-3">
                    {routeResult.evStats.suggestedStops.map((stop: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <div>
                          <p className="font-bold text-emerald-800 text-sm">{stop.name}</p>
                          <p className="text-xs text-emerald-600">{stop.type}</p>
                        </div>
                        <div className="text-xs font-semibold bg-white px-2 py-1 rounded text-emerald-700 shadow-sm">
                          Charge here
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              <div className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
                <MapContainer bounds={routeResult.bounds} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Origin */}
                  <Marker position={[routeResult.srcObj.lat, routeResult.srcObj.lng]}>
                    <Popup>Origin: {routeResult.srcObj.name}</Popup>
                  </Marker>
                  
                  {/* Destination */}
                  <Marker position={[routeResult.destObj.lat, routeResult.destObj.lng]}>
                    <Popup>Destination: {routeResult.destObj.name}</Popup>
                  </Marker>

                  {/* Charging Stops */}
                  {routeResult.evStats.suggestedStops.map((stop: any, idx: number) => (
                    <Marker key={idx} position={[stop.lat, stop.lng]} icon={EvIcon}>
                      <Popup>{stop.name} <br/> {stop.type}</Popup>
                    </Marker>
                  ))}

                  {/* Route Polyline (GeoJSON features array converted to lat/lng) */}
                  <Polyline 
                    positions={routeResult.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]])} 
                    color="#10b981" 
                    weight={5} 
                    opacity={0.8}
                  />
                </MapContainer>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-slate-100 opacity-50 flex items-center justify-center" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="text-center z-10 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 max-w-sm">
                <MapPin className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Tamil Nadu Planner</h3>
                <p className="text-slate-500 text-sm">Select your origin and destination cities in Tamil Nadu to see exact distances, transport options, and smart charging recommendations.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutePlannerPage;
