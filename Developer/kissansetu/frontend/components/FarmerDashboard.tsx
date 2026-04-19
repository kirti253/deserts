"use client";

import Link from "next/link";
import { FormEvent, startTransition, useEffect, useState } from "react";
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

      <div className="dashboard-grid">
        <form className="panel-card form-card" onSubmit={handleSubmit}>
          <div className="section-heading compact">
            <span className="eyebrow">Add crop</span>
            <h2>Create a new listing</h2>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Crop Name</span>
              <input
                value={form.cropName}
                onChange={(event) => setForm({ ...form, cropName: event.target.value })}
                placeholder="Tomato"
              />
            </label>

            <label className="field">
              <span>Price</span>
              <input
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value })}
                placeholder="18"
                inputMode="decimal"
              />
            </label>

            <label className="field">
              <span>Quantity</span>
              <input
                value={form.quantity}
                onChange={(event) => setForm({ ...form, quantity: event.target.value })}
                placeholder="50 kg"
              />
            </label>

            <label className="field">
              <span>Location</span>
              <input
                value={form.location}
                onChange={(event) => setForm({ ...form, location: event.target.value })}
                placeholder="Nashik"
              />
            </label>

            <label className="field">
              <span>Farmer name</span>
              <input
                value={form.farmerName}
                onChange={(event) => setForm({ ...form, farmerName: event.target.value })}
                placeholder="Your name"
              />
            </label>

            <label className="field">
              <span>Contact Number</span>
              <input
                value={form.contactNumber}
                onChange={(event) => setForm({ ...form, contactNumber: event.target.value })}
                placeholder="Phone number"
                inputMode="tel"
              />
            </label>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="button button-primary button-full" disabled={submitting}>
            {submitting ? "Adding crop..." : "Add Crop"}
          </button>
        </form>

        <div className="panel-card listings-panel">
          <div className="section-heading compact">
            <span className="eyebrow">My listings</span>
            <h2>Current crop cards</h2>
          </div>

          {loading ? (
            <p className="muted-copy">Loading your listings...</p>
          ) : listings.length === 0 ? (
            <div className="empty-inline">
              <p>No listings yet. Add your first crop to start getting buyer interest.</p>
            </div>
          ) : (
            <div className="listing-stack">
              {listings.map((listing) => (
                <article key={listing.id} className="listing-card farmer-card">
                  <div className="listing-topline">
                    <div>
                      <span className="listing-title">{listing.cropName}</span>
                      <p>
                        {listing.quantity} • {listing.location}
                      </p>
                    </div>
                    <span className="price-chip">{formatCurrency(listing.price)}</span>
                  </div>
                  <div className="listing-footer">
                    <span>Contact: {listing.contactNumber}</span>
                    <button
                      type="button"
                      className="button button-danger"
                      onClick={() => handleDelete(listing.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
