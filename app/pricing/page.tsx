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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);
  const [roast, setRoast] = useState("");
  const [weight, setWeight] = useState("250g");
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL}/order`, {
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
    <div style={{ fontFamily: "var(--font-body)", backgroundColor: "#FAF0E6" }}>

      {/* HEADER */}
      <div style={{ background: "#1E0E06", paddingTop: "10rem", paddingBottom: "5rem", paddingLeft: "4rem", paddingRight: "4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 20% 80%, #7FAF5B, transparent 50%)" }} />
        <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end" }}>
          <div>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1.5rem", display: "block" }}>Direct Order</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#FAF0E6", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
              Coffee<br /><em style={{ color: "#A0CC6C", fontStyle: "italic" }}>Beans.</em>
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#BEB4AA", lineHeight: 1.8, maxWidth: "28rem", fontWeight: 300 }}>
              Select a product, configure your order, and we will confirm within 24 hours. No payment required upfront.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start", justifyContent: "flex-end" }}>
            {[
              { label: "Green Beans", desc: "Unroasted for home roasters" },
              { label: "Light Roast", desc: "Bright, fruity, tea-like" },
              { label: "Medium Roast", desc: "Balanced, caramel notes" },
              { label: "Dark Roast", desc: "Bold, smoky, full body" },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7FAF5B", flexShrink: 0 }} />
                <span style={{ fontSize: "0.8rem", color: "#FAF0E6", fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: "0.75rem", color: "#7D7268", fontWeight: 300 }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ padding: "5rem 4rem", backgroundColor: "#FAF0E6" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "2rem", display: "block" }}>Select a Product</span>

          {loading ? (
            <div style={{ textAlign: "center", padding: "6rem 0" }}>
              <p style={{ color: "#9C6A32", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 0", border: "1px dashed #D4B896", borderRadius: "1rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "#9C6A32", marginBottom: "0.75rem" }}>Products coming soon.</p>
              <p style={{ fontSize: "0.875rem", color: "#B89164" }}>Add your first product in Sanity Studio at /studio</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }}>
              {products.map((p) => {
                const startPrice = p.pricingTiers?.[0]?.price;
                const isSelected = selected?._id === p._id;
                return (
                  <button key={p._id} onClick={() => p.inStock && selectProduct(p)} disabled={!p.inStock}
                    style={{ textAlign: "left", background: isSelected ? "#1E0E06" : "white", borderRadius: "1rem", border: isSelected ? "2px solid #7FAF5B" : "1px solid #E6DCD2", padding: 0, cursor: p.inStock ? "pointer" : "not-allowed", overflow: "hidden", opacity: p.inStock ? 1 : 0.5, transition: "all 0.25s" }}>
                    <div style={{ backgroundColor: isSelected ? "#2D1A0A" : "#F0E6DC", height: "11rem", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <span style={{ fontSize: "3.5rem", opacity: 0.2 }}>☕</span>
                      {p.badge && (
                        <span style={{ position: "absolute", top: "1rem", left: "1rem", fontSize: "0.65rem", fontWeight: 500, padding: "0.25rem 0.65rem", borderRadius: "9999px", background: "#EAF3DE", color: "#3E5F24", border: "1px solid #BBDA94" }}>{p.badge}</span>
                      )}
                      {isSelected && (
                        <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "1.75rem", height: "1.75rem", borderRadius: "50%", background: "#7FAF5B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "white" }}>✓</div>
                      )}
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <p style={{ fontSize: "0.65rem", color: "#6DA544", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{ORIGIN_LABELS[p.origin] ?? p.origin}</p>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: isSelected ? "#FAF0E6" : "#6E461E", marginBottom: "0.5rem", fontWeight: 700 }}>{p.name}</h3>
                      <p style={{ fontSize: "0.8rem", color: isSelected ? "#BEB4AA" : "#9C6A32", lineHeight: 1.6, marginBottom: "1rem", fontWeight: 300 }}>{p.shortDescription}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                        {p.roastLevels?.map((r) => (
                          <span key={r} style={{ fontSize: "0.65rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", background: isSelected ? "#2D1A0A" : "#F0E6DC", color: isSelected ? "#A0CC6C" : "#6E461E", border: isSelected ? "1px solid #3D2010" : "1px solid #D4B896" }}>{ROAST_LABELS[r] ?? r}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <p style={{ fontSize: "0.65rem", color: isSelected ? "#7D7268" : "#B89164", marginBottom: "0.2rem" }}>Starting at</p>
                          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: isSelected ? "#A0CC6C" : "#6E461E", fontWeight: 700 }}>
                            {startPrice ? formatPrice(startPrice) : "—"}<span style={{ fontSize: "0.7rem", fontWeight: 400, color: isSelected ? "#7D7268" : "#9C6A32" }}>/100g</span>
                          </p>
                        </div>
                        <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: isSelected ? "#7FAF5B" : "#E6DCD2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: isSelected ? "white" : "#6E461E" }}>→</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* CONFIGURATOR */}
          {selected && (
            <div id="configurator" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", scrollMarginTop: "7rem" }}>

              {/* Calculator */}
              <div style={{ background: "white", borderRadius: "1.25rem", padding: "2.5rem", border: "1px solid #E6DCD2" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#6E461E", marginBottom: "0.5rem", fontWeight: 700 }}>Configure Order</h3>
                <p style={{ fontSize: "0.8rem", color: "#9C6A32", marginBottom: "2rem", fontWeight: 300 }}>Select roast, weight, and quantity.</p>

                <div style={{ background: "#FAF0E6", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "0.5rem", background: "#E6DCD2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>☕</div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", color: "#6E461E", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.1rem" }}>{selected.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6DA544", fontWeight: 500 }}>{ORIGIN_LABELS[selected.origin] ?? selected.origin}</p>
                  </div>
                </div>

                <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "#9C6A32", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>Roast Level</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                  {selected.roastLevels?.map((r) => (
                    <button key={r} onClick={() => setRoast(r)}
                      style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem", borderRadius: "9999px", border: roast === r ? "none" : "1px solid #E6DCD2", background: roast === r ? "#6E461E" : "white", color: roast === r ? "#FAF0E6" : "#6E461E", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 500, transition: "all 0.2s" }}>
                      {ROAST_LABELS[r] ?? r}
                    </button>
                  ))}
                </div>

                <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "#9C6A32", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>Weight per Bag</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "2rem" }}>
                  {["100g","250g","500g","1kg"].map((w) => {
                    const price = selected.pricingTiers?.find((t) => t.weight === w)?.price;
                    return (
                      <button key={w} disabled={!price} onClick={() => setWeight(w)}
                        style={{ padding: "0.875rem 0.25rem", borderRadius: "0.75rem", border: weight === w ? "none" : "1px solid #E6DCD2", background: weight === w ? "#EAF3DE" : "white", color: weight === w ? "#3E5F24" : "#6E461E", cursor: price ? "pointer" : "not-allowed", opacity: price ? 1 : 0.35, textAlign: "center", fontFamily: "var(--font-body)", transition: "all 0.2s" }}>
                        <p style={{ fontWeight: 700, fontSize: "0.85rem", margin: 0 }}>{w}</p>
                        <p style={{ fontSize: "0.7rem", margin: 0, color: weight === w ? "#558233" : "#9C6A32" }}>{price ? formatPrice(price) : "N/A"}</p>
                      </button>
                    );
                  })}
                </div>

                <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "#9C6A32", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>Quantity</p>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "0.75rem" }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", border: "1px solid #E6DCD2", background: "white", cursor: "pointer", fontSize: "1.25rem", color: "#6E461E", fontFamily: "var(--font-body)" }}>−</button>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#6E461E", fontWeight: 700, minWidth: "2rem", textAlign: "center" }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", border: "1px solid #E6DCD2", background: "white", cursor: "pointer", fontSize: "1.25rem", color: "#6E461E", fontFamily: "var(--font-body)" }}>+</button>
                  {selected.moq && <span style={{ fontSize: "0.75rem", color: "#B89164", fontWeight: 300 }}>Min. {selected.moq.quantity} {selected.moq.unit}</span>}
                </div>

                <div style={{ borderTop: "1px solid #E6DCD2", paddingTop: "1.5rem", marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#9C6A32", marginBottom: "0.25rem", fontWeight: 300 }}>Estimated Total</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "#6E461E", fontWeight: 900, lineHeight: 1 }}>{total ? formatPrice(total) : "—"}</p>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#B89164", maxWidth: "10rem", textAlign: "right", fontWeight: 300, lineHeight: 1.5 }}>Shipping confirmed upon order review</p>
                </div>
              </div>

              {/* Order Form */}
              <div style={{ background: "#1E0E06", borderRadius: "1.25rem", padding: "2.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#FAF0E6", marginBottom: "0.5rem", fontWeight: 700 }}>Place Your Order</h3>
                <p style={{ fontSize: "0.8rem", color: "#7D7268", marginBottom: "2rem", fontWeight: 300 }}>We confirm via WhatsApp or email within 24 hours.</p>

                {status === "success" ? (
                  <div style={{ textAlign: "center", padding: "4rem 0" }}>
                    <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>☕</div>
                    <h4 style={{ fontFamily: "var(--font-display)", color: "#FAF0E6", fontSize: "1.75rem", marginBottom: "0.75rem", fontWeight: 700 }}>Order received!</h4>
                    <p style={{ color: "#7D7268", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.7 }}>Eli will reach out within 24 hours. Thank you for supporting highland coffee!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {[
                      { id: "name", label: "Full Name", type: "text", placeholder: "Juan dela Cruz" },
                      { id: "email", label: "Email Address", type: "email", placeholder: "juan@email.com" },
                      { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+63 917 XXX XXXX" },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <label style={{ display: "block", fontSize: "0.7rem", color: "#7D7268", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{label} *</label>
                        <input required type={type} placeholder={placeholder} value={form[id as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                          style={{ width: "100%", background: "#2D1A0A", border: "1px solid #3D2010", borderRadius: "0.75rem", padding: "0.875rem 1rem", color: "#FAF0E6", fontFamily: "var(--font-body)", fontSize: "0.875rem", boxSizing: "border-box", outline: "none" }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "block", fontSize: "0.7rem", color: "#7D7268", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Notes (optional)</label>
                      <textarea rows={3} placeholder="Special requests, delivery notes..." value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                        style={{ width: "100%", background: "#2D1A0A", border: "1px solid #3D2010", borderRadius: "0.75rem", padding: "0.875rem 1rem", color: "#FAF0E6", fontFamily: "var(--font-body)", fontSize: "0.875rem", resize: "none", boxSizing: "border-box", outline: "none" }} />
                    </div>
                    <div style={{ background: "#2D1A0A", borderRadius: "0.75rem", padding: "1.25rem", fontSize: "0.8rem" }}>
                      <p style={{ color: "#7D7268", marginBottom: "0.75rem", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Order Summary</p>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#5A3818", marginBottom: "0.35rem" }}><span>Product</span><span style={{ color: "#BEB4AA" }}>{selected.name}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#5A3818", marginBottom: "0.35rem" }}><span>Roast</span><span style={{ color: "#BEB4AA" }}>{ROAST_LABELS[roast] ?? roast}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#5A3818", marginBottom: "0.75rem" }}><span>Weight x Qty</span><span style={{ color: "#BEB4AA" }}>{weight} x {quantity}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #3D2010", paddingTop: "0.75rem" }}>
                        <span style={{ color: "#BEB4AA", fontWeight: 500 }}>Total</span>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#A0CC6C", fontWeight: 700 }}>{total ? formatPrice(total) : "—"}</span>
                      </div>
                    </div>
                    {status === "error" && <p style={{ color: "#FCA5A5", fontSize: "0.8rem", fontWeight: 300 }}>Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={status === "loading" || !roast}
                      style={{ background: "#7FAF5B", color: "white", padding: "1rem", borderRadius: "9999px", fontSize: "0.95rem", fontWeight: 500, border: "none", cursor: status === "loading" || !roast ? "not-allowed" : "pointer", opacity: status === "loading" || !roast ? 0.5 : 1, fontFamily: "var(--font-body)", width: "100%", transition: "all 0.2s" }}>
                      {status === "loading" ? "Sending..." : "Submit Order →"}
                    </button>
                    <p style={{ fontSize: "0.75rem", color: "#5A3818", textAlign: "center", fontWeight: 300 }}>No payment required now. We confirm first.</p>
                  </form>
                )}
              </div>
            </div>
          )}

          {!selected && products.length > 0 && (
            <div style={{ textAlign: "center", padding: "3rem", border: "1px dashed #D4B896", borderRadius: "1rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#9C6A32", marginBottom: "0.5rem" }}>Select a product above to configure your order.</p>
              <p style={{ fontSize: "0.8rem", color: "#B89164", fontWeight: 300 }}>Click any coffee card to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
