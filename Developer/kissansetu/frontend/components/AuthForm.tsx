"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import { getStoredUser, storeUser } from "@/lib/storage";
import { UserRole } from "@/lib/types";

interface AuthFormProps {
  presetRole?: string;
}

export function AuthForm({ presetRole }: AuthFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>(presetRole === "buyer" ? "buyer" : "farmer");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = getStoredUser();

    if (currentUser) {
      setName(currentUser.name);
      setPhone(currentUser.phone);
      setRole(currentUser.role);
    }
  }, []);

  useEffect(() => {
    if (presetRole === "buyer" || presetRole === "farmer") {
      setRole(presetRole);
    }
  }, [presetRole]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }

    setSubmitting(true);

    try {
      const user = await registerUser({
        name: name.trim(),
        phone: phone.trim(),
        role
      });

      storeUser(user);
      router.push(role === "farmer" ? "/farmer" : "/marketplace");
    } catch {
      setError("Unable to continue right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="panel-card form-card" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label className="field">
          <span>Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
          />
        </label>

        <label className="field">
          <span>Phone number</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Enter your phone number"
            inputMode="tel"
          />
        </label>
      </div>

      <div className="field">
        <span>Choose role</span>
        <div className="role-toggle">
          <button
            type="button"
            className={`role-pill ${role === "farmer" ? "active" : ""}`}
            onClick={() => setRole("farmer")}
          >
            Farmer
          </button>
          <button
            type="button"
            className={`role-pill ${role === "buyer" ? "active" : ""}`}
            onClick={() => setRole("buyer")}
          >
            Buyer
          </button>
        </div>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <button type="submit" className="button button-primary button-full" disabled={submitting}>
        {submitting ? "Continuing..." : "Continue"}
      </button>
    </form>
  );
}
