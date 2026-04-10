"use client";

import { useState } from "react";

const PARTNERSHIP_TYPES = [
  { value: "wholesale", label: "Wholesale Buyer", icon: "📦", desc: "Source green or roasted Benguet Arabica at wholesale volume. Ideal for cafes, roasteries, and distributors." },
  { value: "event-venue", label: "Event Venue Booking", icon: "🎪", desc: "Host your event at our La Trinidad brew bar or bring Farm to Cup to your venue." },
  { value: "farm-partnership", label: "Farm Partnership (Aniya)", icon: "🌱", desc: "Invest in highland coffee farms through Aniya Philippines. Grower packages starting at 200 seedlings." },
  { value: "consultancy", label: "Farming Consultancy", icon: "🎓", desc: "Work directly with Eli Natividad for farm setup, crop management, and specialty coffee processing." },
  { value: "csr", label: "CSR / Sustainability", icon: "🌍", desc: "Align your company sustainability goals with highland coffee farming. ESG-ready farm investments." },
];

export default function PartnerPage() {
  const [partnerType, setPartnerType] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!partnerType) return;
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL}/partner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, partnershipType: partnerType }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{ fontFamily: "var(--font-body)", backgroundColor: "#FAF0E6" }}>

      {/* HERO */}
      <div style={{ background: "#1A3A0A", paddingTop: "10rem", paddingBottom: "6rem", paddingLeft: "4rem", paddingRight: "4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "radial-gradient(circle at 80% 30%, #A0CC6C, transparent 60%)" }} />
        <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end" }}>
          <div>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A0CC6C", fontWeight: 500, marginBottom: "1.5rem", display: "block" }}>Collaborate With Us</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 6rem)", color: "#FAF0E6", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
              Grow with<br /><em style={{ color: "#A0CC6C", fontStyle: "italic" }}>Farm to Cup.</em>
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#D5E7BC", lineHeight: 1.8, maxWidth: "28rem", fontWeight: 300 }}>
              Whether you are a buyer, investor, event organizer, or aspiring farmer — there is a way to be part of the Farm to Cup network.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {PARTNERSHIP_TYPES.map(({ value, label, icon }) => (
              <div key={value} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                <span style={{ fontSize: "0.85rem", color: "#D5E7BC", fontWeight: 400 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNERSHIP TYPES */}
      <div style={{ padding: "7rem 4rem", backgroundColor: "#FAF0E6" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>What We Offer</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#6E461E", lineHeight: 1.1, fontWeight: 700, marginBottom: "3.5rem" }}>Partnership types.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
            {PARTNERSHIP_TYPES.map(({ value, label, icon, desc }) => (
              <div key={value} style={{ background: "white", borderRadius: "1.25rem", padding: "2.25rem", border: "1px solid #E6DCD2", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "2rem", marginBottom: "1.25rem", display: "block" }}>{icon}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "#6E461E", marginBottom: "0.75rem", fontWeight: 700 }}>{label}</h3>
                <p style={{ fontSize: "0.85rem", color: "#9C6A32", lineHeight: 1.7, fontWeight: 300, flex: 1, marginBottom: "1.25rem" }}>{desc}</p>
                <a href="#partner-form" style={{ fontSize: "0.8rem", color: "#6DA544", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid #6DA544", paddingBottom: "2px", display: "inline-block", width: "fit-content" }}>Get in touch &rarr;</a>
              </div>
            ))}
          </div>

          {/* PDF */}
          <div style={{ background: "#1E0E06", borderRadius: "1.25rem", padding: "2.5rem 3rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "0.5rem", display: "block" }}>Partnership Deck</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#FAF0E6", marginBottom: "0.5rem", fontWeight: 700 }}>Full overview and pricing tiers.</h3>
              <p style={{ fontSize: "0.85rem", color: "#7D7268", fontWeight: 300 }}>Farm data, partnership structures, and investment breakdown. PDF available.</p>
            </div>
            <a href="/documents/farmtocup-partnership-deck.pdf" download style={{ textDecoration: "none", border: "1.5px solid #7FAF5B", color: "#7FAF5B", padding: "0.875rem 1.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, whiteSpace: "nowrap" }}>
              Download PDF &darr;
            </a>
          </div>
        </div>
      </div>

      {/* CONTACT CARDS */}
      <div style={{ background: "#1E0E06", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>Talk to Us Directly</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FAF0E6", lineHeight: 1.1, fontWeight: 700, marginBottom: "3.5rem" }}>Meet your contacts.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", maxWidth: "50rem" }}>
            {[
              { name: "Eli Natividad", role: "Founder · Head Roaster · Farm Director", for: "Farming consultancy, wholesale, Aniya partnerships", facebook: "https://www.facebook.com/eli.natividad", phone: "+63 9XX XXX XXXX" },
              { name: "Aidrian Fatallar", role: "Marketing Head", for: "Events, CSR, general inquiries, digital partnerships", facebook: "https://www.facebook.com/aidrian.fatallar", phone: "+63 9XX XXX XXXX" },
            ].map(({ name, role, for: forTopics, facebook, phone }) => (
              <div key={name} style={{ background: "#2D1A0A", borderRadius: "1.25rem", padding: "2.25rem", border: "1px solid #3D2010" }}>
                <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "#3D2010", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#D4B896", fontWeight: 700 }}>{name.charAt(0)}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#FAF0E6", marginBottom: "0.25rem", fontWeight: 700 }}>{name}</h3>
                <p style={{ fontSize: "0.75rem", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem" }}>{role}</p>
                <p style={{ fontSize: "0.8rem", color: "#7D7268", marginBottom: "1.75rem", lineHeight: 1.6, fontWeight: 300 }}>
                  <span style={{ color: "#5A3818" }}>Best for: </span>{forTopics}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a href={facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", fontSize: "0.85rem", color: "#BEB4AA", display: "flex", alignItems: "center", gap: "0.75rem", fontWeight: 400 }}>
                    <span style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "#3D2010", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#7FAF5B", flexShrink: 0 }}>f</span>
                    Facebook Messenger
                  </a>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} style={{ textDecoration: "none", fontSize: "0.85rem", color: "#BEB4AA", display: "flex", alignItems: "center", gap: "0.75rem", fontWeight: 400 }}>
                    <span style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "#3D2010", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", flexShrink: 0 }}>📞</span>
                    {phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNER FORM */}
      <div id="partner-form" style={{ background: "#F0E6DC", padding: "7rem 4rem", scrollMarginTop: "5rem" }}>
        <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>Get In Touch</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#6E461E", lineHeight: 1.1, fontWeight: 700, marginBottom: "0.75rem" }}>Send us an inquiry.</h2>
          <p style={{ fontSize: "0.9rem", color: "#9C6A32", marginBottom: "3rem", fontWeight: 300 }}>We will get back to you within 48 hours.</p>

          {status === "success" ? (
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "5rem", textAlign: "center", border: "1px solid #E6DCD2" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>🌱</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#6E461E", marginBottom: "0.75rem", fontWeight: 700 }}>Inquiry received!</h3>
              <p style={{ fontSize: "0.875rem", color: "#9C6A32", fontWeight: 300, lineHeight: 1.7 }}>We will get back to you within 48 hours. Thank you for reaching out to Farm to Cup Philippines.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: "1.25rem", padding: "2.5rem", border: "1px solid #E6DCD2", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "Juan dela Cruz", required: true },
                  { id: "email", label: "Email", type: "email", placeholder: "juan@company.com", required: true },
                  { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+63 917 XXX XXXX", required: true },
                  { id: "organization", label: "Organization", type: "text", placeholder: "Company or Farm", required: false },
                ].map(({ id, label, type, placeholder, required }) => (
                  <div key={id}>
                    <label style={{ display: "block", fontSize: "0.65rem", color: "#9C6A32", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{label}{required && " *"}</label>
                    <input required={required} type={type} placeholder={placeholder} value={form[id as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                      style={{ width: "100%", background: "#FAF0E6", border: "1px solid #E6DCD2", borderRadius: "0.75rem", padding: "0.875rem 1rem", color: "#6E461E", fontFamily: "var(--font-body)", fontSize: "0.875rem", boxSizing: "border-box", outline: "none" }} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.65rem", color: "#9C6A32", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Partnership Type *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {PARTNERSHIP_TYPES.map(({ value, label }) => (
                    <button key={value} type="button" onClick={() => setPartnerType(value)}
                      style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem", borderRadius: "9999px", border: partnerType === value ? "none" : "1px solid #E6DCD2", background: partnerType === value ? "#6DA544" : "white", color: partnerType === value ? "white" : "#6E461E", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 500, transition: "all 0.2s" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.65rem", color: "#9C6A32", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Message *</label>
                <textarea required rows={5} placeholder="Tell us about your interest, goals, and any specific questions..." value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  style={{ width: "100%", background: "#FAF0E6", border: "1px solid #E6DCD2", borderRadius: "0.75rem", padding: "0.875rem 1rem", color: "#6E461E", fontFamily: "var(--font-body)", fontSize: "0.875rem", resize: "none", boxSizing: "border-box", outline: "none" }} />
              </div>

              {status === "error" && <p style={{ color: "#DC2626", fontSize: "0.8rem", fontWeight: 300 }}>Something went wrong. Please try again.</p>}

              <button type="submit" disabled={status === "loading" || !partnerType}
                style={{ background: "#6E461E", color: "#FAF0E6", padding: "1rem", borderRadius: "9999px", fontSize: "0.95rem", fontWeight: 500, border: "none", cursor: status === "loading" || !partnerType ? "not-allowed" : "pointer", opacity: status === "loading" || !partnerType ? 0.5 : 1, fontFamily: "var(--font-body)", width: "100%", transition: "all 0.2s" }}>
                {status === "loading" ? "Sending..." : "Send Inquiry →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
