import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Users, 
  Wifi, 
  Car, 
  Utensils, 
  Dumbbell,
  Shield,
  BookOpen,
  Phone,
  Star,
  IndianRupee
} from 'lucide-react';
import { User } from '../types/User';
import { Hostel } from '../types/Hostel';

interface HostelDetailsProps {
  user: User | null;
}

const HostelDetails: React.FC<HostelDetailsProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // Mock data loading - replace with actual API call
    const mockHostel: Hostel = {
      id: id!,
      ownerId: 'owner1',
      name: 'Green Valley Hostel',
      description: 'A modern hostel with all amenities near ABC Engineering College. Our hostel provides a comfortable and safe environment for students with 24/7 security, high-speed internet, and nutritious meals. Located just 2km from the main campus, it offers easy access to public transportation and local amenities.',
      address: '123 College Road, Near ABC Engineering College',
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
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      rules: [
        'No smoking inside the premises',
        'No visitors after 10 PM',
        'Maintain cleanliness in common areas',
        'No loud music or noise after 11 PM',
        'ID verification required for all guests'
      ],
      wardenName: 'Mr. Raj Sharma',
      wardenPhone: '+91 9876543210',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTimeout(() => {
      setHostel(mockHostel);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const amenityIcons = {
    wifi: <Wifi className="h-5 w-5" />,
    ac: <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">AC</div>,
    food: <Utensils className="h-5 w-5" />,
    laundry: <div className="h-5 w-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">L</div>,
    parking: <Car className="h-5 w-5" />,
    gym: <Dumbbell className="h-5 w-5" />,
    studyRoom: <BookOpen className="h-5 w-5" />,
    cctv: <Shield className="h-5 w-5" />
  };

  const amenityLabels = {
    wifi: 'Wi-Fi',
    ac: 'Air Conditioning',
    food: 'Food Included',
    laundry: 'Laundry Service',
    parking: 'Parking',
    gym: 'Gymnasium',
    studyRoom: 'Study Room',
    cctv: 'CCTV Security'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hostel not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Go back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-h-6">
            <img
              src={hostel.photos[selectedImageIndex]}
              alt={hostel.name}
              className="w-full h-96 object-cover"
            />
          </div>
          {hostel.photos.length > 1 && (
            <div className="p-4 flex space-x-4 overflow-x-auto">
              {hostel.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={photo}
                    alt={`${hostel.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hostel.address}, {hostel.city}, {hostel.state}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">(4.8)</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Bed className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-sm text-gray-600">Total Beds</div>
                  <div className="font-semibold">{hostel.totalBeds}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-600">Available</div>
                  <div className="font-semibold text-green-600">{hostel.availableBeds}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <IndianRupee className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-sm text-gray-600">Per Month</div>
                  <div className="font-semibold">₹{hostel.rentPerBed.toLocaleString()}</div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{hostel.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(hostel.amenities).map(([amenity, available]) => (
                  <div
                    key={amenity}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      available ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    {amenityIcons[amenity as keyof typeof amenityIcons]}
                    <span className="text-sm font-medium">
                      {amenityLabels[amenity as keyof typeof amenityLabels]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hostel Rules</h2>
              <ul className="space-y-2">
                {hostel.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Warden</div>
                    <div className="text-gray-600">{hostel.wardenName}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href={`tel:${hostel.wardenPhone}`} className="text-blue-600 hover:text-blue-800">
                      {hostel.wardenPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">₹{hostel.rentPerBed.toLocaleString()}</div>
                <div className="text-gray-600">per month</div>
                <div className="text-sm text-gray-500 mt-1">
                  Security Deposit: ₹{hostel.securityDeposit.toLocaleString()}
                </div>
              </div>

              {hostel.availableBeds > 0 ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-green-600 font-semibold">
                      {hostel.availableBeds} beds available
                    </div>
                  </div>

                  {user?.role === 'student' ? (
                    <Link
                      to={`/book/${hostel.id}`}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                    >
                      Book Now
                    </Link>
                  ) : user ? (
                    <div className="text-center text-gray-600 text-sm">
                      Only students can book hostels
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                    >
                      Login to Book
                    </Link>
                  )}

                  <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Contact Warden
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-red-600 font-semibold mb-4">No beds available</div>
                  <button className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded-lg font-semibold cursor-not-allowed">
                    Join Waiting List
                  </button>
                </div>
              )}
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <div>Map view</div>
                    <div className="text-sm">{hostel.city}, {hostel.state}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;