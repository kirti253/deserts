"use client";

import { useEffect, useState } from "react";

import type { ComparisonData, Crop } from "@/lib/fair-harvest";
import { getComparisonData } from "@/lib/fair-harvest";

import {
  CloseIcon,
  PhoneIcon,
  TrendUpIcon,
  WhatsAppIcon,
} from "./icons";

type ModalProps = {
  crop: Crop;
  onClose: () => void;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

export function ContactModal({ crop, onClose }: ModalProps) {
  const handlePhoneCall = () => {
    window.location.href = `tel:${crop.contact}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in buying ${crop.crop_name} at ₹${crop.price}/kg. Is it still available?`,
    );
    const whatsappNumber = crop.contact.replace(/\D/g, "");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2B20]/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl border border-[#E5E2DC] bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#4A5D4E] transition-colors hover:text-[#1C2B20]"
        >
          <CloseIcon size={24} />
        </button>

        <div className="mb-6">
          <h2 className="font-heading mb-2 text-2xl font-bold text-[#1C2B20]">
            Contact Farmer
          </h2>
          <p className="text-[#4A5D4E]">
            Choose your preferred method to contact {crop.farmer_name}
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-[#E5E2DC] bg-[#F9F8F6] p-6">
          <h3 className="font-heading mb-2 text-lg font-medium text-[#1C2B20]">
            {crop.crop_name}
          </h3>
          <p className="mb-1 text-sm text-[#4A5D4E]">
            Price:{" "}
            <span className="font-bold text-[#2E7D32]">
              ₹{formatPrice(crop.price)}/kg
            </span>
          </p>
          <p className="text-sm text-[#4A5D4E]">Location: {crop.location}</p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handlePhoneCall}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#2E7D32] px-6 py-4 font-medium text-white shadow-sm transition-all hover:bg-[#246428]"
          >
            <PhoneIcon size={24} />
            Call Farmer
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#D35400] px-6 py-4 font-medium text-white shadow-sm transition-all hover:bg-[#A84300]"
          >
            <WhatsAppIcon size={24} />
            Message on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export function PriceComparisonModal({ crop, onClose }: ModalProps) {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setComparisonData(getComparisonData(crop));
      setLoading(false);
    }, 650);

    return () => window.clearTimeout(timeoutId);
  }, [crop]);

  const difference = comparisonData
    ? (
        ((comparisonData.farmer_price - comparisonData.market_price) /
          comparisonData.market_price) *
        100
      ).toFixed(1)
    : "0.0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2B20]/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl border border-[#E5E2DC] bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#4A5D4E] transition-colors hover:text-[#1C2B20]"
        >
          <CloseIcon size={24} />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#D35400]/10 text-[#D35400]">
            <TrendUpIcon size={28} />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#1C2B20]">
              Price Comparison
            </h2>
            <p className="text-sm text-[#4A5D4E]">{crop.crop_name}</p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-[#E5E2DC] border-t-[#2E7D32]" />
            <p className="mt-4 text-[#4A5D4E]">Analyzing market prices...</p>
          </div>
        ) : comparisonData ? (
          <div>
            <div className="mb-6 grid grid-cols-2 gap-6">
              <div className="rounded-lg border border-[#E5E2DC] bg-[#F9F8F6] p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4A5D4E]">
                  Farmer Price
                </p>
                <p className="text-3xl font-bold text-[#2E7D32]">
                  ₹{formatPrice(comparisonData.farmer_price)}
                </p>
                <p className="text-sm text-[#4A5D4E]">per kg</p>
              </div>
              <div className="rounded-lg border border-[#E5E2DC] bg-[#F9F8F6] p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4A5D4E]">
                  Market Average
                </p>
                <p className="text-3xl font-bold text-[#D35400]">
                  ₹{formatPrice(comparisonData.market_price)}
                </p>
                <p className="text-sm text-[#4A5D4E]">per kg</p>
              </div>
            </div>

            <div className="rounded-lg border border-[#2E7D32]/20 bg-[#2E7D32]/5 p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2E7D32]">
                AI Insight
              </p>
              <p className="text-base leading-relaxed text-[#1C2B20]">
                {comparisonData.insight}
              </p>
              <div className="mt-4 border-t border-[#2E7D32]/20 pt-4">
                <p className="text-sm text-[#4A5D4E]">
                  Price difference:
                  <span
                    className={`ml-2 font-bold ${
                      Number.parseFloat(difference) < 0
                        ? "text-[#2E7D32]"
                        : "text-[#D35400]"
                    }`}
                  >
                    {difference}%
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-[#4A5D4E]">
            Unable to load price comparison data.
          </div>
        )}
      </div>
    </div>
  );
}

