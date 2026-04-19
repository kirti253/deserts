import { demoListings, generateMockPriceInsight } from "@/lib/mockData";
import { getLocalListings, removeLocalListing, saveLocalListing } from "@/lib/storage";
import {
  CropListing,
  ListingFilters,
  ListingFormValues,
  PriceInsight,
  UserProfile
} from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

function buildQuery(filters: ListingFilters = {}) {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.location) {
    params.set("location", filters.location);
  }

  if (filters.farmerPhone) {
    params.set("farmerPhone", filters.farmerPhone);
  }

  const query = params.toString();

  return query ? `?${query}` : "";
}

function mergeListings(serverListings: CropListing[], localListings: CropListing[]) {
  const map = new Map<number | string, CropListing>();

  [...serverListings, ...demoListings, ...localListings].forEach((listing) => {
    map.set(listing.id, listing);
  });

  return Array.from(map.values()).sort((first, second) => {
    const firstTime = new Date(first.createdAt || 0).getTime();
    const secondTime = new Date(second.createdAt || 0).getTime();

    return secondTime - firstTime;
  });
}

function filterListings(listings: CropListing[], filters: ListingFilters = {}) {
  return listings.filter((listing) => {
    const matchesSearch = filters.search
      ? listing.cropName.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchesLocation = filters.location
      ? listing.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesPhone = filters.farmerPhone ? listing.contactNumber === filters.farmerPhone : true;

    return matchesSearch && matchesLocation && matchesPhone;
  });
}

export async function registerUser(payload: Omit<UserProfile, "id" | "createdAt">): Promise<UserProfile> {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return (await response.json()) as UserProfile;
  } catch {
    return {
      id: `local-user-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString()
    };
  }
}

export async function getListings(filters: ListingFilters = {}): Promise<CropListing[]> {
  const localListings = getLocalListings();

  try {
    const response = await fetch(`${API_BASE}/listings${buildQuery(filters)}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }

    const serverListings = (await response.json()) as CropListing[];

    return filterListings(mergeListings(serverListings, localListings), filters);
  } catch {
    return filterListings(mergeListings([], localListings), filters);
  }
}

export async function createListing(values: ListingFormValues): Promise<CropListing> {
  const payload = {
    farmerName: values.farmerName.trim(),
    cropName: values.cropName.trim(),
    price: Number(values.price),
    quantity: values.quantity.trim(),
    location: values.location.trim(),
    contactNumber: values.contactNumber.trim()
  };

  try {
    const response = await fetch(`${API_BASE}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Failed to create listing");
    }

    return (await response.json()) as CropListing;
  } catch {
    const localListing: CropListing = {
      id: `local-listing-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString()
    };

    saveLocalListing(localListing);
    return localListing;
  }
}

export async function deleteListing(id: number | string, contactNumber: string) {
  if (String(id).startsWith("local-listing")) {
    removeLocalListing(id);
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE}/listings/${id}?contactNumber=${encodeURIComponent(contactNumber)}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete listing");
    }
  } catch {
    removeLocalListing(id);
  }
}

export async function getPriceInsight(listing: CropListing): Promise<PriceInsight> {
  try {
    const query = new URLSearchParams({
      cropName: listing.cropName,
      farmerPrice: String(listing.price)
    });

    const response = await fetch(`${API_BASE}/prices/compare?${query.toString()}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Failed to compare price");
    }

    return (await response.json()) as PriceInsight;
  } catch {
    return generateMockPriceInsight(listing.cropName, listing.price);
  }
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

