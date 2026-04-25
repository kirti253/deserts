"use client";

import Link from "next/link";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { FiMapPin, FiPhone, FiX, FiLoader } from "react-icons/fi";
import { GiWheat } from "react-icons/gi";
import { createListing, deleteListing, formatCurrency, getListings } from "@/lib/api";
import { getStoredUser } from "@/lib/storage";
import { CropListing, ListingFormValues, UserProfile } from "@/lib/types";

const emptyForm: ListingFormValues = {
  farmerName: "",
  cropName: "",
  price: "",
  quantity: "",
  location: "",
  contactNumber: ""
};

export function FarmerDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [form, setForm] = useState<ListingFormValues>(emptyForm);
  const [listings, setListings] = useState<CropListing[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);

    if (currentUser?.role === "farmer") {
      setForm((currentForm) => ({
        ...currentForm,
        farmerName: currentUser.name,
        contactNumber: currentUser.phone
      }));
    }
  }, []);

  useEffect(() => {
    if (!user?.phone || user.role !== "farmer") {
      setLoading(false);
      return;
    }

    const farmerPhone = user.phone;
    let isMounted = true;

    async function loadListings() {
      setLoading(true);
      const data = await getListings({ farmerPhone });

      if (!isMounted) {
        return;
      }

      startTransition(() => {
        setListings(data);
      });
      setLoading(false);
    }

    loadListings();

    return () => {
      isMounted = false;
    };
  }, [user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (Object.values(form).some((value) => !value.trim())) {
      setError("Please complete all crop listing fields.");
      return;
    }

    setSubmitting(true);

    try {
      const created = await createListing(form);
      startTransition(() => {
        setListings((currentListings) => [created, ...currentListings]);
      });
      setForm((currentForm) => ({
        ...emptyForm,
        farmerName: user?.name || currentForm.farmerName,
        contactNumber: user?.phone || currentForm.contactNumber
      }));
    } catch {
      setError("We could not add the crop listing right now.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number | string) {
    if (!user?.phone) {
      return;
    }

    await deleteListing(id, user.phone);
    setListings((currentListings) => currentListings.filter((listing) => listing.id !== id));
  }

  if (!user || user.role !== "farmer") {
    return (
      <div className="content-shell">
        <div className="empty-state">
          <span className="eyebrow">Farmer access</span>
          <h1>Sign in as a farmer to manage listings</h1>
          <p>Create your quick profile first, then you can add crops, prices, and location details.</p>
          <Link href="/auth?role=farmer" className="button button-primary">
            Continue as Farmer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="content-shell dashboard-shell">
      <section className="dashboard-intro">
        <div>
          <span className="eyebrow">Farmer dashboard</span>
          <h1>Welcome back, {user.name}</h1>
          <p>Add fresh crop listings and let buyers contact you directly.</p>
        </div>
        <div className="stat-row">
          <div className="mini-card">
            <strong>{listings.length}</strong>
            <span>My active listings</span>
          </div>
          <div className="mini-card">
            <strong>{user.phone}</strong>
            <span>Contact number</span>
          </div>
        </div>
      </section>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <form className="listing-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>List Your Crop</h2>
              <p>Fill in the details below</p>
            </div>

            <div className="form-inputs">
              <label className="form-field compact">
                <span className="field-label">Crop Name</span>
                <input
                  type="text"
                  value={form.cropName}
                  onChange={(event) => setForm({ ...form, cropName: event.target.value })}
                  placeholder="Tomato, Wheat, etc."
                  required
                />
              </label>

              <div className="form-row">
                <label className="form-field compact">
                  <span className="field-label">Price</span>
                  <div className="input-with-icon">
                    <span className="currency-symbol">₹</span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(event) => setForm({ ...form, price: event.target.value })}
                      placeholder="0"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </label>

                <label className="form-field compact">
                  <span className="field-label">Quantity</span>
                  <input
                    type="text"
                    value={form.quantity}
                    onChange={(event) => setForm({ ...form, quantity: event.target.value })}
                    placeholder="50 kg"
                    required
                  />
                </label>
              </div>

              <label className="form-field compact">
                <span className="field-label">Location</span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                  placeholder="City, State"
                  required
                />
              </label>

              <label className="form-field compact">
                <span className="field-label">Your Name</span>
                <input
                  type="text"
                  value={form.farmerName}
                  onChange={(event) => setForm({ ...form, farmerName: event.target.value })}
                  placeholder="Full name"
                  required
                />
              </label>

              <label className="form-field compact">
                <span className="field-label">Contact Number</span>
                <input
                  type="tel"
                  value={form.contactNumber}
                  onChange={(event) => setForm({ ...form, contactNumber: event.target.value })}
                  placeholder="+91 9876543210"
                  inputMode="tel"
                  required
                />
              </label>
            </div>

            {error && <div className="form-error-box">{error}</div>}

            <button type="submit" className="button button-primary button-full form-submit" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner-small"></span>
                  Posting...
                </>
              ) : (
                "Post Listing"
              )}
            </button>
          </form>
        </div>

        <div className="dashboard-main">
          <div className="listings-header">
            <h2>Your Active Listings</h2>
            <span className="listings-count">{listings.length}</span>
          </div>

          {loading ? (
            <div className="listings-loading">
              <div className="spinner-large"></div>
              <p>Loading your listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="listings-empty">
              <GiWheat className="empty-illustration" />
              <h3>No listings yet</h3>
              <p>Add your first crop listing using the form on the left to start connecting with buyers.</p>
            </div>
          ) : (
            <div className="listings-grid">
              {listings.map((listing) => (
                <div key={listing.id} className="listing-item">
                  <div className="listing-crop">
                    <GiWheat className="crop-icon" />
                    <div className="crop-title">
                      <h3>{listing.cropName}</h3>
                      <p>{listing.quantity}</p>
                    </div>
                    <span className="crop-price">{formatCurrency(listing.price)}</span>
                  </div>

                  <div className="listing-info">
                    <div className="info-item">
                      <FiMapPin className="info-icon" />
                      <span className="info-text">{listing.location}</span>
                    </div>
                    <div className="info-item">
                      <FiPhone className="info-icon" />
                      <span className="info-text">{listing.contactNumber}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="button-delete"
                    onClick={() => handleDelete(listing.id)}
                    title="Delete listing"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
