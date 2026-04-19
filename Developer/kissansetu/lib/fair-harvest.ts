export type UserRole = "farmer" | "buyer";

export type User = {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type Crop = {
  id: string;
  crop_name: string;
  price: number;
  quantity: string;
  location: string;
  contact: string;
  farmer_id: string;
  farmer_name: string;
};

export type ComparisonData = {
  farmer_price: number;
  market_price: number;
  insight: string;
};

const STORAGE_KEYS = {
  crops: "fair-harvest-crops",
  currentUser: "fair-harvest-current-user",
  users: "fair-harvest-users",
} as const;

const seededUsers: User[] = [
  {
    id: "farmer-1",
    name: "Savita Patil",
    phone: "+91 9876543210",
    role: "farmer",
  },
  {
    id: "farmer-2",
    name: "Ramesh Gowda",
    phone: "+91 9876543211",
    role: "farmer",
  },
  {
    id: "farmer-3",
    name: "Anjali Deshmukh",
    phone: "+91 9876543212",
    role: "farmer",
  },
  {
    id: "buyer-1",
    name: "Meera Traders",
    phone: "+91 9876543299",
    role: "buyer",
  },
];

export const defaultCrops: Crop[] = [
  {
    id: "crop-1",
    crop_name: "Tomato",
    price: 26,
    quantity: "500 kg",
    location: "Nashik, Maharashtra",
    contact: "+91 9876543210",
    farmer_id: "farmer-1",
    farmer_name: "Savita Patil",
  },
  {
    id: "crop-2",
    crop_name: "Onion",
    price: 21,
    quantity: "1.2 tons",
    location: "Hubballi, Karnataka",
    contact: "+91 9876543211",
    farmer_id: "farmer-2",
    farmer_name: "Ramesh Gowda",
  },
  {
    id: "crop-3",
    crop_name: "Green Chilli",
    price: 44,
    quantity: "320 kg",
    location: "Pune, Maharashtra",
    contact: "+91 9876543212",
    farmer_id: "farmer-3",
    farmer_name: "Anjali Deshmukh",
  },
  {
    id: "crop-4",
    crop_name: "Cauliflower",
    price: 18,
    quantity: "280 kg",
    location: "Indore, Madhya Pradesh",
    contact: "+91 9876543210",
    farmer_id: "farmer-1",
    farmer_name: "Savita Patil",
  },
];

export const cropGallery = [
  "https://images.unsplash.com/photo-1523755292440-3a72acfa3c24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxmYXJtZXIlMjBvcmdhbmljJTIwZnJlc2glMjB2ZWdldGFibGVzJTIwcHJvZHVjZXxlbnwwfHx8fDE3NzY1MzQ1MzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1760905066161-ed10663cee32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxmcmVzaCUyMHRvbWF0b2VzJTIwZmFybSUyMG1hcmtldHxlbnwwfHx8fDE3NzY1MzQ1MzV8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1722810767143-40a6a7a74b13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBvcmdhbmljJTIwZnJlc2glMjB2ZWdldGFibGVzJTIwcHJvZHVjZXxlbnwwfHx8fDE3NzY1MzQ1MzB8MA&ixlib=rb-4.1.0&q=85",
];

const marketBenchmarks: Record<
  string,
  { insight: string; marketPrice: number }
> = {
  cauliflower: {
    marketPrice: 20.5,
    insight:
      "Your cauliflower listing sits a little under the current market average, which can help attract quick wholesale interest while still protecting your margin.",
  },
  "green chilli": {
    marketPrice: 41.75,
    insight:
      "Green chilli prices are running hot this week, and your quote is slightly above average. Buyers may still accept it if the quality and freshness are strong.",
  },
  onion: {
    marketPrice: 23.4,
    insight:
      "Your onion price is slightly below the blended mandi average, making it competitive for bulk buyers comparing multiple lots from nearby regions.",
  },
  tomato: {
    marketPrice: 28.1,
    insight:
      "Tomato rates are trending upward across nearby markets. Your price is a little below the current average, which could help you convert faster without feeling underpriced.",
  },
};

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function seedFairHarvestData() {
  if (!isBrowser()) {
    return;
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.users)) {
    writeJson(STORAGE_KEYS.users, seededUsers);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.crops)) {
    writeJson(STORAGE_KEYS.crops, defaultCrops);
  }
}

export function getUsers() {
  seedFairHarvestData();
  return readJson<User[]>(STORAGE_KEYS.users, seededUsers);
}

export function saveUsers(users: User[]) {
  writeJson(STORAGE_KEYS.users, users);
}

export function getCurrentUser() {
  seedFairHarvestData();
  return readJson<User | null>(STORAGE_KEYS.currentUser, null);
}

export function setCurrentUser(user: User | null) {
  if (!isBrowser()) {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(STORAGE_KEYS.currentUser);
    return;
  }

  writeJson(STORAGE_KEYS.currentUser, user);
}

export function getCrops() {
  seedFairHarvestData();
  return readJson<Crop[]>(STORAGE_KEYS.crops, defaultCrops);
}

export function saveCrops(crops: Crop[]) {
  writeJson(STORAGE_KEYS.crops, crops);
}

export function findUserByPhone(phone: string) {
  const normalizedPhone = normalizePhone(phone);

  return (
    getUsers().find((user) => normalizePhone(user.phone) === normalizedPhone) ??
    null
  );
}

export function createUser(input: Omit<User, "id">) {
  const newUser: User = {
    ...input,
    id: createId(),
  };

  const users = [newUser, ...getUsers()];
  saveUsers(users);
  setCurrentUser(newUser);

  return newUser;
}

export function getComparisonData(crop: Crop): ComparisonData {
  const benchmark = marketBenchmarks[crop.crop_name.toLowerCase()];
  const marketPrice =
    benchmark?.marketPrice ?? Number((crop.price * 1.08).toFixed(2));

  const priceDifference = crop.price - marketPrice;
  const absoluteDifference = Math.abs(priceDifference).toFixed(2);

  const insight =
    benchmark?.insight ??
    (priceDifference <= 0
      ? `Your price is ₹${absoluteDifference} below the nearby market average, which gives buyers a strong reason to engage quickly.`
      : `Your price is ₹${absoluteDifference} above the nearby market average, so highlighting freshness, quantity, or delivery convenience can justify the premium.`);

  return {
    farmer_price: crop.price,
    market_price: marketPrice,
    insight,
  };
}

