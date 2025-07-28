import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { Hostel } from '../types/Hostel';

interface HostelFormProps {
  hostel?: Hostel | null;
  onSubmit: (hostelData: Partial<Hostel>) => void;
  onCancel: () => void;
}

const HostelForm: React.FC<HostelFormProps> = ({ hostel, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    totalRooms: 0,
    totalBeds: 0,
    availableBeds: 0,
    rentPerBed: 0,
    securityDeposit: 0,
    amenities: {
      wifi: false,
      ac: false,
      food: false,
      laundry: false,
      parking: false,
      gym: false,
      studyRoom: false,
      cctv: false
    },
    photos: [] as string[],
    rules: [] as string[],
    wardenName: '',
    wardenPhone: ''
  });

  const [newRule, setNewRule] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (hostel) {
      setFormData({
        name: hostel.name,
        description: hostel.description,
        address: hostel.address,
        city: hostel.city,
        state: hostel.state,
        pincode: hostel.pincode,
        totalRooms: hostel.totalRooms,
        totalBeds: hostel.totalBeds,
        availableBeds: hostel.availableBeds,
        rentPerBed: hostel.rentPerBed,
        securityDeposit: hostel.securityDeposit,
        amenities: { ...hostel.amenities },
        photos: [...hostel.photos],
        rules: [...hostel.rules],
        wardenName: hostel.wardenName || '',
        wardenPhone: hostel.wardenPhone || ''
      });
    }
  }, [hostel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name.startsWith('amenities.')) {
        const amenityName = name.split('.')[1];
        setFormData({
          ...formData,
          amenities: {
            ...formData.amenities,
            [amenityName]: checked
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? Number(value) : value
      });
    }
  };

  const addPhoto = () => {
    if (photoUrl.trim()) {
      setFormData({
        ...formData,
        photos: [...formData.photos, photoUrl.trim()]
      });
      setPhotoUrl('');
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index)
    });
  };

  const addRule = () => {
    if (newRule.trim()) {
      setFormData({
        ...formData,
        rules: [...formData.rules, newRule.trim()]
      });
      setNewRule('');
    }
  };

  const removeRule = (index: number) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {hostel ? 'Edit Hostel' : 'Add New Hostel'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hostel Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Details</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Rooms *
                </label>
                <input
                  type="number"
                  name="totalRooms"
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.totalRooms}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Beds *
                </label>
                <input
                  type="number"
                  name="totalBeds"
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.totalBeds}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Beds *
                </label>
                <input
                  type="number"
                  name="availableBeds"
                  required
                  min="0"
                  max={formData.totalBeds}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.availableBeds}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rent per Bed (₹/month) *
                </label>
                <input
                  type="number"
                  name="rentPerBed"
                  required
                  min="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.rentPerBed}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Security Deposit (₹) *
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {Object.keys(formData.amenities).map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`amenities.${amenity}`}
                    checked={formData.amenities[amenity as keyof typeof formData.amenities]}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {amenity === 'ac' ? 'AC' : 
                     amenity === 'wifi' ? 'Wi-Fi' : 
                     amenity === 'cctv' ? 'CCTV' :
                     amenity.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="Enter photo URL"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addPhoto}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Hostel ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Rules */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hostel Rules</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter a hostel rule"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addRule}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {formData.rules.length > 0 && (
                <ul className="space-y-2">
                  {formData.rules.map((rule, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm">{rule}</span>
                      <button
                        type="button"
                        onClick={() => removeRule(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warden Name
                </label>
                <input
                  type="text"
                  name="wardenName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.wardenName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warden Phone
                </label>
                <input
                  type="tel"
                  name="wardenPhone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.wardenPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {hostel ? 'Update Hostel' : 'Add Hostel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostelForm;