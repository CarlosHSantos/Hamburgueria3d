"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = ["CARDÁPIO", "INGREDIENTES", "RESTAURANTES", "DELIVERY"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "0.5rem",
              background: "#E31837",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: 900, fontSize: "0.95rem" }}>
              B
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              lineHeight: 1,
            }}
          >
            <span style={{ color: "white", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "-0.01em" }}>
              BRASA
            </span>
            <span style={{ color: "#E31837", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "-0.01em" }}>
              BURGER
            </span>
          </div>
        </div>

        {/* Navigation Links — hidden on small screens */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="nav-links-desktop"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#999",
                textDecoration: "none",
                transition: "color 0.3s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.style.color = "#fff");
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.color = "#999");
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA Area */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a
            href="#"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#999",
              textDecoration: "none",
              letterSpacing: "0.08em",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.color = "#fff");
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.color = "#999");
            }}
          >
            ENTRAR
          </a>
          <button
            className="btn-primary"
            style={{
              padding: "0.65rem 1.5rem",
              fontSize: "0.7rem",
            }}
          >
            PEÇA AGORA
          </button>
        </div>
      </div>

      {/* Hide nav links on mobile via inline <style> */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
