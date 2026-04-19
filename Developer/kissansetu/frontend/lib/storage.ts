import { CropListing, UserProfile } from "@/lib/types";

const USER_KEY = "fdm_user";
const LISTINGS_KEY = "fdm_local_listings";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getStoredUser(): UserProfile | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(USER_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as UserProfile;
  } catch {
    return null;
  }
}

export function storeUser(user: UserProfile) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(USER_KEY);
}

export function getLocalListings(): CropListing[] {
  if (!canUseStorage()) {
    return [];
  }

  const rawValue = window.localStorage.getItem(LISTINGS_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue) as CropListing[];
  } catch {
    return [];
  }
}

export function saveLocalListing(listing: CropListing) {
  const listings = getLocalListings();
  const updated = [listing, ...listings];

  if (canUseStorage()) {
    window.localStorage.setItem(LISTINGS_KEY, JSON.stringify(updated));
  }
}

export function removeLocalListing(id: number | string) {
  const listings = getLocalListings();
  const updated = listings.filter((listing) => listing.id !== id);

  if (canUseStorage()) {
    window.localStorage.setItem(LISTINGS_KEY, JSON.stringify(updated));
  }
}

