"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  PackageIcon,
  PlusIcon,
  SignOutIcon,
  TrashIcon,
} from "@/app/components/fair-harvest/icons";
import {
  getCrops,
  getCurrentUser,
  saveCrops,
  seedFairHarvestData,
  setCurrentUser,
  type Crop,
  type User,
} from "@/lib/fair-harvest";

type FormState = {
  contact: string;
  crop_name: string;
  location: string;
  price: string;
  quantity: string;
};

const emptyFormState: FormState = {
  contact: "",
  crop_name: "",
  location: "",
  price: "",
  quantity: "",
};

export default function FarmerDashboardClient() {
  const router = useRouter();

  const [crops, setCrops] = useState<Crop[]>([]);
  const [formData, setFormData] = useState<FormState>(emptyFormState);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    seedFairHarvestData();

    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.replace("/auth?role=farmer");
      return;
    }

    if (currentUser.role !== "farmer") {
      router.replace("/marketplace");
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setUser(currentUser);
      setCrops(getCrops().filter((crop) => crop.farmer_id === currentUser.id));
      setFormData((current) => ({ ...current, contact: currentUser.phone }));
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    setSubmitting(true);

    const nextCrop: Crop = {
      id: `${Date.now()}`,
      crop_name: formData.crop_name.trim(),
      farmer_id: user.id,
      farmer_name: user.name,
      contact: formData.contact.trim(),
      location: formData.location.trim(),
      price: Number.parseFloat(formData.price),
      quantity: formData.quantity.trim(),
    };

    const updatedCrops = [nextCrop, ...getCrops()];
    saveCrops(updatedCrops);
    setCrops(updatedCrops.filter((crop) => crop.farmer_id === user.id));
    setFormData({
      ...emptyFormState,
      contact: user.phone,
    });
    setSubmitting(false);
  };

  const handleDelete = (cropId: string) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) {
      return;
    }

    const updatedCrops = getCrops().filter((crop) => crop.id !== cropId);
    saveCrops(updatedCrops);
    setCrops(updatedCrops.filter((crop) => crop.farmer_id === user?.id));
  };

  if (!ready || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F9F8F6] text-[#4A5D4E]">
        Loading dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      <header className="sticky top-0 z-50 border-b border-[#E5E2DC] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1C2B20]">
              Farmer Dashboard
            </h1>
            <p className="text-sm text-[#4A5D4E]">Welcome, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/marketplace"
              className="text-sm font-medium text-[#4A5D4E] transition-colors hover:text-[#1C2B20]"
            >
              Marketplace
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="h-fit rounded-lg border border-[#E5E2DC] bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32]/10 text-[#2E7D32]">
                <PlusIcon size={24} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#1C2B20]">
                Add New Crop
              </h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                {
                  id: "crop_name",
                  label: "Crop Name",
                  placeholder: "e.g., Tomato, Rice, Wheat",
                  type: "text",
                },
                {
                  id: "price",
                  label: "Price (₹/kg)",
                  placeholder: "Enter price per kg",
                  type: "number",
                },
                {
                  id: "quantity",
                  label: "Quantity",
                  placeholder: "e.g., 500 kg, 2 tons",
                  type: "text",
                },
                {
                  id: "location",
                  label: "Location",
                  placeholder: "e.g., Pune, Maharashtra",
                  type: "text",
                },
                {
                  id: "contact",
                  label: "Contact Number",
                  placeholder: "Your contact number",
                  type: "tel",
                },
              ].map(({ id, label, placeholder, type }) => (
                <div key={id}>
                  <label className="mb-2 block text-sm font-medium text-[#1C2B20]">
                    {label}
                  </label>
                  <input
                    required
                    step={id === "price" ? "0.01" : undefined}
                    type={type}
                    value={formData[id as keyof FormState]}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        [id]: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#E5E2DC] bg-white px-4 py-3 text-[#1C2B20] transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-[#2E7D32] px-6 py-3 font-medium tracking-wide text-white shadow-sm transition-all hover:bg-[#246428] disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Crop"}
              </button>
            </form>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D35400]/10 text-[#D35400]">
                <PackageIcon size={24} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#1C2B20]">
                My Listings
              </h2>
            </div>

            {crops.length === 0 ? (
              <div className="rounded-lg border border-[#E5E2DC] bg-white p-8 text-center text-[#4A5D4E]">
                No crops listed yet. Add your first crop!
              </div>
            ) : (
              <div className="space-y-4">
                {crops.map((crop) => (
                  <article
                    key={crop.id}
                    className="rounded-lg border border-[#E5E2DC] bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-heading mb-2 text-xl font-medium text-[#1C2B20]">
                          {crop.crop_name}
                        </h3>
                        <div className="space-y-1 text-sm text-[#4A5D4E]">
                          <p>
                            <span className="font-medium">Price:</span> ₹
                            {crop.price}/kg
                          </p>
                          <p>
                            <span className="font-medium">Quantity:</span>{" "}
                            {crop.quantity}
                          </p>
                          <p>
                            <span className="font-medium">Location:</span>{" "}
                            {crop.location}
                          </p>
                          <p>
                            <span className="font-medium">Contact:</span>{" "}
                            {crop.contact}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(crop.id)}
                        className="p-2 text-red-500 transition-colors hover:text-red-700"
                      >
                        <TrashIcon size={20} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

