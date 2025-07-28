import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, Users, Shield, Star, MapPin, Wifi, Car } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: 'Smart Search',
      description: 'Find hostels based on location, price, amenities, and college proximity'
    },
    {
      icon: <Building2 className="h-8 w-8 text-green-600" />,
      title: 'Verified Hostels',
      description: 'All hostels are verified with authentic photos and accurate information'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Easy Management',
      description: 'Hostel owners can easily manage bookings, availability, and pricing'
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: 'Secure Payments',
      description: 'Safe and secure online payment system with instant confirmations'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Engineering Student',
      content: 'Found the perfect hostel near my college with all amenities. The booking process was so simple!',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      role: 'Hostel Owner',
      content: 'Managing my hostel bookings has never been easier. Great platform for connecting with students.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-blue-600"> Hostel</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect students with quality hostels. Search, compare, and book your ideal accommodation with ease.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register?role=student"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Find Hostels
              </Link>
              <Link
                to="/register?role=owner"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                List Your Hostel
              </Link>
            </div>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <img
              src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Modern hostel room"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HostelHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding and managing hostel accommodations simple, secure, and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-2 bg-gray-50"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* For Students */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-8">For Students</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Search & Filter</h4>
                    <p className="text-gray-600">Find hostels by location, price, and amenities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Compare & Choose</h4>
                    <p className="text-gray-600">View photos, read reviews, and compare options</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Book & Pay</h4>
                    <p className="text-gray-600">Secure online booking with instant confirmation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Owners */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-8">For Hostel Owners</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Register Hostel</h4>
                    <p className="text-gray-600">Create your hostel profile with photos and details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Manage Bookings</h4>
                    <p className="text-gray-600">Track availability, approve bookings, and manage payments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Grow Revenue</h4>
                    <p className="text-gray-600">Reach more students and maximize your occupancy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and hostel owners who trust HostelHub for their accommodation needs.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;