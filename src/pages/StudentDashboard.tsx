import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Wifi, Car, Utensils, Dumbbell } from 'lucide-react';
import { User } from '../types/User';
import { Hostel } from '../types/Hostel';
import HostelCard from '../components/HostelCard';
import SearchFilters from '../components/SearchFilters';

interface StudentDashboardProps {
  user: User;
}

interface SearchFilters {
  city: string;
  maxPrice: number;
  amenities: {
    wifi: boolean;
    ac: boolean;
    food: boolean;
    parking: boolean;
    gym: boolean;
  };
  sortBy: 'price' | 'rating' | 'distance';
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    city: '',
    maxPrice: 50000,
    amenities: {
      wifi: false,
      ac: false,
      food: false,
      parking: false,
      gym: false
    },
    sortBy: 'price'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    const mockHostels: Hostel[] = [
      {
        id: '1',
        ownerId: 'owner1',
        name: 'Green Valley Hostel',
        description: 'A modern hostel with all amenities near ABC Engineering College',
        address: '123 College Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        totalRooms: 50,
        totalBeds: 100,
        availableBeds: 25,
        rentPerBed: 8000,
        securityDeposit: 5000,
        amenities: {
          wifi: true,
          ac: true,
          food: true,
          laundry: true,
          parking: true,
          gym: false,
          studyRoom: true,
          cctv: true
        },
        photos: [
          'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        rules: ['No smoking', 'No visitors after 10 PM', 'Maintain cleanliness'],
        wardenName: 'Mr. Sharma',
        wardenPhone: '+91 9876543210',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        ownerId: 'owner2',
        name: 'Blue Ocean Hostel',
        description: 'Budget-friendly hostel with basic amenities',
        address: '456 University Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400002',
        totalRooms: 30,
        totalBeds: 60,
        availableBeds: 15,
        rentPerBed: 6000,
        securityDeposit: 3000,
        amenities: {
          wifi: true,
          ac: false,
          food: false,
          laundry: true,
          parking: false,
          gym: false,
          studyRoom: false,
          cctv: true
        },
        photos: [
          'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        rules: ['No smoking', 'Quiet hours after 11 PM'],
        wardenName: 'Ms. Patel',
        wardenPhone: '+91 9876543211',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        ownerId: 'owner3',
        name: 'Sunrise Hostel',
        description: 'Premium hostel with luxury amenities and services',
        address: '789 Campus Avenue',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        totalRooms: 75,
        totalBeds: 150,
        availableBeds: 40,
        rentPerBed: 12000,
        securityDeposit: 8000,
        amenities: {
          wifi: true,
          ac: true,
          food: true,
          laundry: true,
          parking: true,
          gym: true,
          studyRoom: true,
          cctv: true
        },
        photos: [
          'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        rules: ['No smoking', 'ID verification required', 'No outside food'],
        wardenName: 'Mr. Singh',
        wardenPhone: '+91 9876543212',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setTimeout(() => {
      setHostels(mockHostels);
      setFilteredHostels(mockHostels);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...hostels];

    // Search by name or city
    if (searchQuery) {
      filtered = filtered.filter(
        hostel =>
          hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hostel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hostel.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by city
    if (filters.city) {
      filtered = filtered.filter(
        hostel => hostel.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Filter by price
    filtered = filtered.filter(hostel => hostel.rentPerBed <= filters.maxPrice);

    // Filter by amenities
    Object.entries(filters.amenities).forEach(([amenity, required]) => {
      if (required) {
        filtered = filtered.filter(
          hostel => hostel.amenities[amenity as keyof typeof hostel.amenities]
        );
      }
    });

    // Sort hostels
    switch (filters.sortBy) {
      case 'price':
        filtered.sort((a, b) => a.rentPerBed - b.rentPerBed);
        break;
      case 'rating':
        // Mock rating sort
        filtered.sort(() => Math.random() - 0.5);
        break;
      case 'distance':
        // Mock distance sort
        filtered.sort(() => Math.random() - 0.5);
        break;
    }

    setFilteredHostels(filtered);
  }, [hostels, searchQuery, filters]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Hostel</h1>
          <p className="text-gray-600">Welcome back, {user.name} from {user.college}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by hostel name, city, or area..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  />
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price (₹/month)
                  </label>
                  <input
                    type="range"
                    min="2000"
                    max="50000"
                    step="1000"
                    className="w-full"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                  />
                  <div className="text-sm text-gray-600 mt-1">₹{filters.maxPrice.toLocaleString()}</div>
                </div>

                {/* Amenities Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    {Object.entries(filters.amenities).map(([amenity, checked]) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              amenities: {
                                ...filters.amenities,
                                [amenity]: e.target.checked
                              }
                            })
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {amenity === 'ac' ? 'AC' : amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="rating">Rating</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Found {filteredHostels.length} hostels
          </h2>
        </div>

        {/* Hostels Grid */}
        {filteredHostels.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} showBookButton />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;