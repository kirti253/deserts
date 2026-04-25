"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiPhone, FiLogIn } from "react-icons/fi";
import { GiWheat } from "react-icons/gi";
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
    <form className="auth-form-card" onSubmit={handleSubmit}>
      <div className="form-inner">
        <div className="form-fields">
          <label className="auth-field">
            <span className="auth-label">Your Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              required
            />
          </label>

          <label className="auth-field">
            <span className="auth-label">Phone Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+91 9876543210"
              inputMode="tel"
              required
            />
          </label>
        </div>

        <div className="form-divider">
          <span>Select your role</span>
        </div>

        <div className="role-selection">
          <button
            type="button"
            className={`role-option ${role === "farmer" ? "active" : ""}`}
            onClick={() => setRole("farmer")}
          >
            <GiWheat className="role-icon" />
            <span className="role-title">Farmer</span>
            <span className="role-desc">Sell your crops</span>
          </button>

          <button
            type="button"
            className={`role-option ${role === "buyer" ? "active" : ""}`}
            onClick={() => setRole("buyer")}
          >
            <FiUser className="role-icon" />
            <span className="role-title">Buyer</span>
            <span className="role-desc">Browse & purchase</span>
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button 
          type="submit" 
          className="button button-primary button-full auth-submit" 
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="spinner-small"></span>
              Connecting...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </form>
  );
}
