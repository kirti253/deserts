"use client";

import { formatCurrency } from "@/lib/api";
import { CropListing, PriceInsight } from "@/lib/types";

interface PriceComparisonModalProps {
  isOpen: boolean;
  listing: CropListing | null;
  insight: PriceInsight | null;
  loading: boolean;
  onClose: () => void;
}

export function PriceComparisonModal({
  isOpen,
  listing,
  insight,
  loading,
  onClose
}: PriceComparisonModalProps) {
  if (!isOpen || !listing) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span className="eyebrow">Market comparison</span>
            <h3>{listing.cropName}</h3>
          </div>
          <button type="button" className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>

        {loading || !insight ? (
          <div className="modal-loading">
            <div className="loading-bar" />
            <p>Checking market signals and generating a recommendation...</p>
          </div>
        ) : (
          <div className="comparison-grid">
            <article className="comparison-tile">
              <span>Farmer price</span>
              <strong>{formatCurrency(insight.farmerPrice)}</strong>
            </article>
            <article className="comparison-tile accent">
              <span>Average market price</span>
              <strong>{formatCurrency(insight.averageMarketPrice)}</strong>
            </article>
            <article className="comparison-note full-width">
              <strong>{insight.insight}</strong>
              <p>{insight.summary}</p>
            </article>
            <article className="comparison-note full-width">
              <strong>Recommendation</strong>
              <p>{insight.recommendation}</p>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}

