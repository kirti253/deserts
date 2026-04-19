export type UserRole = "farmer" | "buyer";

export interface UserProfile {
  id: number | string;
  name: string;
  phone: string;
  role: UserRole;
  createdAt?: string;
}

export interface CropListing {
  id: number | string;
  sellerId?: number | null;
  farmerName: string;
  cropName: string;
  price: number;
  quantity: string;
  location: string;
  contactNumber: string;
  createdAt?: string;
}

export interface ListingFormValues {
  farmerName: string;
  cropName: string;
  price: string;
  quantity: string;
  location: string;
  contactNumber: string;
}

export interface PriceInsight {
  cropName: string;
  farmerPrice: number;
  averageMarketPrice: number;
  insight: string;
  recommendation: string;
  summary: string;
}

export interface ListingFilters {
  search?: string;
  location?: string;
  farmerPhone?: string;
}

