"use client";

import { useState } from "react";

/** Only the billing display is interactive. The page owns the static plan content. */
export function YouScrollBillingPrice({ monthly, yearly, savingPercent }: {
  monthly: number;
  yearly: number;
  savingPercent: number;
}) {
  const [interval, setInterval] = useState<"year" | "month">("year");
  const annual = interval === "year";

  return (
    <div className="ys-price-picker">
      <noscript>
        <style>{".ys-price-toggle { display: none; }"}</style>
      </noscript>
      <fieldset className="ys-price-toggle">
        <legend className="ys-price-sr">Compare Pro billing options</legend>
        <label className="ys-price-option">
          <input type="radio" name="ys-billing-interval" value="month" checked={!annual} onChange={() => setInterval("month")} />
          <span>Monthly</span>
        </label>
        <label className="ys-price-option">
          <input type="radio" name="ys-billing-interval" value="year" checked={annual} onChange={() => setInterval("year")} />
          <span>Yearly <small>Save {savingPercent}%</small></span>
        </label>
      </fieldset>
      <div className="ys-price-amount-wrap" aria-live="polite" aria-atomic="true">
        <p className="ys-price-amount">
          <span>${(annual ? yearly : monthly).toFixed(2)}</span>
          <span className="ys-price-period">/ {annual ? "year" : "month"}</span>
        </p>
        <p className="ys-price-equivalent">{annual ? `About $${(yearly / 12).toFixed(2)} a month, billed yearly.` : "Billed monthly. Cancel future renewals anytime."}</p>
      </div>
      {/* Both complete prices remain readable in static HTML, without JavaScript. */}
      <p className="ys-price-alternative">${monthly.toFixed(2)} monthly or ${yearly.toFixed(2)} yearly.</p>
    </div>
  );
}
