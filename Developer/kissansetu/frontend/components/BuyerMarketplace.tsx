"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { formatCurrency, getListings, getPriceInsight } from "@/lib/api";
import { getStoredUser } from "@/lib/storage";
import { CropListing, PriceInsight, UserProfile } from "@/lib/types";
import { PriceComparisonModal } from "@/components/PriceComparisonModal";

function buildWhatsAppLink(listing: CropListing) {
  const digits = listing.contactNumber.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hello ${listing.farmerName}, I am interested in your ${listing.cropName} listing on Farmer Direct Market.`
  );

  return `https://wa.me/${digits}?text=${message}`;
}

export function BuyerMarketplace() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [listings, setListings] = useState<CropListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<CropListing | null>(null);
  const [priceInsight, setPriceInsight] = useState<PriceInsight | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadMarketplace() {
      setLoading(true);
      const data = await getListings({
        search: deferredSearch,
        location
      });

      if (!isMounted) {
        return;
      }

      startTransition(() => {
        setListings(data);
      });
      setLoading(false);
    }

    loadMarketplace();

    return () => {
      isMounted = false;
    };
  }, [deferredSearch, location]);

  async function handleCompare(listing: CropListing) {
    setSelectedListing(listing);
    setPriceInsight(null);
    setPriceLoading(true);

    const insight = await getPriceInsight(listing);
    setPriceInsight(insight);
    setPriceLoading(false);
  }

  return (
    <div className="content-shell dashboard-shell">
      <section className="dashboard-intro">
        <div>
          <span className="eyebrow">Buyer marketplace</span>
          <h1>Browse crops directly from farmers</h1>
          <p>
            Search by crop, filter by location, compare prices, and contact farmers without any
            middle layer.
          </p>
        </div>
        <div className="stat-row">
          <div className="mini-card">
            <strong>{listings.length}</strong>
            <span>Listings visible</span>
          </div>
          <div className="mini-card">
            <strong>{user?.name || "Guest buyer"}</strong>
            <span>Current session</span>
          </div>
        </div>
      </section>

      {!user || user.role !== "buyer" ? (
        <div className="info-banner">
          <p>Want a saved buyer session? Create a quick buyer profile for a smoother demo flow.</p>
          <Link href="/auth?role=buyer" className="button button-secondary">
            Continue as Buyer
          </Link>
        </div>
      ) : null}

      <section className="panel-card filter-panel">
        <label className="field">
          <span>Search by crop name</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tomato, wheat, onion..."
          />
        </label>
        <label className="field">
          <span>Filter by location</span>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Search Nashik, Jaipur..."
          />
        </label>
      </section>

      {loading ? (
        <div className="panel-card">
          <p className="muted-copy">Loading marketplace listings...</p>
        </div>
      ) : (
        <section className="listing-grid">
          {listings.map((listing) => (
            <article key={listing.id} className="listing-card">
              <div className="listing-topline">
                <div>
                  <span className="listing-title">{listing.cropName}</span>
                  <p>{listing.farmerName}</p>
                </div>
                <span className="price-chip">{formatCurrency(listing.price)}</span>
              </div>

              <div className="listing-meta">
                <span>{listing.location}</span>
                <span>{listing.quantity}</span>
              </div>

              <div className="listing-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => handleCompare(listing)}
                >
                  Compare Price
                </button>
                <a
                  className="button button-primary"
                  href={buildWhatsAppLink(listing)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact Farmer
                </a>
              </div>

              <a className="text-link" href={`tel:${listing.contactNumber}`}>
                Call {listing.contactNumber}
              </a>
            </article>
          ))}

          {listings.length === 0 ? (
            <div className="panel-card empty-inline">
              <p>No crops match your search right now. Try clearing the filters.</p>
            </div>
          ) : null}
        </section>
      )}

      <PriceComparisonModal
        isOpen={Boolean(selectedListing)}
        listing={selectedListing}
        insight={priceInsight}
        loading={priceLoading}
        onClose={() => {
          setSelectedListing(null);
          setPriceInsight(null);
          setPriceLoading(false);
        }}
      />
    </div>
  );
}

