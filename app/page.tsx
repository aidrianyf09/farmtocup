import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", backgroundColor: "#FAF0E6" }}>

      {/* HERO */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", backgroundColor: "#1E0E06" }}>
        <div style={{ padding: "10rem 4rem 5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1.5rem", display: "block" }}>
            Benguet Highlands · Est. PH 2020
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 5.5vw, 6rem)", color: "#FAF0E6", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            From the<br />
            <em style={{ color: "#A0CC6C", fontStyle: "italic" }}>highlands,</em><br />
            to your cup.
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#BEB4AA", lineHeight: 1.8, maxWidth: "22rem", marginBottom: "2.5rem", fontWeight: 300 }}>
            Specialty Arabica sourced directly from Cordillera highland farmers. Green and roasted — traded honestly, delivered nationwide.
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/pricing" style={{ textDecoration: "none", background: "#7FAF5B", color: "#fff", padding: "0.875rem 2rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em" }}>
              Shop Coffee Beans
            </Link>
            <Link href="/about" style={{ textDecoration: "none", color: "#BEB4AA", fontSize: "0.875rem", fontWeight: 400, display: "flex", alignItems: "center", gap: "0.4rem" }}>
              Our Story &rarr;
            </Link>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Farm to Cup brew bar"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #1E0E06 0%, transparent 30%)" }} />
          <div style={{ position: "absolute", bottom: "2.5rem", left: "2rem", right: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { num: "2020", label: "Established" },
              { num: "100%", label: "Arabica" },
              { num: "Direct", label: "Farm Sourced" },
              { num: "PH", label: "Highland Grown" },
            ].map(({ num, label }) => (
              <div key={label} style={{ background: "rgba(30,14,6,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1rem 1.25rem", backdropFilter: "blur(8px)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "#A0CC6C", lineHeight: 1, marginBottom: "0.25rem" }}>{num}</div>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#7D7268", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ background: "#6E461E", padding: "0.875rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", gap: "3rem", animation: "marquee 25s linear infinite" }}>
          {["Benguet Arabica", "Sagada Origins", "Green Beans", "Light Roast", "Medium Roast", "Dark Roast", "Farm to Cup Philippines", "Direct Sourcing", "Benguet Arabica", "Sagada Origins", "Green Beans", "Light Roast", "Medium Roast", "Dark Roast", "Farm to Cup Philippines", "Direct Sourcing"].map((item, i) => (
            <span key={i} style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4B896", fontWeight: 500 }}>
              {item} <span style={{ color: "#7FAF5B", margin: "0 0.25rem" }}>&#9679;</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
      </div>

      {/* PHILOSOPHY */}
      <div style={{ padding: "7rem 4rem", backgroundColor: "#FAF0E6" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>Our Philosophy</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "5rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", color: "#6E461E", lineHeight: 1.1, fontWeight: 700, marginBottom: "1.5rem" }}>
                Coffee that tells a <em style={{ fontStyle: "italic", color: "#9C6A32" }}>complete</em> story.
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#9C6A32", lineHeight: 1.8, fontWeight: 300, marginBottom: "2rem" }}>
                Every bean we sell is traceable to a specific farm, a specific farmer, and a specific harvest. This is not marketing — this is how we operate.
              </p>
              <Link href="/about" style={{ textDecoration: "none", fontSize: "0.8rem", color: "#6E461E", fontWeight: 500, borderBottom: "1px solid #6E461E", paddingBottom: "2px" }}>
                Read our story
              </Link>
            </div>
            <div>
              {[
                { num: "01", title: "Grown with care", body: "Cultivated by smallholder farmers in the Cordillera highlands — generations of craft in every cherry picked at peak ripeness." },
                { num: "02", title: "Roasted with intention", body: "From green beans to your preferred roast level. We preserve the origin character of every lot — nothing masked, nothing lost." },
                { num: "03", title: "Traded honestly", body: "Direct sourcing means farmers are paid fairly and you know exactly where your coffee comes from. No middlemen, no mystery." },
              ].map(({ num, title, body }) => (
                <div key={num} style={{ padding: "2rem 0", borderTop: "1px solid #E6DCD2", display: "grid", gridTemplateColumns: "3rem 1fr", gap: "1.5rem", alignItems: "start" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", color: "#C8A87A", paddingTop: "4px" }}>{num}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#6E461E", marginBottom: "0.5rem", fontWeight: 700 }}>{title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#9C6A32", lineHeight: 1.7, fontWeight: 300 }}>{body}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #E6DCD2" }} />
            </div>
          </div>
        </div>
      </div>

      {/* BREW BAR PHOTO STRIP */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "500px" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/images/brewbar/brewbar-interior.jpg"
            alt="Farm to Cup brew bar interior"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(30,14,6,0.3)" }} />
          <div style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem" }}>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#A0CC6C", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>The Brew Bar</span>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#FAF0E6", fontWeight: 700, lineHeight: 1.2 }}>La Trinidad,<br />Benguet</p>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/images/brewbar/brewbar-exterior.jpg"
            alt="Farm to Cup brew bar exterior"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(30,14,6,0.2)" }} />
          <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", textAlign: "right" }}>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#A0CC6C", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>Visit Us</span>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#FAF0E6", fontWeight: 400, lineHeight: 1.5 }}>Philippine Nazarene College<br />Pico Rd, La Trinidad</p>
          </div>
        </div>
      </div>

      {/* ORIGINS */}
      <div style={{ background: "#1E0E06", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "end", marginBottom: "3rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>Our Origins</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FAF0E6", lineHeight: 1.1, fontWeight: 700 }}>The highlands<br />that built us.</h2>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#7D7268", lineHeight: 1.8, fontWeight: 300 }}>
              Each origin carries its own elevation, microclimate, and character. We source from the finest lots across the Philippine Cordillera.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#2D1A0A", border: "1px solid #2D1A0A", borderRadius: "12px", overflow: "hidden" }}>
            {[
              { tag: "Primary origin", name: "Benguet", region: "La Trinidad · 1,400–1,800m", fill: "90%", roasts: "Green · Light · Medium · Dark" },
              { tag: "Featured origin", name: "Sagada", region: "Mountain Province · 1,500–1,700m", fill: "65%", roasts: "Green · Light · Medium" },
              { tag: "New origin", name: "Kalinga", region: "Tabuk City · 800–1,200m", fill: "40%", roasts: "Green · Medium" },
            ].map(({ tag, name, region, fill, roasts }) => (
              <div key={name} style={{ background: "#1A0C04", padding: "2rem 1.75rem" }}>
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>{tag}</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "#FAF0E6", fontWeight: 700, marginBottom: "0.4rem", lineHeight: 1 }}>{name}</div>
                <div style={{ fontSize: "0.75rem", color: "#7D7268", fontWeight: 300, marginBottom: "1.5rem" }}>{region}</div>
                <div style={{ height: "2px", background: "#2D1A0A", borderRadius: "2px", overflow: "hidden", marginBottom: "0.5rem" }}>
                  <div style={{ height: "100%", width: fill, background: "#7FAF5B", borderRadius: "2px" }} />
                </div>
                <div style={{ fontSize: "0.7rem", color: "#5A3818", fontWeight: 500 }}>{roasts}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div style={{ background: "#7FAF5B", padding: "7rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", gridColumn: "1", width: "100%" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3E5F24", fontWeight: 500, marginBottom: "1rem", display: "block" }}>Ready to order?</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#1A0C04", lineHeight: 1.1, fontWeight: 900, marginBottom: "1rem" }}>
            Specialty coffee,<br /><em style={{ fontStyle: "italic" }}>direct</em> from the source.
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#3E5F24", lineHeight: 1.7, fontWeight: 400 }}>
            Order green or roasted beans online. We ship nationwide. Confirmed within 24 hours.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
          <Link href="/pricing" style={{ textDecoration: "none", background: "#1A0C04", color: "#FAF0E6", padding: "1rem 2rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            Shop Coffee Beans &rarr;
          </Link>
          <Link href="/partner" style={{ textDecoration: "none", background: "transparent", color: "#1A0C04", border: "1.5px solid #1A0C04", padding: "1rem 2rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            Partner With Us
          </Link>
          <span style={{ fontSize: "0.75rem", color: "#558233", marginTop: "0.25rem" }}>Ships nationwide &nbsp;·&nbsp; No minimum for first orders</span>
        </div>
      </div>

      {/* LOCATION */}
      <div style={{ background: "#321C0C", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7FAF5B", fontWeight: 500, marginBottom: "1rem", display: "block" }}>Find Us</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FAF0E6", lineHeight: 1.1, fontWeight: 700, marginBottom: "1.5rem" }}>
              Farm to Cup<br /><span style={{ color: "#A0CC6C" }}>Benguet</span>
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#BEB4AA", lineHeight: 1.8, marginBottom: "2rem", fontWeight: 300 }}>
              Visit our brew bar at the heart of La Trinidad. A farm-to-cup experience in the cool Benguet highlands.
            </p>
            {[
              { icon: "📍", label: "Address", value: "Philippine Nazarene College, Pico Rd, La Trinidad, Benguet" },
              { icon: "🕐", label: "Hours", value: "Monday to Saturday, 8:00 AM to 6:00 PM" },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                <div>
                  <p style={{ fontSize: "0.65rem", color: "#7FAF5B", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{label}</p>
                  <p style={{ fontSize: "0.85rem", color: "#BEB4AA", fontWeight: 300 }}>{value}</p>
                </div>
              </div>
            ))}
            <a href="https://maps.google.com/?q=16.4607,120.5927" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "#7FAF5B", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", marginTop: "1rem" }}>
              Get Directions
            </a>
          </div>
          <div style={{ borderRadius: "1rem", overflow: "hidden", height: "24rem", border: "1px solid #462A12" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d964.0!2d120.5927!3d16.4607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a1536645de71%3A0x1b6c5c6d22441d50!2sPhilippine%20Nazarene%20College!5e0!3m2!1sen!2sph!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Farm to Cup Benguet"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
