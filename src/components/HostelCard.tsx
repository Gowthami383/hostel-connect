import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Users, Wifi, Car, Utensils, IndianRupee, Star } from 'lucide-react';
import { Hostel } from '../types/Hostel';

interface HostelCardProps {
  hostel: Hostel;
  showBookButton?: boolean;
}

const HostelCard: React.FC<HostelCardProps> = ({ hostel, showBookButton = false }) => {
  const amenityIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    food: <Utensils className="h-4 w-4" />,
    parking: <Car className="h-4 w-4" />
  };

  const topAmenities = Object.entries(hostel.amenities)
    .filter(([_, available]) => available)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1">
      {/* Image */}
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={hostel.photos[0]} 
          alt={hostel.name}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{hostel.name}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{hostel.city}, {hostel.state}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span>{hostel.totalBeds} beds</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span className="text-green-600">{hostel.availableBeds} available</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-3 mb-4">
          {topAmenities.map(([amenity, _]) => (
            <div key={amenity} className="flex items-center space-x-1 text-gray-600">
              {amenityIcons[amenity as keyof typeof amenityIcons]}
              <span className="text-xs capitalize">
                {amenity === 'wifi' ? 'Wi-Fi' : amenity}
              </span>
            </div>
          ))}
          {Object.values(hostel.amenities).filter(Boolean).length > 3 && (
            <span className="text-xs text-gray-500">
              +{Object.values(hostel.amenities).filter(Boolean).length - 3} more
            </span>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <IndianRupee className="h-4 w-4 text-green-600" />
            <span className="text-xl font-bold text-gray-900">
              {hostel.rentPerBed.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm">/month</span>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/hostel/${hostel.id}`}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              View Details
            </Link>
            {showBookButton && hostel.availableBeds > 0 && (
              <Link
                to={`/book/${hostel.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;