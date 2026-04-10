"use client";

import { useState } from "react";

const PARTNERSHIP_TYPES = [
  { value: "wholesale",        label: "Wholesale Buyer",           icon: "📦", desc: "Source green or roasted Benguet Arabica at wholesale volume. Ideal for cafes, roasteries, and distributors." },
  { value: "event-venue",      label: "Event Venue Booking",       icon: "🎪", desc: "Host your event at our La Trinidad brew bar or bring Farm to Cup to your venue. Coffee pop-ups and cupping sessions available." },
  { value: "farm-partnership", label: "Farm Partnership (Aniya)",  icon: "🌱", desc: "Invest in highland coffee farms through Aniya Philippines. Grower packages starting at 200 seedlings with full farm management." },
  { value: "consultancy",      label: "Farming Consultancy",       icon: "🎓", desc: "Work directly with Eli Natividad for farm setup, crop management, and specialty coffee processing guidance." },
  { value: "csr",              label: "CSR / Sustainability",      icon: "🌍", desc: "Align your company sustainability goals with highland coffee farming. ESG-ready farm investments and reforestation partnerships." },
];

export default function PartnerPage() {
  const [partnerType, setPartnerType] = useState("");
  const [form, setForm]               = useState({ name: "", email: "", phone: "", organization: "", message: "" });
  const [status, setStatus]           = useState<"idle"|"loading"|"success"|"error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!partnerType) return;
    setStatus("loading");
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL;
      const res = await fetch(`${webhookUrl}/partner`, {
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
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: "#3E5F24", paddingTop: "10rem", paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A0CC6C", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>Collaborate With Us</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", color: "#FAF0E6", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            Grow with<br /><span style={{ color: "#A0CC6C" }}>Farm to Cup.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "#D5E7BC", maxWidth: "36rem", lineHeight: 1.7 }}>
            Whether you are a buyer, investor, event organizer, or aspiring farmer — there is a way to be part of the Farm to Cup network.
          </p>
        </div>
      </div>

      {/* Partnership types */}
      <div style={{ backgroundColor: "#FAF0E6", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6DA544", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>What We Offer</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#6E461E", marginBottom: "3rem" }}>Partnership types</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {PARTNERSHIP_TYPES.map(({ value, label, icon, desc }) => (
              <div key={value} style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2rem", border: "1px solid #E6DCD2" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "#6E461E", marginBottom: "0.75rem" }}>{label}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#9C6A32", lineHeight: 1.7, marginBottom: "1rem" }}>{desc}</p>
                <a href="#partner-form" style={{ color: "#6DA544", fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}>Get in touch →</a>
              </div>
            ))}
          </div>

          {/* PDF download */}
          <div style={{ backgroundColor: "#F0E6DC", borderRadius: "1rem", padding: "2rem", border: "1px solid #E6DCD2", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#6E461E", marginBottom: "0.5rem" }}>Partnership Deck</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#9C6A32" }}>Full partnership overview, pricing tiers, and farm data. PDF available for download.</p>
            </div>
            <a href="/documents/farmtocup-partnership-deck.pdf" download style={{ textDecoration: "none" }} className="btn-outline">Download PDF ↓</a>
          </div>
        </div>
      </div>

      {/* Contact cards */}
      <div style={{ backgroundColor: "#321C0C", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7FAF5B", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>Talk to Us Directly</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#FAF0E6", marginBottom: "3rem" }}>Meet your contacts.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", maxWidth: "48rem" }}>
            {[
              {
                name: "Eli Natividad",
                role: "Founder · Head Roaster · Farm Director",
                for: "Farming consultancy, wholesale, Aniya partnerships",
                facebook: "https://www.facebook.com/eli.natividad",
                phone: "+63 9XX XXX XXXX",
              },
              {
                name: "Aidrian Fatallar",
                role: "Marketing Head",
                for: "Events, CSR, general inquiries, digital partnerships",
                facebook: "https://www.facebook.com/aidrian.fatallar",
                phone: "+63 9XX XXX XXXX",
              },
            ].map(({ name, role, for: forTopics, facebook, phone }) => (
              <div key={name} style={{ backgroundColor: "#462A12", borderRadius: "1rem", padding: "2rem", border: "1px solid #5A3818" }}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", backgroundColor: "#5A3818", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#D4B896" }}>{name.charAt(0)}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#FAF0E6", marginBottom: "0.25rem" }}>{name}</h3>
                <p style={{ fontSize: "0.75rem", color: "#7FAF5B", fontFamily: "var(--font-body)", marginBottom: "0.75rem" }}>{role}</p>
                <p style={{ fontSize: "0.8rem", color: "#BEB4AA", fontFamily: "var(--font-body)", marginBottom: "1.5rem" }}>
                  <span style={{ color: "#A0968C" }}>Best for: </span>{forTopics}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a href={facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", fontSize: "0.875rem", color: "#BEB4AA", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "#5A3818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>f</span>
                    Facebook Messenger
                  </a>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} style={{ textDecoration: "none", fontSize: "0.875rem", color: "#BEB4AA", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "#5A3818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>📞</span>
                    {phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner form */}
      <div id="partner-form" style={{ backgroundColor: "#F0E6DC", padding: "6rem 1.5rem", scrollMarginTop: "5rem" }}>
        <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6DA544", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>Get In Touch</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#6E461E", marginBottom: "0.75rem" }}>Send us an inquiry.</h2>
          <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", marginBottom: "2.5rem" }}>We will get back to you within 48 hours.</p>

          {status === "success" ? (
            <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "4rem", textAlign: "center", border: "1px solid #E6DCD2" }}>
              <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌱</p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "#6E461E", marginBottom: "0.5rem" }}>Inquiry received!</h3>
              <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", fontSize: "0.875rem" }}>We will get back to you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2rem", border: "1px solid #E6DCD2", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { id: "name",         label: "Full Name",          type: "text",  placeholder: "Juan dela Cruz",     required: true  },
                  { id: "email",        label: "Email",              type: "email", placeholder: "juan@company.com",   required: true  },
                  { id: "phone",        label: "Phone / WhatsApp",   type: "tel",   placeholder: "+63 917 XXX XXXX",   required: true  },
                  { id: "organization", label: "Organization",       type: "text",  placeholder: "Company or Farm",    required: false },
                ].map(({ id, label, type, placeholder, required }) => (
                  <div key={id}>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#9C6A32", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }}>{label}{required && " *"}</label>
                    <input required={required} type={type} placeholder={placeholder} value={form[id as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                      style={{ width: "100%", backgroundColor: "#FAF0E6", border: "1px solid #E6DCD2", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "#6E461E", fontFamily: "var(--font-body)", fontSize: "0.875rem", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>

              {/* Partnership type */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#9C6A32", fontFamily: "var(--font-body)", marginBottom: "0.75rem" }}>Partnership Type *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {PARTNERSHIP_TYPES.map(({ value, label }) => (
                    <button key={value} type="button" onClick={() => setPartnerType(value)}
                      style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", borderRadius: "9999px", border: partnerType === value ? "none" : "1px solid #E6DCD2", backgroundColor: partnerType === value ? "#6DA544" : "white", color: partnerType === value ? "white" : "#6E461E", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#9C6A32", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }}>Message *</label>
                <textarea required rows={5} placeholder="Tell us about your interest and goals..." value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  style={{ width: "100%", backgroundColor: "#FAF0E6", border: "1px solid #E6DCD2", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "#6E461E", fontFamily: "var(--font-body)", fontSize: "0.875rem", resize: "none", boxSizing: "border-box" }} />
              </div>

              {status === "error" && <p style={{ color: "#DC2626", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>Something went wrong. Please try again.</p>}

              <button type="submit" disabled={status === "loading" || !partnerType} className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "1rem", fontSize: "1rem", opacity: status === "loading" || !partnerType ? 0.6 : 1, cursor: status === "loading" || !partnerType ? "not-allowed" : "pointer" }}>
                {status === "loading" ? "Sending..." : "Send Inquiry →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}