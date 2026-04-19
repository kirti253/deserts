"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PhoneIcon, UserCircleIcon } from "@/app/components/fair-harvest/icons";
import {
  createUser,
  findUserByPhone,
  seedFairHarvestData,
  setCurrentUser,
  type UserRole,
} from "@/lib/fair-harvest";

type AuthClientProps = {
  initialRole: UserRole;
};

type FormState = {
  name: string;
  phone: string;
  role: UserRole;
};

export default function AuthClient({ initialRole }: AuthClientProps) {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    name: "",
    phone: "",
    role: initialRole,
  });

  useEffect(() => {
    seedFairHarvestData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const existingUser = findUserByPhone(formData.phone);

        if (!existingUser) {
          setError("No account found for this phone number yet. Try signing up first.");
          return;
        }

        setCurrentUser(existingUser);
        router.push(
          existingUser.role === "farmer" ? "/farmer-dashboard" : "/marketplace",
        );
        return;
      }

      if (findUserByPhone(formData.phone)) {
        setError("An account with this phone number already exists. Use login instead.");
        return;
      }

      const user = createUser({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        role: formData.role,
      });

      router.push(user.role === "farmer" ? "/farmer-dashboard" : "/marketplace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F9F8F6] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#4A5D4E] transition-colors hover:text-[#1C2B20]"
          >
            Back to home
          </Link>
        </div>

        <div className="rounded-xl border border-[#E5E2DC] bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2E7D32]/10 text-[#2E7D32]">
              <UserCircleIcon size={40} />
            </div>
            <h1 className="font-heading mb-2 text-3xl font-bold text-[#1C2B20]">
              {isLogin ? "Welcome Back" : "Get Started"}
            </h1>
            <p className="text-[#4A5D4E]">
              {isLogin ? "Login to your account" : "Create your account"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin ? (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2B20]">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-[#E5E2DC] bg-white px-4 py-3 text-[#1C2B20] transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  placeholder="Enter your name"
                />
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1C2B20]">
                Phone Number
              </label>
              <div className="relative">
                <PhoneIcon
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5D4E]"
                />
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-[#E5E2DC] bg-white py-3 pl-12 pr-4 text-[#1C2B20] transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {!isLogin ? (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2B20]">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {(["farmer", "buyer"] as const).map((role) => {
                    const isActive = formData.role === role;

                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() =>
                          setFormData((current) => ({ ...current, role }))
                        }
                        className={`rounded-lg px-4 py-3 font-medium transition-all ${
                          isActive
                            ? "bg-[#2E7D32] text-white"
                            : "border border-[#E5E2DC] bg-white text-[#1C2B20] hover:bg-[#F9F8F6]"
                        }`}
                      >
                        {role === "farmer" ? "Farmer" : "Buyer"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {error ? (
              <p className="rounded-lg border border-[#D35400]/20 bg-[#D35400]/5 px-4 py-3 text-sm text-[#A84300]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#2E7D32] px-6 py-3 font-medium tracking-wide text-white shadow-sm transition-all hover:bg-[#246428] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setIsLogin((current) => !current);
              }}
              className="font-medium text-[#2E7D32] transition-colors hover:text-[#246428]"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

