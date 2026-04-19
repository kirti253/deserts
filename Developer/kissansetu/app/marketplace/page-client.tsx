"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CartIcon,
  MapPinIcon,
  SearchIcon,
  SignOutIcon,
} from "@/app/components/fair-harvest/icons";
import {
  ContactModal,
  PriceComparisonModal,
} from "@/app/components/fair-harvest/modals";
import {
  cropGallery,
  getCrops,
  getCurrentUser,
  seedFairHarvestData,
  setCurrentUser,
  type Crop,
  type User,
} from "@/lib/fair-harvest";

export default function MarketplaceClient() {
  const router = useRouter();

  const [crops, setCrops] = useState<Crop[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [ready, setReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    seedFairHarvestData();

    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.replace("/auth?role=buyer");
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setUser(currentUser);
      setCrops(getCrops());
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/");
  };

  const filteredCrops = crops.filter((crop) => {
    const matchesQuery = crop.crop_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLocation = crop.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase());

    return matchesQuery && matchesLocation;
  });

  if (!ready || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F9F8F6] text-[#4A5D4E]">
        Loading marketplace...
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#F9F8F6]">
        <header className="sticky top-0 z-50 border-b border-[#E5E2DC] bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="font-heading text-2xl font-bold text-[#1C2B20]">
                Marketplace
              </h1>
              <p className="text-sm text-[#4A5D4E]">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/farmer-dashboard"
                className="text-sm font-medium text-[#4A5D4E] transition-colors hover:text-[#1C2B20]"
              >
                Farmer Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-[#4A5D4E] transition-colors hover:text-[#1C2B20]"
              >
                <SignOutIcon size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative">
              <SearchIcon
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5D4E]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by crop name..."
                className="w-full rounded-lg border border-[#E5E2DC] bg-white py-3 pl-12 pr-4 text-[#1C2B20] transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
            <div className="relative">
              <MapPinIcon
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5D4E]"
              />
              <input
                type="text"
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}
                placeholder="Filter by location..."
                className="w-full rounded-lg border border-[#E5E2DC] bg-white py-3 pl-12 pr-4 text-[#1C2B20] transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {filteredCrops.length === 0 ? (
            <div className="rounded-lg border border-[#E5E2DC] bg-white p-12 text-center">
              <CartIcon size={48} className="mx-auto mb-4 text-[#4A5D4E]" />
              <p className="text-lg text-[#4A5D4E]">
                No crops found matching your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCrops.map((crop, index) => (
                <article
                  key={crop.id}
                  className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E5E2DC] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      fill
                      alt={crop.crop_name}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      src={cropGallery[index % cropGallery.length]}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-heading mb-3 text-xl font-medium text-[#1C2B20]">
                      {crop.crop_name}
                    </h2>

                    <div className="mb-4 flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#4A5D4E]">Price:</span>
                        <span className="text-lg font-bold text-[#2E7D32]">
                          ₹{crop.price}/kg
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#4A5D4E]">Quantity:</span>
                        <span className="text-sm font-medium text-[#1C2B20]">
                          {crop.quantity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon size={16} className="text-[#4A5D4E]" />
                        <span className="text-sm text-[#4A5D4E]">
                          {crop.location}
                        </span>
                      </div>
                      <div className="border-t border-[#E5E2DC] pt-2">
                        <p className="text-xs text-[#4A5D4E]">
                          Farmer: {crop.farmer_name}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCrop(crop);
                          setShowPriceModal(true);
                        }}
                        className="w-full rounded-lg border border-[#2E7D32] bg-transparent px-4 py-2 font-medium text-[#2E7D32] transition-all hover:bg-[#2E7D32] hover:text-white"
                      >
                        Compare Price
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCrop(crop);
                          setShowContactModal(true);
                        }}
                        className="w-full rounded-lg bg-[#D35400] px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-[#A84300]"
                      >
                        Contact Farmer
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {showPriceModal && selectedCrop ? (
        <PriceComparisonModal
          crop={selectedCrop}
          onClose={() => setShowPriceModal(false)}
        />
      ) : null}

      {showContactModal && selectedCrop ? (
        <ContactModal
          crop={selectedCrop}
          onClose={() => setShowContactModal(false)}
        />
      ) : null}
    </>
  );
}
