import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", backgroundColor: "#FAF0E6" }}>

      {/* HERO */}
      <div style={{ background: "#1E0E06", paddingTop: "10rem", paddingBottom: "6rem", paddingLeft: "4rem", paddingRight: "4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 80% 50%, #7FAF5B, transparent 60%)" }} />
        <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1.5rem", display: "block" }}>Our Story</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 6rem)", color: "#FAF0E6", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            From the farm.<br /><em style={{ color: "#A0CC6C", fontStyle: "italic" }}>For the cup.</em>
          </h1>
          <p style={{ fontSize: "1rem", color: "#BEB4AA", lineHeight: 1.8, maxWidth: "36rem", fontWeight: 300 }}>
            Farm to Cup Philippines is a specialty coffee brand rooted in the highlands of Benguet — built on the belief that every cup should carry the story of the land and people it came from.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <div style={{ padding: "7rem 4rem", backgroundColor: "#FAF0E6" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>What We Do</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#6E461E", lineHeight: 1.1, fontWeight: 700, marginBottom: "1.5rem" }}>
              The farm-to-cup<br />method.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#9C6A32", lineHeight: 1.8, fontWeight: 300, marginBottom: "1.25rem" }}>
              We work directly with smallholder coffee farmers in the Cordillera highlands — Benguet, Sagada, Kalinga — sourcing their finest lots before the middlemen can dilute the value chain.
            </p>
            <p style={{ fontSize: "0.9rem", color: "#9C6A32", lineHeight: 1.8, fontWeight: 300, marginBottom: "1.25rem" }}>
              Our brew bar in La Trinidad is the endpoint of that journey: where coffee is prepared with the same intentionality it was grown with.
            </p>
            <p style={{ fontSize: "0.9rem", color: "#9C6A32", lineHeight: 1.8, fontWeight: 300 }}>
              Farm to Cup is not just a coffee business. It is a living argument that Philippine specialty coffee deserves global recognition.
            </p>
          </div>
          <div style={{ position: "relative", height: "500px", borderRadius: "1.5rem", overflow: "hidden" }}>
            <Image
              src="/images/brewbar/brewbar-interior.jpg"
              alt="Farm to Cup brew bar"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </div>

      {/* FOUNDER */}
      <div style={{ background: "#F0E6DC", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "4rem", display: "block" }}>The Person Behind It</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "6rem", alignItems: "start" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "relative", height: "560px", borderRadius: "1rem", overflow: "hidden" }}>
                <Image
                  src="/images/team/team-main.jpg"
                  alt="Eli Natividad — Founder of Farm to Cup Philippines"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", background: "#6E461E", borderRadius: "1rem", padding: "1.5rem", maxWidth: "14rem" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "#FAF0E6", fontStyle: "italic", lineHeight: 1.6, fontWeight: 400 }}>
                  "Philippine coffee is world-class. It just needs the right platform."
                </p>
              </div>
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 500, padding: "0.3rem 0.8rem", borderRadius: "9999px", background: "#EAF3DE", color: "#3E5F24", border: "1px solid #BBDA94", display: "inline-block", marginBottom: "1.5rem" }}>Founder</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "#6E461E", lineHeight: 1, fontWeight: 900, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>Eli Natividad</h2>
              <p style={{ color: "#6DA544", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9rem", marginBottom: "2rem" }}>Founder · Head Roaster · Farm Director</p>
              <p style={{ fontSize: "0.9rem", color: "#9C6A32", lineHeight: 1.8, fontWeight: 300, marginBottom: "1.25rem" }}>
                Eli Natividad is the founder of Farm to Cup Philippines and one of the most respected voices in the Philippine specialty coffee scene. A native of the Cordillera, Eli built Farm to Cup from a personal conviction: that the coffee grown in Philippine highlands is world-class.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#9C6A32", lineHeight: 1.8, fontWeight: 300, marginBottom: "1.25rem" }}>
                He is also the co-founder and Farm Director of Aniya Philippines, an agri-tech platform pioneering coffee-based agroforestry across Luzon. His work bridges the gap between traditional farming communities and modern specialty coffee markets.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#9C6A32", lineHeight: 1.8, fontWeight: 300, marginBottom: "2.5rem" }}>
                When he is not at the roaster or on a farm, Eli conducts brewing workshops, consults for aspiring coffee entrepreneurs, and champions sustainable highland agriculture.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="https://www.facebook.com/eli.natividad" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", border: "1.5px solid #6E461E", color: "#6E461E", padding: "0.875rem 1.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500 }}>
                  Facebook &rarr;
                </a>
                <Link href="/partner" style={{ textDecoration: "none", background: "#6E461E", color: "#FAF0E6", padding: "0.875rem 1.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500 }}>
                  Work with Eli
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ background: "#1E0E06", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>History</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#FAF0E6", lineHeight: 1.1, fontWeight: 700, marginBottom: "5rem" }}>Our journey so far.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "#2D1A0A", border: "1px solid #2D1A0A", borderRadius: "12px", overflow: "hidden" }}>
            {[
              { year: "2020", event: "Farm to Cup Philippines established in Benguet" },
              { year: "2021", event: "First direct sourcing partnership with highland farmers" },
              { year: "2022", event: "Brew bar opens at Philippine Nazarene College" },
              { year: "2023", event: "Expanded to Sagada and Kalinga origins" },
              { year: "2024", event: "Launched green bean trading and roasting consultancy" },
              { year: "2026", event: "Version 4.0 — digital platform launch" },
            ].map(({ year, event }) => (
              <div key={year} style={{ background: "#1A0C04", padding: "2rem 1.75rem" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "#A0CC6C", fontWeight: 900, lineHeight: 1, marginBottom: "1rem" }}>{year}</div>
                <p style={{ fontSize: "0.85rem", color: "#BEB4AA", lineHeight: 1.7, fontWeight: 300 }}>{event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#FAF0E6", padding: "7rem 4rem", textAlign: "center" }}>
        <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>Ready to taste the highlands?</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#6E461E", lineHeight: 1.1, fontWeight: 700, marginBottom: "1rem" }}>Order your first bag.</h2>
          <p style={{ fontSize: "0.9rem", color: "#9C6A32", lineHeight: 1.7, marginBottom: "2.5rem", fontWeight: 300 }}>Green or roasted. Single origin. Direct from Benguet.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/pricing" style={{ textDecoration: "none", background: "#6E461E", color: "#FAF0E6", padding: "1rem 2rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500 }}>Shop Coffee Beans</Link>
            <Link href="/partner" style={{ textDecoration: "none", border: "1.5px solid #6E461E", color: "#6E461E", padding: "1rem 2rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500 }}>Partner With Us</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
