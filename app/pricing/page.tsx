"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";

type PricingTier = { weight: string; price: number };
type Product = {
  _id: string;
  name: string;
  origin: string;
  roastLevels: string[];
  pricingTiers: PricingTier[];
  moq: { quantity: number; unit: string };
  shortDescription: string;
  inStock: boolean;
  badge?: string;
};

const ROAST_LABELS: Record<string, string> = {
  green: "Green (Unroasted)",
  light: "Light Roast",
  medium: "Medium Roast",
  dark: "Dark Roast",
};

const ORIGIN_LABELS: Record<string, string> = {
  benguet: "Benguet",
  sagada: "Sagada",
  kalinga: "Kalinga",
  "mt-apo": "Mt. Apo",
  bukidnon: "Bukidnon",
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 0 }).format(amount);
}

export default function PricingPage() {
  const [products, setProducts]       = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [selected, setSelected]       = useState<Product | null>(null);
  const [roast, setRoast]             = useState("");
  const [weight, setWeight]           = useState("250g");
  const [quantity, setQuantity]       = useState(1);
  const [form, setForm]               = useState({ name: "", email: "", phone: "", notes: "" });
  const [status, setStatus]           = useState<"idle"|"loading"|"success"|"error">("idle");

  useEffect(() => {
    client.fetch(`*[_type == "product" && available == true] | order(featured desc, name asc) {
      _id, name, origin, roastLevels, pricingTiers, moq, shortDescription, inStock, badge
    }`).then((data) => { setProducts(data); setLoading(false); });
  }, []);

  const pricePerUnit = selected?.pricingTiers?.find((t) => t.weight === weight)?.price ?? null;
  const total = pricePerUnit ? pricePerUnit * quantity : null;

  function selectProduct(p: Product) {
    setSelected(p);
    setRoast(p.roastLevels?.[0] ?? "");
    setWeight("250g");
    setQuantity(1);
    setTimeout(() => document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !roast || !total) return;
    setStatus("loading");
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL;
      const res = await fetch(`${webhookUrl}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product: selected.name, origin: selected.origin, roast, weight, quantity, totalPhp: total }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: "#6E461E", paddingTop: "10rem", paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A0CC6C", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>Direct Order</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#FAF0E6", marginBottom: "1rem" }}>Coffee Beans</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "#D4B896", fontSize: "1.1rem", maxWidth: "36rem" }}>
            Select a product, configure your order, and we will reach out to confirm within 24 hours.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: "#FAF0E6", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>

          {/* Product grid */}
          {loading ? (
            <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", textAlign: "center", padding: "4rem" }}>Loading products...</p>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 0" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#9C6A32", marginBottom: "1rem" }}>Products coming soon.</p>
              <p style={{ fontFamily: "var(--font-body)", color: "#B89164" }}>Add your first product in the Sanity Studio at /studio</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
              {products.map((p) => {
                const startPrice = p.pricingTiers?.[0]?.price;
                const isSelected = selected?._id === p._id;
                return (
                  <button key={p._id} onClick={() => p.inStock && selectProduct(p)} disabled={!p.inStock}
                    style={{ textAlign: "left", background: "white", borderRadius: "1rem", border: isSelected ? "2px solid #7FAF5B" : "1px solid #E6DCD2", padding: 0, cursor: p.inStock ? "pointer" : "not-allowed", overflow: "hidden", opacity: p.inStock ? 1 : 0.5, transition: "all 0.2s" }}>
                    <div style={{ backgroundColor: "#F0E6DC", height: "10rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "3rem", opacity: 0.3 }}>☕</span>
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      {p.badge && <span style={{ fontSize: "0.7rem", fontWeight: 500, padding: "0.2rem 0.6rem", borderRadius: "9999px", backgroundColor: "#EAF3DE", color: "#3E5F24", border: "1px solid #BBDA94", marginBottom: "0.5rem", display: "inline-block" }}>{p.badge}</span>}
                      <p style={{ fontSize: "0.7rem", color: "#6DA544", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: "0.25rem" }}>{ORIGIN_LABELS[p.origin] ?? p.origin}</p>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#6E461E", marginBottom: "0.5rem" }}>{p.name}</h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#9C6A32", lineHeight: 1.6, marginBottom: "0.75rem" }}>{p.shortDescription}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                        {p.roastLevels?.map((r) => (
                          <span key={r} style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", backgroundColor: "#F0E6DC", color: "#6E461E", border: "1px solid #D4B896" }}>{ROAST_LABELS[r] ?? r}</span>
                        ))}
                      </div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#6E461E" }}>
                        {startPrice ? formatPrice(startPrice) : "—"}<span style={{ fontSize: "0.75rem", fontFamily: "var(--font-body)", color: "#9C6A32" }}>/100g</span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Configurator */}
          {selected && (
            <div id="configurator" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", scrollMarginTop: "7rem" }}>

              {/* Left: calculator */}
              <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2rem", border: "1px solid #E6DCD2" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#6E461E", marginBottom: "1.5rem" }}>Configure Order</h3>

                <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "#9C6A32", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>Selected Product</p>
                <div style={{ backgroundColor: "#FAF0E6", borderRadius: "0.75rem", padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "var(--font-display)", color: "#6E461E", margin: 0 }}>{selected.name}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#6DA544", margin: 0 }}>{ORIGIN_LABELS[selected.origin] ?? selected.origin}</p>
                </div>

                <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "#9C6A32", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>Roast Level</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {selected.roastLevels?.map((r) => (
                    <button key={r} onClick={() => setRoast(r)} style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", borderRadius: "9999px", border: roast === r ? "none" : "1px solid #E6DCD2", backgroundColor: roast === r ? "#6E461E" : "white", color: roast === r ? "#FAF0E6" : "#6E461E", cursor: "pointer", fontFamily: "var(--font-body)" }}>
                      {ROAST_LABELS[r] ?? r}
                    </button>
                  ))}
                </div>

                <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "#9C6A32", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>Weight per Bag</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {["100g","250g","500g","1kg"].map((w) => {
                    const price = selected.pricingTiers?.find((t) => t.weight === w)?.price;
                    return (
                      <button key={w} disabled={!price} onClick={() => setWeight(w)} style={{ padding: "0.75rem 0.25rem", borderRadius: "0.75rem", border: weight === w ? "none" : "1px solid #E6DCD2", backgroundColor: weight === w ? "#EAF3DE" : "white", color: weight === w ? "#3E5F24" : "#6E461E", cursor: price ? "pointer" : "not-allowed", opacity: price ? 1 : 0.4, textAlign: "center", fontFamily: "var(--font-body)" }}>
                        <p style={{ fontWeight: 700, fontSize: "0.8rem", margin: 0 }}>{w}</p>
                        <p style={{ fontSize: "0.7rem", margin: 0, color: weight === w ? "#558233" : "#9C6A32" }}>{price ? formatPrice(price) : "N/A"}</p>
                      </button>
                    );
                  })}
                </div>

                <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "#9C6A32", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>Quantity</p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1px solid #E6DCD2", backgroundColor: "white", cursor: "pointer", fontSize: "1.25rem", color: "#6E461E" }}>−</button>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#6E461E", minWidth: "2rem", textAlign: "center" }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1px solid #E6DCD2", backgroundColor: "white", cursor: "pointer", fontSize: "1.25rem", color: "#6E461E" }}>+</button>
                  {selected.moq && <span style={{ fontSize: "0.75rem", color: "#9C6A32", fontFamily: "var(--font-body)" }}>Min. {selected.moq.quantity} {selected.moq.unit}</span>}
                </div>

                <div style={{ borderTop: "1px solid #E6DCD2", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", margin: 0 }}>Estimated Total</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#6E461E", margin: 0 }}>{total ? formatPrice(total) : "—"}</p>
                </div>
              </div>

              {/* Right: order form */}
              <div style={{ backgroundColor: "#6E461E", borderRadius: "1rem", padding: "2rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#FAF0E6", marginBottom: "0.5rem" }}>Place Your Order</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "#D4B896", fontSize: "0.875rem", marginBottom: "2rem" }}>We confirm your order within 24 hours via WhatsApp or email.</p>

                {status === "success" ? (
                  <div style={{ textAlign: "center", padding: "3rem 0" }}>
                    <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>☕</p>
                    <h4 style={{ fontFamily: "var(--font-display)", color: "#FAF0E6", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Order received!</h4>
                    <p style={{ color: "#D4B896", fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>Eli will reach out within 24 hours. Thank you!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      { id: "name",  label: "Full Name",         type: "text",  placeholder: "Juan dela Cruz"    },
                      { id: "email", label: "Email",             type: "email", placeholder: "juan@email.com"    },
                      { id: "phone", label: "Phone / WhatsApp",  type: "tel",   placeholder: "+63 917 XXX XXXX"  },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <label style={{ display: "block", fontSize: "0.75rem", color: "#D4B896", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }}>{label} *</label>
                        <input required type={type} placeholder={placeholder} value={form[id as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                          style={{ width: "100%", backgroundColor: "#5A3818", border: "1px solid #9C6A32", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "#FAF0E6", fontFamily: "var(--font-body)", fontSize: "0.875rem", boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", color: "#D4B896", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }}>Notes (optional)</label>
                      <textarea rows={3} placeholder="Special requests..." value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                        style={{ width: "100%", backgroundColor: "#5A3818", border: "1px solid #9C6A32", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "#FAF0E6", fontFamily: "var(--font-body)", fontSize: "0.875rem", resize: "none", boxSizing: "border-box" }} />
                    </div>
                    {/* Order summary */}
                    <div style={{ backgroundColor: "#5A3818", borderRadius: "0.75rem", padding: "1rem", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>
                      <p style={{ color: "#D4B896", marginBottom: "0.5rem", fontWeight: 500 }}>Order Summary</p>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#BEB4AA", marginBottom: "0.25rem" }}><span>Product</span><span style={{ color: "#FAF0E6" }}>{selected.name}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#BEB4AA", marginBottom: "0.25rem" }}><span>Roast</span><span style={{ color: "#FAF0E6" }}>{ROAST_LABELS[roast] ?? roast}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#BEB4AA", marginBottom: "0.5rem" }}><span>Weight x Qty</span><span style={{ color: "#FAF0E6" }}>{weight} x {quantity}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #9C6A32", paddingTop: "0.5rem" }}><span style={{ color: "#D4B896", fontWeight: 500 }}>Total</span><span style={{ color: "#A0CC6C", fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>{total ? formatPrice(total) : "—"}</span></div>
                    </div>
                    {status === "error" && <p style={{ color: "#FCA5A5", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={status === "loading" || !roast} className="btn-green" style={{ width: "100%", justifyContent: "center", padding: "1rem", fontSize: "1rem", opacity: status === "loading" || !roast ? 0.6 : 1, cursor: status === "loading" || !roast ? "not-allowed" : "pointer" }}>
                      {status === "loading" ? "Sending..." : "Submit Order"}
                    </button>
                    <p style={{ fontSize: "0.75rem", color: "#BEB4AA", textAlign: "center", fontFamily: "var(--font-body)" }}>No payment required now. We confirm first.</p>
                  </form>
                )}
              </div>
            </div>
          )}

          {!selected && products.length > 0 && (
            <p style={{ textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#9C6A32", padding: "2rem" }}>Select a product above to configure your order.</p>
          )}
        </div>
      </div>
    </div>
  );
}