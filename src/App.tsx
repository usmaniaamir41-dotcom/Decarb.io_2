import { useState, useEffect } from "react";

const foods = [
  {
    name: "Veg Biryani Box (since you guys are vegan)",
    seller: "Mysore Kaapi",
    old: "₹180",
    price: "₹79",
    time: 22,
    saved: "56%",
    tag: "Popular",
    color: "#f97316",
    emoji: "🍛",
  },
  {
    name: "Samosa Pack (6 pcs)",
    seller: "Lara's Cafe",
    old: "₹60",
    price: "₹20",
    time: 15,
    saved: "67%",
    tag: "Almost Gone",
    color: "#eab308",
    emoji: "🥟",
  },
  {
    name: "Paneer Wrap Combo",
    seller: "Burger Factory",
    old: "₹140",
    price: "₹55",
    time: 38,
    saved: "61%",
    tag: "New",
    color: "#22c55e",
    emoji: "🌯",
  },
  {
    name: "Butter Naan Set",
    seller: "Mysore University",
    old: "₹90",
    price: "₹35",
    time: 10,
    saved: "61%",
    tag: "Last Few",
    color: "#ef4444",
    emoji: "🫓",
  },
];

const roles = [
  {
    title: "Customer",
    desc: "Discover deeply discounted food nearby before it goes to waste.",
    emoji: "🛍️",
    accent: "#f97316",
    stat: "Save up to 70%",
  },
  {
    title: "Seller",
    desc: "List unsold inventory, recover costs, and cut food waste.",
    emoji: "🏪",
    accent: "#38bdf8",
    stat: "500+ sellers live",
  },
  {
    title: "NGO",
    desc: "Claim donated surplus food and distribute it to those in need.",
    emoji: "🤝",
    accent: "#a78bfa",
    stat: "12K meals donated",
  },
];

function CountdownTimer({ minutes }) {
  const [secs, setSecs] = useState(minutes * 60);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const urgent = m < 10;
  return (
    <span
      style={{
        color: urgent ? "#ef4444" : "#94a3b8",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {urgent && "⚡ "}
      {m}:{String(s).padStart(2, "0")} left
    </span>
  );
}

export default function FoodRescueApp() {
  const [activeRole, setActiveRole] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const addToCart = (food) => {
    setCart((c) => [...c, food]);
    setToast(`${food.emoji} Added ${food.name}!`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div style={styles.root}>
      {/* Ambient background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      {/* Toast */}
      {toast && <div style={styles.toast}>{toast}</div>}

      {/* Cart indicator */}
      {cart.length > 0 && <div style={styles.cartBadge}>🛒 {cart.length}</div>}

      <div style={styles.container}>
        {/* HERO */}
        <header style={styles.hero}>
          <div style={styles.logoRow}>
            <span style={styles.logoEmoji}>🌿</span>
            <span style={styles.logoText}>LastBite</span>
          </div>
          <h1 style={styles.heroTitle}>
            Rescue Food.
            <br />
            <span style={styles.heroAccent}>Save Money.</span>
            <br />
            Feed People.
          </h1>
          <p style={styles.heroSub}>
            Join 80,000+ users turning surplus food into savings — and hope.
          </p>
          <div style={styles.statsRow}>
            {[
              ["12K+", "Meals Rescued"],
              ["500+", "Partner Sellers"],
              ["₹2.1Cr", "Saved by Users"],
            ].map(([val, label]) => (
              <div key={label} style={styles.statBox}>
                <span style={styles.statVal}>{val}</span>
                <span style={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ROLES */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Who are you?</h2>
          <div style={styles.rolesGrid}>
            {roles.map((role) => (
              <div
                key={role.title}
                style={{
                  ...styles.roleCard,
                  borderColor:
                    activeRole === role.title
                      ? role.accent
                      : "rgba(255,255,255,0.07)",
                  boxShadow:
                    activeRole === role.title
                      ? `0 0 0 1px ${role.accent}, 0 8px 40px ${role.accent}22`
                      : "0 2px 16px #0005",
                  transform:
                    activeRole === role.title ? "translateY(-4px)" : "none",
                }}
                onClick={() => setActiveRole(role.title)}
              >
                <div
                  style={{
                    ...styles.roleEmoji,
                    background: `${role.accent}18`,
                  }}
                >
                  {role.emoji}
                </div>
                <h3 style={{ ...styles.roleTitle, color: role.accent }}>
                  {role.title}
                </h3>
                <p style={styles.roleDesc}>{role.desc}</p>
                <div style={{ ...styles.roleStat, color: role.accent }}>
                  {role.stat}
                </div>
                <button
                  style={{ ...styles.enterBtn, background: role.accent }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveRole(role.title);
                  }}
                >
                  Enter →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FOOD LISTINGS */}
        <section style={styles.section}>
          <div style={styles.dashHeader}>
            <h2 style={styles.sectionTitle}>Live Listings Near You</h2>
            <div style={styles.liveTag}>● LIVE</div>
          </div>
          <div style={styles.foodGrid}>
            {foods.map((food) => (
              <div key={food.name} style={styles.foodCard}>
                {/* Image area */}
                <div
                  style={{
                    ...styles.foodImg,
                    background: `radial-gradient(circle at 40% 40%, ${food.color}33, #1e293b)`,
                  }}
                >
                  <span style={styles.foodBigEmoji}>{food.emoji}</span>
                  <div style={{ ...styles.foodTag, background: food.color }}>
                    {food.tag}
                  </div>
                  <div style={styles.foodTimer}>
                    <CountdownTimer minutes={food.time} />
                  </div>
                </div>

                <div style={styles.foodBody}>
                  <h3 style={styles.foodName}>{food.name}</h3>
                  <p style={styles.foodSeller}>📍 {food.seller}</p>

                  <div style={styles.foodPriceRow}>
                    <div>
                      <span style={styles.oldPrice}>{food.old}</span>
                      <span style={styles.newPrice}>{food.price}</span>
                    </div>
                    <div
                      style={{
                        ...styles.savedBadge,
                        background: `${food.color}22`,
                        color: food.color,
                      }}
                    >
                      -{food.saved}
                    </div>
                  </div>

                  <button
                    style={{ ...styles.addBtn, background: food.color }}
                    onClick={() => addToCart(food)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IMPACT BANNER */}
        <section style={styles.impactBanner}>
          <div style={styles.impactInner}>
            <span style={{ fontSize: 32 }}>🌍</span>
            <div>
              <div style={styles.impactTitle}>Every order fights waste</div>
              <div style={styles.impactSub}>
                1 in 3 meals produced globally is wasted. You can change that.
              </div>
            </div>
            <button style={styles.impactBtn}>Learn More</button>
          </div>
        </section>

        <footer style={styles.footer}>
          © 2026 LastBite · Built with 💚 for a sustainable future
        </footer>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#090f1a",
    color: "#f1f5f9",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed",
    top: -120,
    left: -100,
    width: 500,
    height: 500,
    background: "radial-gradient(circle, #16a34a22, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
  },
  blob2: {
    position: "fixed",
    bottom: 0,
    right: -120,
    width: 600,
    height: 600,
    background: "radial-gradient(circle, #f9731622, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
  },
  blob3: {
    position: "fixed",
    top: "40%",
    left: "50%",
    width: 400,
    height: 400,
    background: "radial-gradient(circle, #38bdf815, transparent 70%)",
    borderRadius: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  toast: {
    position: "fixed",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#16a34a",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: 99,
    fontFamily: "monospace",
    fontWeight: 700,
    fontSize: 14,
    zIndex: 999,
    boxShadow: "0 4px 24px #16a34a55",
  },
  cartBadge: {
    position: "fixed",
    top: 20,
    right: 24,
    background: "#f97316",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: 99,
    fontWeight: 700,
    fontSize: 14,
    zIndex: 99,
    boxShadow: "0 2px 16px #f9731655",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 20px",
    position: "relative",
    zIndex: 1,
  },
  hero: { textAlign: "center", padding: "80px 0 60px" },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 28,
  },
  logoEmoji: { fontSize: 32 },
  logoText: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#16a34a",
    fontFamily: "monospace",
  },
  heroTitle: {
    fontSize: "clamp(36px, 6vw, 72px)",
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    margin: "0 0 20px",
  },
  heroAccent: { color: "#4ade80" },
  heroSub: {
    color: "#94a3b8",
    fontSize: 18,
    marginBottom: 40,
    maxWidth: 500,
    margin: "0 auto 40px",
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: 32,
    flexWrap: "wrap",
  },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center" },
  statVal: { fontSize: 28, fontWeight: 700, color: "#4ade80" },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },

  section: { marginBottom: 64 },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 400,
    marginBottom: 28,
    letterSpacing: "-0.01em",
  },
  dashHeader: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 28,
  },
  liveTag: {
    background: "#ef444422",
    color: "#ef4444",
    padding: "4px 12px",
    borderRadius: 99,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    border: "1px solid #ef444433",
  },

  rolesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },
  roleCard: {
    background: "rgba(15,23,42,0.8)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 20,
    padding: 28,
    cursor: "pointer",
    transition: "all 0.25s ease",
    backdropFilter: "blur(12px)",
  },
  roleEmoji: {
    width: 56,
    height: 56,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    marginBottom: 16,
  },
  roleTitle: { fontSize: 22, fontWeight: 600, marginBottom: 8 },
  roleDesc: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  roleStat: { fontSize: 13, fontWeight: 600, marginBottom: 20 },
  enterBtn: {
    border: "none",
    color: "#000",
    padding: "10px 22px",
    borderRadius: 99,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit",
  },

  foodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
  },
  foodCard: {
    background: "rgba(15,23,42,0.9)",
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
    transition: "transform 0.2s",
  },
  foodImg: {
    height: 150,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  foodBigEmoji: { fontSize: 64, filter: "drop-shadow(0 4px 12px #0008)" },
  foodTag: {
    position: "absolute",
    top: 12,
    left: 12,
    padding: "3px 10px",
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 700,
    color: "#000",
  },
  foodTimer: {
    position: "absolute",
    bottom: 10,
    right: 12,
    fontSize: 12,
    fontWeight: 600,
  },
  foodBody: { padding: 18 },
  foodName: { fontSize: 17, fontWeight: 600, marginBottom: 4 },
  foodSeller: { color: "#64748b", fontSize: 13, marginBottom: 14 },
  foodPriceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  oldPrice: {
    display: "block",
    textDecoration: "line-through",
    color: "#475569",
    fontSize: 13,
  },
  newPrice: { fontSize: 26, fontWeight: 700 },
  savedBadge: {
    padding: "4px 10px",
    borderRadius: 99,
    fontSize: 13,
    fontWeight: 700,
  },
  addBtn: {
    width: "100%",
    border: "none",
    color: "#000",
    padding: "11px",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "opacity 0.15s",
  },

  impactBanner: {
    background: "linear-gradient(135deg, #14532d22, #166534aa)",
    border: "1px solid #16a34a33",
    borderRadius: 20,
    padding: 32,
    marginBottom: 48,
  },
  impactInner: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  impactTitle: { fontSize: 20, fontWeight: 600, marginBottom: 4 },
  impactSub: { color: "#94a3b8", fontSize: 14 },
  impactBtn: {
    marginLeft: "auto",
    background: "#16a34a",
    border: "none",
    color: "#fff",
    padding: "10px 22px",
    borderRadius: 99,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 14,
    whiteSpace: "nowrap",
  },

  footer: {
    textAlign: "center",
    color: "#334155",
    padding: "24px 0 40px",
    fontSize: 13,
  },
};
