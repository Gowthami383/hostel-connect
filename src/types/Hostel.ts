export interface Hostel {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  
  // Room details
  totalRooms: number;
  totalBeds: number;
  availableBeds: number;
  
  // Pricing
  rentPerBed: number;
  securityDeposit: number;
  
  // Amenities
  amenities: {
    wifi: boolean;
    ac: boolean;
    food: boolean;
    laundry: boolean;
    parking: boolean;
    gym: boolean;
    studyRoom: boolean;
    cctv: boolean;
  };
  
  // Photos
  photos: string[];
  
  // Rules and policies
  rules: string[];
  
  // Contact
  wardenName?: string;
  wardenPhone?: string;
  
  // Status
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}