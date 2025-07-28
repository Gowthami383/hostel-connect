import React, { useState, useEffect } from 'react';
import { Plus, Edit, Eye, Trash2, Users, Bed, DollarSign, TrendingUp } from 'lucide-react';
import { User } from '../types/User';
import { Hostel } from '../types/Hostel';
import HostelForm from '../components/HostelForm';
import HostelCard from '../components/HostelCard';

interface OwnerDashboardProps {
  user: User;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ user }) => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [showHostelForm, setShowHostelForm] = useState(false);
  const [editingHostel, setEditingHostel] = useState<Hostel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    const mockHostels: Hostel[] = [
      {
        id: '1',
        ownerId: user.id,
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
      }
    ];

    setTimeout(() => {
      setHostels(mockHostels);
      setIsLoading(false);
    }, 1000);
  }, [user.id]);

  const handleAddHostel = (hostelData: Partial<Hostel>) => {
    const newHostel: Hostel = {
      id: Date.now().toString(),
      ownerId: user.id,
      ...hostelData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Hostel;

    setHostels([...hostels, newHostel]);
    setShowHostelForm(false);
  };

  const handleEditHostel = (hostelData: Partial<Hostel>) => {
    if (editingHostel) {
      const updatedHostels = hostels.map(h => 
        h.id === editingHostel.id 
          ? { ...h, ...hostelData, updatedAt: new Date() }
          : h
      );
      setHostels(updatedHostels);
      setEditingHostel(null);
      setShowHostelForm(false);
    }
  };

  const handleDeleteHostel = (id: string) => {
    if (window.confirm('Are you sure you want to delete this hostel?')) {
      setHostels(hostels.filter(h => h.id !== id));
    }
  };

  const totalBeds = hostels.reduce((sum, h) => sum + h.totalBeds, 0);
  const occupiedBeds = hostels.reduce((sum, h) => sum + (h.totalBeds - h.availableBeds), 0);
  const monthlyRevenue = hostels.reduce((sum, h) => sum + ((h.totalBeds - h.availableBeds) * h.rentPerBed), 0);
  const occupancyRate = totalBeds > 0 ? (occupiedBeds / totalBeds * 100) : 0;

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
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bed className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{totalBeds}</h3>
                <p className="text-gray-600">Total Beds</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{occupiedBeds}</h3>
                <p className="text-gray-600">Occupied</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{occupancyRate.toFixed(1)}%</h3>
                <p className="text-gray-600">Occupancy Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">₹{monthlyRevenue.toLocaleString()}</h3>
                <p className="text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hostels Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">My Hostels</h2>
              <button
                onClick={() => setShowHostelForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Hostel</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {hostels.length === 0 ? (
              <div className="text-center py-12">
                <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels yet</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first hostel</p>
                <button
                  onClick={() => setShowHostelForm(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Hostel
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {hostels.map((hostel) => (
                  <div key={hostel.id} className="relative">
                    <HostelCard hostel={hostel} />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingHostel(hostel);
                          setShowHostelForm(true);
                        }}
                        className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteHostel(hostel.id)}
                        className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hostel Form Modal */}
      {showHostelForm && (
        <HostelForm
          hostel={editingHostel}
          onSubmit={editingHostel ? handleEditHostel : handleAddHostel}
          onCancel={() => {
            setShowHostelForm(false);
            setEditingHostel(null);
          }}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;