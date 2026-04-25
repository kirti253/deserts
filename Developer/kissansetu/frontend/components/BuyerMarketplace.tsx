"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { FiMapPin, FiPhone, FiSearch, FiPackage } from "react-icons/fi";
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

      <section className="filters-section">
        <div className="panel-card filter-panel enhanced">
          <div className="filter-header">
            <h2>Find Crops</h2>
            <span className="results-count">
              {loading ? "Searching..." : `${listings.length} listings found`}
            </span>
          </div>

          <div className="filter-grid">
            <label className="field">
              <span>Search by crop</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="e.g., tomato, wheat, onion"
              />
            </label>

            <label className="field">
              <span>Filter by location</span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g., Nashik, Maharashtra"
              />
            </label>

            <div className="filter-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => {
                  setSearch("");
                  setLocation("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {!user || user.role !== "buyer" ? (
        <div className="info-banner enhanced">
          <div className="banner-content">
            <span className="banner-icon">👤</span>
            <div>
              <h3>Want a personalized experience?</h3>
              <p>Create a quick buyer profile to save your preferences and get better recommendations.</p>
            </div>
          </div>
          <Link href="/auth?role=buyer" className="button button-secondary">
            Create Buyer Profile
          </Link>
        </div>
      ) : null}

      {loading ? (
        <div className="loading-section">
          <div className="loading-card">
            <div className="spinner-large"></div>
            <h3>Finding fresh crops...</h3>
            <p>We're searching through farmer listings to find the best matches for you.</p>
          </div>
        </div>
      ) : (
        <section className="listings-section">
          {listings.length === 0 ? (
            <div className="empty-results">
              <FiSearch className="empty-icon" />
              <h3>No crops found</h3>
              <p>Try adjusting your search terms or clearing the filters to see more listings.</p>
              <button
                className="button button-primary"
                onClick={() => {
                  setSearch("");
                  setLocation("");
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="listing-grid enhanced">
              {listings.map((listing) => (
                <article key={listing.id} className="listing-card buyer-card enhanced">
                  <div className="card-header">
                    <div className="crop-badge">
                      <span className="crop-name">{listing.cropName}</span>
                    </div>
                    <div className="price-display">
                      <span className="price-amount">{formatCurrency(listing.price)}</span>
                      <span className="price-unit">per unit</span>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="farmer-info">
                      <span className="farmer-name">{listing.farmerName}</span>
                      <span className="farmer-label">Farmer</span>
                    </div>

                    <div className="listing-details">
                      <div className="detail-row">
                        <FiPackage className="detail-icon" />
                        <span className="detail-text">{listing.quantity}</span>
                      </div>
                      <div className="detail-row">
                        <FiMapPin className="detail-icon" />
                        <span className="detail-text">{listing.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      type="button"
                      className="button button-secondary button-sm"
                      onClick={() => handleCompare(listing)}
                      disabled={priceLoading}
                    >
                      {priceLoading ? (
                        <>
                          <FiLoader className="spinner" />
                          Analyzing...
                        </>
                      ) : (
                        "Compare Price"
                      )}
                    </button>

                    <a
                      className="button button-primary button-sm"
                      href={buildWhatsAppLink(listing)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact Farmer
                    </a>
                  </div>

                  <div className="card-footer">
                    <a
                      className="contact-link"
                      href={`tel:${listing.contactNumber}`}
                    >
                      <FiPhone className="contact-icon" />
                      Call {listing.contactNumber}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
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

