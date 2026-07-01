import { useState, useEffect } from "react";
import book1 from "../images/booknobg.png";
import book2 from "../images/booknobg.png";
import book3 from "../images/booknobg.png";

/* ─── Slide data (images only — text is static now) ─── */
const slides = [{ imgUrl: book1 }, { imgUrl: book2 }, { imgUrl: book3 }];

/* ─── Fan layout config (5 visible slots: pos -2 to +2) ─── */
const fanSlots = [
  { dx: -230, rotate: -22, scale: 0.68, opacity: 0.45, z: 1, delay: 0 },
  { dx: -115, rotate: -11, scale: 0.82, opacity: 0.7, z: 2, delay: 80 },
  { dx: 0, rotate: 0, scale: 1.0, opacity: 1.0, z: 5, delay: 160 },
  { dx: 115, rotate: 11, scale: 0.82, opacity: 0.7, z: 2, delay: 240 },
  { dx: 230, rotate: 22, scale: 0.68, opacity: 0.45, z: 1, delay: 320 },
];

function HeroSec() {
  const [current, setCurrent] = useState(0);
  const [wrapReady, setWrapReady] = useState(false); // outer fade-in
  const [textReady, setTextReady] = useState(false); // heading / sub / btn
  const [booksReady, setBooksReady] = useState(false); // fan books
  const [footReady, setFootReady] = useState(false); // bottom label

  /* ── Staggered entrance on mount ── */
  useEffect(() => {
    setTimeout(() => setWrapReady(true), 80);
    setTimeout(() => setTextReady(true), 350);
    setTimeout(() => setBooksReady(true), 650);
    setTimeout(() => setFootReady(true), 950);
  }, []);

  /* ── Auto-advance slide (images only) ── */
  useEffect(() => {
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      3500,
    );
    return () => clearInterval(id);
  }, []);

  /* ── Book fan: 5 visible positions around current ── */
  const visibleSlots = [-2, -1, 0, 1, 2].map((pos) => {
    const n = slides.length;
    const idx = (((current + pos) % n) + n) % n;
    return { pos, slide: slides[idx], isCenter: pos === 0 };
  });

  /* ── Per-book inline style ── */
  const bookStyle = (pos, ready) => {
    const cfg = fanSlots[pos + 2];
    return {
      position: "absolute",
      transform: `translateX(${cfg.dx}px) rotate(${cfg.rotate}deg) scale(${cfg.scale})`,
      zIndex: cfg.z,
      opacity: ready ? cfg.opacity : 0,
      transition: "all 0.65s cubic-bezier(0.34,1.36,0.64,1)",
      transitionDelay: ready ? `${cfg.delay}ms` : "0ms",
      cursor: "pointer",
    };
  };

  /* ── Shared fade-slide-up helper ── */
  const fadeUp = (visible, delay = 0, extra = {}) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(-28px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    ...extra,
  });

  return (
    /* ── Outer wrapper — fades in from top ── */
    <div
      style={{
        background:
          "linear-gradient(160deg,#eef2ff 0%,#e0e7ff 45%,#f5f3ff 100%)",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        ...fadeUp(wrapReady),
      }}
    >
      {/* ── Brand label ── */}
      <div
        style={{ marginTop: "52px", textAlign: "center", ...fadeUp(textReady) }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: "800",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7c3aed",
            margin: 0,
          }}
        >
          Library Management System
        </p>
        <div
          style={{
            width: "36px",
            height: "3px",
            borderRadius: "99px",
            background: "linear-gradient(90deg,#7c3aed,#4f46e5)",
            margin: "8px auto 0",
          }}
        />
      </div>

      {/* ── Main heading (static text now) ── */}
      <div
        style={{
          textAlign: "center",
          padding: "0 24px",
          marginTop: "28px",
          ...fadeUp(textReady, 80),
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem,5vw,3.6rem)",
            fontWeight: "900",
            color: "#1e1b4b",
            lineHeight: "1.1",
            margin: "0 0 12px",
            letterSpacing: "-0.025em",
          }}
        >
          Knowledge is
          <br />
          <span style={{ color: "#7c3aed" }}>power</span>
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "#6b7280",
            maxWidth: "430px",
            margin: "0 auto",
            lineHeight: "1.65",
          }}
        >
          Discover our curated collection designed to inform and inspire.
        </p>
      </div>

      {/* ── CTA button ── */}
      <div
        style={{
          marginTop: "28px",
          textAlign: "center",
          ...fadeUp(textReady, 160),
        }}
      >
        <button
          style={{
            background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
            color: "#fff",
            border: "none",
            padding: "14px 38px",
            borderRadius: "50px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 8px 28px rgba(124,58,237,0.35)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 14px 34px rgba(124,58,237,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 28px rgba(124,58,237,0.35)";
          }}
        >
          Browse Library →
        </button>
        <p style={{ marginTop: "10px", fontSize: "12px", color: "#9ca3af" }}>
          Free access for all registered members
        </p>
      </div>

      {/* ── Book fan ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "320px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          marginTop: "24px",
        }}
      >
        {visibleSlots.map(({ pos, slide, isCenter }) => (
          <div
            key={pos}
            style={bookStyle(pos, booksReady)}
            onClick={() => {
              const n = slides.length;
              const idx = (((current + pos) % n) + n) % n;
              setCurrent(idx);
            }}
          >
            <img
              src={slide.imgUrl}
              alt="book"
              style={{
                width: isCenter ? "160px" : "128px",
                height: isCenter ? "248px" : "200px",
                objectFit: "cover",
                borderRadius: "14px",
                display: "block",
                boxShadow: isCenter
                  ? "0 28px 60px rgba(0,0,0,0.22), 0 0 0 3px #fff"
                  : "0 12px 32px rgba(0,0,0,0.13)",
                transition: "all 0.5s ease",
              }}
            />
            {isCenter && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#7c3aed",
                  letterSpacing: "0.06em",
                }}
              >
                ★ Featured
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Dot indicators ── */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "36px",
          alignItems: "center",
          opacity: booksReady ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "30px" : "10px",
              height: "10px",
              borderRadius: "999px",
              background:
                i === current
                  ? "linear-gradient(90deg,#7c3aed,#4f46e5)"
                  : "#c4b5fd",
              cursor: "pointer",
              transition: "all 0.35s ease",
              boxShadow:
                i === current ? "0 2px 8px rgba(124,58,237,0.4)" : "none",
            }}
          />
        ))}
      </div>

      {/* ── Bottom "Future" label ── */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 24px 64px",
          ...fadeUp(footReady, 0, {
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }),
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: "800",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7c3aed",
            marginBottom: "10px",
          }}
        >
          Future
        </p>
        <h2
          style={{
            fontSize: "clamp(1.3rem,3vw,1.9rem)",
            fontWeight: "800",
            color: "#1e1b4b",
            lineHeight: "1.35",
            margin: 0,
          }}
        >
          The future of library management
          <br />
          is here with us
        </h2>
      </div>
    </div>
  );
}

export default HeroSec;
