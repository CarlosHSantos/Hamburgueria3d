"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ingredients = [
  {
    emoji: "🍞",
    text: "Pão brioche artesanal com gergelim",
    side: "left" as const,
  },
  {
    emoji: "🥬",
    text: "Alface americana fresca e crocante",
    side: "right" as const,
  },
  {
    emoji: "🍅",
    text: "Tomate italiano maduro na rama",
    side: "left" as const,
  },
  {
    emoji: "🧀",
    text: "Queijo cheddar duplo derretido",
    side: "right" as const,
  },
  {
    emoji: "🥩",
    text: "Blend exclusivo de carne Angus 180g",
    side: "left" as const,
  },
  {
    emoji: "🌾",
    text: "Pão artesanal tostado na chapa",
    side: "right" as const,
  },
];

const menuItems = [
  {
    name: "Smash Artesanal",
    description:
      "Dois smash de carne Angus 90g, queijo cheddar, cebola caramelizada, picles e molho especial da casa.",
    price: "R$ 39,90",
    calories: "680 kcal",
    rating: 5.0,
    reviews: 3210,
  },
  {
    name: "Brasa Clássico",
    description:
      "Hambúrguer de 180g grelhado na brasa, queijo prato, alface, tomate e maionese trufada.",
    price: "R$ 34,90",
    calories: "580 kcal",
    rating: 4.9,
    reviews: 2847,
  },
  {
    name: "Double Bacon",
    description:
      "Dois blends de 120g, bacon crocante, queijo cheddar, cebola crispy e molho barbecue defumado.",
    price: "R$ 44,90",
    calories: "820 kcal",
    rating: 4.8,
    reviews: 1953,
  },
];

export default function HtmlOverlay() {
  const heroRef = useRef<HTMLElement>(null);
  const ingredientsRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance animations ──
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-cta-group",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" }
      );

      // ── Hero fade out on scroll ──
      gsap.to(".hero-content", {
        opacity: 0,
        y: -60,
        scrollTrigger: {
          trigger: ".section-hero",
          start: "50% top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── Ingredient section title ──
      gsap.fromTo(
        ".ingredients-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".section-ingredients",
            start: "top center",
            end: "12% center",
            scrub: 1,
          },
        }
      );

      // ── Ingredient labels staggered fade in ──
      const labels = document.querySelectorAll(".ingredient-label");
      labels.forEach((label, i) => {
        const isRight = label.classList.contains("from-right");
        gsap.fromTo(
          label,
          { opacity: 0, x: isRight ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: ".section-ingredients",
              start: () => `${8 + i * 10}% center`,
              end: () => `${18 + i * 10}% center`,
              scrub: 1,
            },
          }
        );
      });

      // ── Menu section ──
      gsap.fromTo(
        ".menu-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: ".section-menu",
            start: "top 75%",
            end: "25% center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".menu-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".section-menu",
            start: "15% 75%",
            end: "45% center",
            scrub: 1,
          },
        }
      );

      // ── Footer ──
      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".section-footer",
            start: "top 85%",
            end: "25% center",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════ */}
      <section ref={heroRef} className="section-hero" id="hero">
        {/* Gradient overlay: dark at top → transparent at bottom
            so hero text is readable over the 3D burger below */}
        <div className="hero-gradient" />

        <div
          className="hero-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            maxWidth: "52rem",
          }}
        >
          {/* Badge */}
          <span
            className="hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "9999px",
              background: "rgba(26, 26, 26, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "0.75rem",
              color: "#999",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
            }}
          >
            <span style={{ fontSize: "1rem" }}>🔥</span> Excelência na Brasa
          </span>

          {/* Title */}
          <h1
            className="hero-title text-shadow-strong"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              textAlign: "center" as const,
            }}
          >
            <span style={{ display: "block" }}>GRELHADO</span>
            <span className="gradient-text" style={{ display: "block" }}>
              NA BRASA
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                marginTop: "0.5rem",
                color: "#888",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              DESDE 2024
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle"
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              color: "#888",
              maxWidth: "36rem",
              textAlign: "center" as const,
              lineHeight: 1.7,
            }}
          >
            Experimente o verdadeiro sabor da carne grelhada no fogo, com
            ingredientes frescos e o inconfundível sabor artesanal. Cada
            hambúrguer é feito sob medida, do seu jeito.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-cta-group"
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            <button className="btn-primary">Peça Agora</button>
            <button className="btn-secondary">Ver Cardápio</button>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: "0.5rem",
              color: "#444",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase" as const,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1.25rem",
                height: "2rem",
                border: "1px solid #444",
                borderRadius: "9999px",
                display: "flex",
                justifyContent: "center",
                paddingTop: "0.35rem",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "6px",
                  background: "#555",
                  borderRadius: "9999px",
                  animation: "bounce 1.5s infinite",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INGREDIENTS SECTION
          ════════════════════════════════════════════ */}
      <section
        ref={ingredientsRef}
        className="section-ingredients"
        id="ingredientes"
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Section title */}
          <div
            className="ingredients-title"
            style={{
              position: "absolute",
              top: "6rem",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center" as const,
              zIndex: 5,
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: "#888",
              }}
            >
              Cada Detalhe Importa
            </span>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 900,
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              NOSSOS{" "}
              <span style={{ color: "#E31837" }}>INGREDIENTES</span>
            </h2>
          </div>

          {/* Left labels */}
          <div
            style={{
              position: "absolute",
              left: "5%",
              display: "flex",
              flexDirection: "column" as const,
              gap: "4.5rem",
            }}
          >
            {ingredients
              .filter((ing) => ing.side === "left")
              .map((ing, i) => (
                <div key={i} className="ingredient-label">
                  <span className="emoji">{ing.emoji}</span>
                  <span>{ing.text}</span>
                </div>
              ))}
          </div>

          {/* Right labels */}
          <div
            style={{
              position: "absolute",
              right: "5%",
              display: "flex",
              flexDirection: "column" as const,
              gap: "4.5rem",
            }}
          >
            {ingredients
              .filter((ing) => ing.side === "right")
              .map((ing, i) => (
                <div key={i} className="ingredient-label from-right">
                  <span className="emoji">{ing.emoji}</span>
                  <span>{ing.text}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MENU / DESTAQUE SECTION
          ════════════════════════════════════════════ */}
      <section ref={menuRef} className="section-menu" id="cardápio">
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Featured product card */}
          <div className="menu-card" style={{ justifySelf: "start" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "1.25rem",
              }}
            >
              PROVE O
              <br />
              <span className="gradient-text">SMASH ARTESANAL</span>
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span className="stars">★★★★★</span>
              <span style={{ fontWeight: 700 }}>{menuItems[0].rating}</span>
              <span style={{ color: "#888", fontSize: "0.85rem" }}>
                ({menuItems[0].reviews.toLocaleString("pt-BR")} avaliações)
              </span>
            </div>

            <p
              style={{
                color: "#888",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                maxWidth: "28rem",
              }}
            >
              {menuItems[0].description}
            </p>

            <div style={{ marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "2rem", fontWeight: 900 }}>
                {menuItems[0].price}
              </span>
            </div>
            <span
              style={{
                fontSize: "0.8rem",
                color: "#555",
                display: "block",
                marginBottom: "2rem",
              }}
            >
              {menuItems[0].calories}
            </span>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="btn-secondary">Adicionar ao Carrinho</button>
              <button className="btn-primary">Peça Agora</button>
            </div>
          </div>

          {/* Other menu items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "1rem",
            }}
          >
            {menuItems.slice(1).map((item, i) => (
              <div
                key={i}
                className="menu-item"
                style={{
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  background: "rgba(17, 17, 17, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style.borderColor =
                    "rgba(227, 24, 55, 0.25)");
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.04)");
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        marginBottom: "0.35rem",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        color: "#888",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        maxWidth: "28rem",
                      }}
                    >
                      {item.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <span
                        className="stars"
                        style={{ fontSize: "0.85rem" }}
                      >
                        ★★★★★
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#888" }}>
                        {item.rating} ({item.reviews.toLocaleString("pt-BR")})
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                      }}
                    >
                      {item.price}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.7rem",
                        color: "#555",
                        marginTop: "0.25rem",
                      }}
                    >
                      {item.calories}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#E31837",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                marginTop: "1rem",
                textDecoration: "none",
                transition: "gap 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.style.gap = "1rem");
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.gap = "0.5rem");
              }}
            >
              VER CARDÁPIO COMPLETO
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER SECTION
          ════════════════════════════════════════════ */}
      <section ref={footerRef} className="section-footer" id="contato">
        <div
          className="footer-content"
          style={{ maxWidth: "80rem", margin: "0 auto", width: "100%" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "3rem",
              marginBottom: "4rem",
            }}
          >
            {/* We use CSS media queries via style workaround for grid */}
          </div>

          {/* Footer grid with inline responsive approach */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Brand */}
            <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.5rem",
                    background: "#E31837",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{ color: "white", fontWeight: 900, fontSize: "1rem" }}
                  >
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
                  <span style={{ fontWeight: 900, fontSize: "0.9rem" }}>
                    BRASA
                  </span>
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: "0.9rem",
                      color: "#E31837",
                    }}
                  >
                    BURGER
                  </span>
                </div>
              </div>
              <p style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.7 }}>
                O verdadeiro sabor da carne grelhada na brasa. Ingredientes
                frescos, blend exclusivo de carne Angus.
              </p>
            </div>

            {/* Links */}
            <div style={{ flex: "1 1 140px", minWidth: "140px" }}>
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  marginBottom: "1rem",
                }}
              >
                NAVEGAÇÃO
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
                {["Cardápio", "Ingredientes", "Restaurantes", "Delivery"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          color: "#888",
                          fontSize: "0.85rem",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget.style.color = "#fff");
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget.style.color = "#888");
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Horários */}
            <div style={{ flex: "1 1 160px", minWidth: "160px" }}>
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  marginBottom: "1rem",
                }}
              >
                HORÁRIOS
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "0.75rem", color: "#888", fontSize: "0.85rem" }}>
                <li>Seg a Sex: 11h às 23h</li>
                <li>Sábado: 11h às 00h</li>
                <li>Domingo: 12h às 22h</li>
                <li style={{ color: "#E31837", fontWeight: 500 }}>
                  🔥 Happy Hour: 17h-19h
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  marginBottom: "1rem",
                }}
              >
                CONTATO
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "0.75rem", color: "#888", fontSize: "0.85rem" }}>
                <li>📍 Av. Paulista, 1000 — SP</li>
                <li>📞 (11) 99999-9999</li>
                <li>✉️ contato@brasaburger.com.br</li>
              </ul>
              <div
                style={{ display: "flex", gap: "1.25rem", marginTop: "1.5rem" }}
              >
                {["Instagram", "TikTok", "WhatsApp"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      textDecoration: "none",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget.style.color = "#E31837");
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget.style.color = "#888");
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.04)",
              paddingTop: "2rem",
              display: "flex",
              flexWrap: "wrap" as const,
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <p style={{ color: "#555", fontSize: "0.75rem" }}>
              © 2024 Brasa Burger. Todos os direitos reservados.
            </p>
            <p style={{ color: "#555", fontSize: "0.75rem" }}>
              Feito com 🔥 e paixão por hambúrgueres artesanais.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
