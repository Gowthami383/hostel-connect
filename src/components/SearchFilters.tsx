import React from 'react';

interface SearchFiltersProps {
  filters: {
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
  };
  onChange: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onChange }) => {
  const handleFilterChange = (key: string, value: any) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      onChange({
        ...filters,
        [parent]: {
          ...filters[parent as keyof typeof filters],
          [child]: value
        }
      });
    } else {
      onChange({
        ...filters,
        [key]: value
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-6">
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
            onChange={(e) => handleFilterChange('city', e.target.value)}
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
            onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
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
                  onChange={(e) => handleFilterChange(`amenities.${amenity}`, e.target.checked)}
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
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;