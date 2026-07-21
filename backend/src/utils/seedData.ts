import ChargingStation from '../models/ChargingStation';

export const dummyStations = [
  // Chennai
  {
    name: 'Tata Power EZ Charge - Express Avenue',
    address: 'Express Avenue Mall, Royapettah',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pinCode: '600014',
    location: { type: 'Point', coordinates: [80.2642, 13.0583] },
    chargers: [{ type: 'CCS2', powerKw: 50, count: 4, status: 'Available', pricing: '₹18/kWh' }],
    amenities: ['Mall', 'Restroom', 'Food Court', 'Parking'],
    rating: 4.8,
    reviewsCount: 320,
    open24x7: false,
    network: 'Tata Power',
    contactNumber: '1800-833-2233',
    photos: []
  },
  {
    name: 'Zeon Charging - OMR',
    address: 'Holiday Inn, OMR IT Expressway',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pinCode: '600041',
    location: { type: 'Point', coordinates: [80.2541, 12.9830] },
    chargers: [{ type: 'CCS2', powerKw: 60, count: 2, status: 'Available', pricing: '₹20/kWh' }],
    amenities: ['Hotel', 'Restroom', 'Cafe'],
    rating: 4.7,
    reviewsCount: 150,
    open24x7: true,
    network: 'Zeon Charging',
    contactNumber: '0422-350-4888',
    photos: []
  },
  {
    name: 'BPCL EV Charge - Marina Beach',
    address: 'BPCL Petrol Pump, Kamaraj Salai, Marina Beach',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pinCode: '600005',
    location: { type: 'Point', coordinates: [80.2819, 13.0487] },
    chargers: [{ type: 'CCS2', powerKw: 50, count: 2, status: 'Available', pricing: '₹18/kWh' }],
    amenities: ['Restroom', 'Convenience Store'],
    rating: 4.3,
    reviewsCount: 155,
    open24x7: true,
    network: 'BPCL',
    contactNumber: '1800-22-4344',
    photos: []
  },

  // Coimbatore
  {
    name: 'Zeon Charging - Prozone Mall',
    address: 'Sivanandapuram, Saravanampatti',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pinCode: '641035',
    location: { type: 'Point', coordinates: [76.9928, 11.0530] },
    chargers: [{ type: 'CCS2', powerKw: 50, count: 2, status: 'Available', pricing: '₹22/kWh' }],
    amenities: ['Mall', 'Restroom', 'Food Court', 'Parking'],
    rating: 4.9,
    reviewsCount: 520,
    open24x7: true,
    network: 'Zeon Charging',
    contactNumber: '0422-350-4888',
    photos: []
  },
  {
    name: 'Ather Grid - RS Puram',
    address: 'DB Road, RS Puram',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pinCode: '641002',
    location: { type: 'Point', coordinates: [76.9497, 11.0084] },
    chargers: [{ type: 'Ather Proprietary', powerKw: 3.3, count: 4, status: 'Available', pricing: 'Free for Ather' }],
    amenities: ['Cafe', 'Shopping'],
    rating: 4.8,
    reviewsCount: 210,
    open24x7: true,
    network: 'Ather Grid',
    contactNumber: '1800-103-9000',
    photos: []
  },

  // Madurai
  {
    name: 'Relux Electric - Madurai Bypass',
    address: 'NH 44, Kappalur Toll Plaza',
    city: 'Madurai',
    state: 'Tamil Nadu',
    pinCode: '625008',
    location: { type: 'Point', coordinates: [78.0434, 9.8510] },
    chargers: [{ type: 'CCS2', powerKw: 60, count: 2, status: 'Available', pricing: '₹20/kWh' }],
    amenities: ['Restaurant', 'Restroom'],
    rating: 4.8,
    reviewsCount: 310,
    open24x7: true,
    network: 'Relux Electric',
    contactNumber: '1800-123-9999',
    photos: []
  },
  {
    name: 'Tata Power EZ Charge - Milan\'em Mall',
    address: 'KK Nagar, Madurai',
    city: 'Madurai',
    state: 'Tamil Nadu',
    pinCode: '625020',
    location: { type: 'Point', coordinates: [78.1477, 9.9324] },
    chargers: [{ type: 'CCS2', powerKw: 50, count: 2, status: 'Available', pricing: '₹18/kWh' }],
    amenities: ['Mall', 'Food Court'],
    rating: 4.5,
    reviewsCount: 115,
    open24x7: false,
    network: 'Tata Power',
    contactNumber: '1800-833-2233',
    photos: []
  },

  // Trichy
  {
    name: 'Zeon Charging - SRM Hotel',
    address: 'Khajamalai, Trichy',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    pinCode: '620023',
    location: { type: 'Point', coordinates: [78.6811, 10.7820] },
    chargers: [{ type: 'CCS2', powerKw: 50, count: 1, status: 'Available', pricing: '₹22/kWh' }],
    amenities: ['Hotel', 'Restroom', 'Restaurant'],
    rating: 4.6,
    reviewsCount: 180,
    open24x7: true,
    network: 'Zeon Charging',
    contactNumber: '0422-350-4888',
    photos: []
  },

  // Salem
  {
    name: 'ChargeZone - Salem Bypass',
    address: 'NH 44 Highway, Salem',
    city: 'Salem',
    state: 'Tamil Nadu',
    pinCode: '636004',
    location: { type: 'Point', coordinates: [78.1189, 11.6661] },
    chargers: [{ type: 'CCS2', powerKw: 60, count: 2, status: 'Available', pricing: '₹20/kWh' }, { type: 'Type 2', powerKw: 22, count: 1, status: 'Available', pricing: '₹15/kWh' }],
    amenities: ['Restroom', 'Cafe'],
    rating: 4.7,
    reviewsCount: 250,
    open24x7: true,
    network: 'ChargeZone',
    contactNumber: '1800-123-4567',
    photos: []
  },

  // Tirunelveli
  {
    name: 'Jio-bp pulse - Tirunelveli Junction',
    address: 'Near Railway Station',
    city: 'Tirunelveli',
    state: 'Tamil Nadu',
    pinCode: '627001',
    location: { type: 'Point', coordinates: [77.6974, 8.7274] },
    chargers: [{ type: 'CCS2', powerKw: 60, count: 2, status: 'Available', pricing: '₹19/kWh' }],
    amenities: ['Restroom', 'Convenience Store'],
    rating: 4.4,
    reviewsCount: 130,
    open24x7: true,
    network: 'Jio-bp pulse',
    contactNumber: '1800-891-9023',
    photos: []
  },

  // Vellore
  {
    name: 'Zeon Charging - Vellore Highway',
    address: 'NH 48, Near CMC',
    city: 'Vellore',
    state: 'Tamil Nadu',
    pinCode: '632004',
    location: { type: 'Point', coordinates: [79.1325, 12.9165] },
    chargers: [{ type: 'CCS2', powerKw: 50, count: 2, status: 'Occupied', pricing: '₹22/kWh' }],
    amenities: ['Restaurant', 'Restroom', 'Parking'],
    rating: 4.6,
    reviewsCount: 195,
    open24x7: true,
    network: 'Zeon Charging',
    contactNumber: '0422-350-4888',
    photos: []
  },

  // Ooty (Nilgiris)
  {
    name: 'Zeon Charging - Ooty',
    address: 'A2B Restaurant, Commercial Road',
    city: 'Ooty',
    state: 'Tamil Nadu',
    pinCode: '643001',
    location: { type: 'Point', coordinates: [76.7029, 11.4087] },
    chargers: [{ type: 'CCS2', powerKw: 50, count: 1, status: 'Available', pricing: '₹22/kWh' }],
    amenities: ['Restaurant', 'Restroom'],
    rating: 4.8,
    reviewsCount: 340,
    open24x7: true,
    network: 'Zeon Charging',
    contactNumber: '0422-350-4888',
    photos: []
  },

  // Kodaikanal
  {
    name: 'Relux Electric - Kodai Lake',
    address: 'Lake Road',
    city: 'Kodaikanal',
    state: 'Tamil Nadu',
    pinCode: '624101',
    location: { type: 'Point', coordinates: [77.4892, 10.2381] },
    chargers: [{ type: 'Type 2', powerKw: 22, count: 2, status: 'Available', pricing: '₹15/kWh' }],
    amenities: ['Tourist Spot', 'Restroom', 'Cafe'],
    rating: 4.5,
    reviewsCount: 120,
    open24x7: true,
    network: 'Relux Electric',
    contactNumber: '1800-123-9999',
    photos: []
  },

  // Hosur
  {
    name: 'Kazam EV - Hosur IT Park',
    address: 'SIPCOT Industrial Estate',
    city: 'Hosur',
    state: 'Tamil Nadu',
    pinCode: '635126',
    location: { type: 'Point', coordinates: [77.8253, 12.7409] },
    chargers: [{ type: 'CCS2', powerKw: 30, count: 2, status: 'Available', pricing: '₹17/kWh' }],
    amenities: ['Industrial Area', 'Restroom'],
    rating: 4.2,
    reviewsCount: 90,
    open24x7: true,
    network: 'Kazam',
    contactNumber: '1800-200-3000',
    photos: []
  },

  // Erode
  {
    name: 'ChargeZone - Erode Bus Stand',
    address: 'Near Central Bus Terminus',
    city: 'Erode',
    state: 'Tamil Nadu',
    pinCode: '638001',
    location: { type: 'Point', coordinates: [77.7172, 11.3410] },
    chargers: [{ type: 'CCS2', powerKw: 60, count: 1, status: 'Available', pricing: '₹20/kWh' }],
    amenities: ['Restroom', 'Food Court'],
    rating: 4.3,
    reviewsCount: 110,
    open24x7: true,
    network: 'ChargeZone',
    contactNumber: '1800-123-4567',
    photos: []
  }
];

export const seedDatabaseIfEmpty = async () => {
  try {
    const count = await ChargingStation.countDocuments();
    if (count === 0) {
      console.log('🌱 Database is empty. Auto-seeding initial charging stations...');
      await ChargingStation.insertMany(dummyStations);
      console.log(`✅ Auto-seeding complete! Inserted ${dummyStations.length} stations.`);
    } else {
      console.log(`ℹ️ Database contains ${count} charging stations.`);
    }
  } catch (error: any) {
    console.error(`⚠️ Auto-seeding warning: ${error.message}`);
  }
};
