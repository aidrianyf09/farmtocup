import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div style={{ minHeight: "100vh", backgroundColor: "#6E461E", position: "relative", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "12rem", background: "linear-gradient(to top, #FAF0E6, transparent)" }} />
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "10rem 1.5rem 8rem", position: "relative", zIndex: 10 }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A0CC6C", marginBottom: "1.5rem", fontFamily: "var(--font-body)" }}>
            Farm to Cup Philippines · Est. 2020 · Benguet Highlands
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 9vw, 7rem)", color: "#FAF0E6", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            From the<br /><span style={{ color: "#A0CC6C" }}>highlands,</span><br />to your cup.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "#D4B896", maxWidth: "36rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Specialty Arabica beans grown by highland farmers in Benguet. Green and roasted — sourced directly, traded honestly.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <Link href="/pricing" className="btn-green" style={{ textDecoration: "none", fontSize: "1rem", padding: "1rem 2rem" }}>Shop Coffee Beans</Link>
            <Link href="/about" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", border: "1px solid #D4B896", color: "#FAF0E6", padding: "1rem 2rem", borderRadius: "9999px", fontSize: "1rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>Our Story</Link>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#FAF0E6", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p className="section-label">Our Philosophy</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#6E461E", marginBottom: "1.5rem" }}>Coffee that tells a complete story.</h2>
          <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "40rem", marginBottom: "4rem" }}>
            Farm to Cup is not just a name — it is how we operate. Every bean is traceable to a specific farm, farmer, and harvest.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
            {[
              { icon: "🌱", title: "Grown with care", body: "Cultivated by smallholder farmers in the Cordillera highlands — generations of craft in every cherry." },
              { icon: "☕", title: "Roasted with intention", body: "From green beans to your preferred roast level. We preserve the origin character of every lot." },
              { icon: "🤝", title: "Traded honestly", body: "Direct sourcing means farmers are paid fairly and you know exactly where your coffee comes from." },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ backgroundColor: "#ffffff", borderRadius: "1rem", padding: "2rem", border: "1px solid #E6DCD2" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#6E461E", marginBottom: "0.75rem" }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: "#6E461E", borderRadius: "1.5rem", padding: "4rem 3rem", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "#FAF0E6", maxWidth: "36rem", margin: "0 auto 1rem" }}>Specialty coffee, direct from the source.</h2>
            <p style={{ fontFamily: "var(--font-body)", color: "#D4B896", fontSize: "1rem", maxWidth: "28rem", margin: "0 auto 2rem" }}>Order green or roasted beans online. We ship nationwide.</p>
            <Link href="/pricing" className="btn-green" style={{ textDecoration: "none", fontSize: "1rem", padding: "1rem 2.5rem" }}>View Pricing and Order</Link>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#321C0C", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <p className="section-label" style={{ color: "#7FAF5B" }}>Find Us</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FAF0E6", marginBottom: "1.5rem" }}>Farm to Cup <span style={{ color: "#A0CC6C" }}>Benguet</span></h2>
            <p style={{ fontFamily: "var(--font-body)", color: "#BEB4AA", lineHeight: 1.7, marginBottom: "2rem" }}>Visit our brew bar at the heart of La Trinidad, Benguet.</p>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
              <span>📍</span>
              <div>
                <p style={{ fontSize: "0.7rem", color: "#7FAF5B", fontWeight: 500, textTransform: "uppercase", marginBottom: "0.25rem", fontFamily: "var(--font-body)" }}>Address</p>
                <p style={{ fontSize: "0.875rem", color: "#BEB4AA", fontFamily: "var(--font-body)", margin: 0 }}>Philippine Nazarene College, Pico Rd, La Trinidad, Benguet</p>
              </div>
            </div>
            <a href="https://maps.google.com/?q=16.4607,120.5927" target="_blank" rel="noopener noreferrer" className="btn-green" style={{ textDecoration: "none", marginTop: "1.5rem", display: "inline-flex" }}>Get Directions</a>
          </div>
          <div style={{ borderRadius: "1rem", overflow: "hidden", height: "24rem", border: "1px solid #462A12" }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d964.0!2d120.5927!3d16.4607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a1536645de71%3A0x1b6c5c6d22441d50!2sPhilippine%20Nazarene%20College!5e0!3m2!1sen!2sph!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Farm to Cup Benguet" />
          </div>
        </div>
      </div>
    </div>
  );
}
