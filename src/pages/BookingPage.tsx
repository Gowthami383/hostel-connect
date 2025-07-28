import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, Shield, User, MapPin, Bed } from 'lucide-react';
import { User as UserType } from '../types/User';
import { Hostel } from '../types/Hostel';

interface BookingPageProps {
  user: UserType;
}

const BookingPage: React.FC<BookingPageProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    duration: 6, // months
    bedPreference: 'any',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock data loading - replace with actual API call
    const mockHostel: Hostel = {
      id: id!,
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
    };

    setTimeout(() => {
      setHostel(mockHostel);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    if (!hostel) return 0;
    return (hostel.rentPerBed * bookingData.duration) + hostel.securityDeposit;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock booking submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message and redirect
      alert('Booking submitted successfully! You will receive a confirmation email shortly.');
      navigate('/student-dashboard');
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Hostel</h1>
          <p className="text-gray-600">Complete your booking for {hostel.name}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      College
                    </label>
                    <input
                      type="text"
                      value={user.college || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Emergency Contact
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Parent/Guardian name"
                      value={bookingData.emergencyContact}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                      value={bookingData.emergencyPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Booking Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      name="checkInDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={bookingData.checkInDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (months) *
                    </label>
                    <select
                      name="duration"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={bookingData.duration}
                      onChange={handleInputChange}
                    >
                      <option value={3}>3 months</option>
                      <option value={6}>6 months</option>
                      <option value={12}>12 months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bed Preference
                  </label>
                  <select
                    name="bedPreference"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingData.bedPreference}
                    onChange={handleInputChange}
                  >
                    <option value="any">Any available bed</option>
                    <option value="lower">Lower bunk preferred</option>
                    <option value="upper">Upper bunk preferred</option>
                    <option value="window">Near window</option>
                  </select>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> Payment integration with Stripe is available. 
                    For this demo, clicking "Book Now\" will simulate a successful booking.
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Rent ({bookingData.duration} months)</span>
                    <span>₹{(hostel.rentPerBed * bookingData.duration).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit</span>
                    <span>₹{hostel.securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start space-x-3 mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the hostel terms and conditions, payment policies, and 
                    understand that the security deposit is refundable upon checkout 
                    subject to property condition assessment.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : `Book Now - Pay ₹${calculateTotal().toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            {/* Hostel Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={hostel.photos[0]}
                    alt={hostel.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{hostel.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {hostel.city}, {hostel.state}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly rent</span>
                    <span>₹{hostel.rentPerBed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span>{bookingData.duration} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available beds</span>
                    <span className="text-green-600">{hostel.availableBeds}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">Warden</div>
                  <div className="text-sm text-gray-600">{hostel.wardenName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Phone</div>
                  <a 
                    href={`tel:${hostel.wardenPhone}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {hostel.wardenPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;