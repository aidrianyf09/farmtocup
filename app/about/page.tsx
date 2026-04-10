import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: "#6E461E", paddingTop: "10rem", paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A0CC6C", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>Our Story</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", color: "#FAF0E6", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            From the farm.<br /><span style={{ color: "#A0CC6C" }}>For the cup.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "#D4B896", maxWidth: "36rem", lineHeight: 1.7 }}>
            Farm to Cup Philippines is a specialty coffee brand rooted in the highlands of Benguet — built on the belief that every cup should carry the story of the land and people it came from.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div style={{ backgroundColor: "#FAF0E6", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6DA544", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>What We Do</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#6E461E", marginBottom: "1.5rem" }}>The farm-to-cup method.</h2>
            <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", lineHeight: 1.8, marginBottom: "1rem" }}>
              We work directly with smallholder coffee farmers in the Cordillera highlands — Benguet, Sagada, Kalinga — sourcing their finest lots before the middlemen can dilute the value chain.
            </p>
            <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", lineHeight: 1.8, marginBottom: "1rem" }}>
              Our brew bar in La Trinidad is the endpoint of that journey: where coffee is prepared with the same intentionality it was grown with.
            </p>
            <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", lineHeight: 1.8 }}>
              Farm to Cup is not just a coffee business. It is a living argument that Philippine specialty coffee deserves global recognition.
            </p>
          </div>
          <div style={{ backgroundColor: "#E6DCD2", borderRadius: "1.5rem", height: "28rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#9C6A32", fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>Farm photo coming soon</p>
          </div>
        </div>
      </div>

      {/* Founder */}
      <div style={{ backgroundColor: "#F0E6DC", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6DA544", marginBottom: "3rem", fontFamily: "var(--font-body)" }}>The Person Behind It</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
            <div style={{ backgroundColor: "#D4B896", borderRadius: "1rem", height: "28rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "#6E461E", fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>Eli photo coming soon</p>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "#EAF3DE", color: "#3E5F24", border: "1px solid #BBDA94" }}>Founder</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#6E461E", marginTop: "1rem", marginBottom: "0.5rem" }}>Eli Natividad</h2>
              <p style={{ color: "#6DA544", fontFamily: "var(--font-body)", fontWeight: 500, marginBottom: "1.5rem" }}>Founder · Head Roaster · Farm Director</p>
              <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", lineHeight: 1.8, marginBottom: "1rem" }}>
                Eli Natividad is the founder of Farm to Cup Philippines and one of the most respected voices in the Philippine specialty coffee scene. A native of the Cordillera, Eli built Farm to Cup from a personal conviction: that the coffee grown in Philippine highlands is world-class — it just needs the right platform.
              </p>
              <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", lineHeight: 1.8, marginBottom: "2rem" }}>
                He is also the co-founder and Farm Director of Aniya Philippines, an agri-tech platform pioneering coffee-based agroforestry across Luzon.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="https://www.facebook.com/eli.natividad" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} className="btn-outline">Facebook</a>
                <Link href="/partner" style={{ textDecoration: "none" }} className="btn-primary">Work with Eli</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ backgroundColor: "#321C0C", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7FAF5B", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>History</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#FAF0E6", marginBottom: "4rem" }}>Our journey so far.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { year: "2020", event: "Farm to Cup Philippines established in Benguet" },
              { year: "2021", event: "First direct sourcing partnership with Benguet highland farmers" },
              { year: "2022", event: "Brew bar opens at Philippine Nazarene College, La Trinidad" },
              { year: "2023", event: "Expanded to Sagada and Kalinga origins" },
              { year: "2024", event: "Launched green bean trading and roasting consultancy" },
              { year: "2025", event: "Partnered with Aniya Philippines for agroforestry integration" },
              { year: "2026", event: "Version 4.0 — digital platform launch" },
            ].map(({ year, event }) => (
              <div key={year} style={{ display: "flex", gap: "2rem", alignItems: "start" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#A0CC6C", minWidth: "4rem" }}>{year}</span>
                <div style={{ backgroundColor: "#462A12", borderRadius: "0.75rem", padding: "1rem 1.5rem", flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-body)", color: "#D4B896", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: "#FAF0E6", padding: "6rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#6E461E", marginBottom: "1rem" }}>Ready to taste the highlands?</h2>
          <p style={{ fontFamily: "var(--font-body)", color: "#9C6A32", fontSize: "1.1rem", marginBottom: "2rem" }}>Green or roasted. Single origin. Direct from Benguet.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/pricing" style={{ textDecoration: "none" }} className="btn-primary">Shop Coffee Beans</Link>
            <Link href="/partner" style={{ textDecoration: "none" }} className="btn-outline">Partner With Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}