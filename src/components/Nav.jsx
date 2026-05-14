

import { useEffect, useRef, useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── NAV BAR ── */
  .snav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 64px;
    background: rgba(8,8,8,0.9);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid #161616;
    transition: border-color 0.3s ease;
  }
  .snav--scrolled { border-bottom-color: rgba(58,85,112,0.28); }

  /* ── LOGO ── */
  .snav__logo {
    // font-family: 'Bebas Neue', sans-serif;
    font-size: 1.08rem;
    letter-spacing: 0.14em;
    color: #f0f0f0;
    text-decoration: none;
    user-select: none;
    z-index: 210;
  }

  /* ── DESKTOP LINKS ── */
  .snav__links {
    list-style: none;
    display: flex;
    gap: 60px;
    margin: 0; padding: 0;
  }
  .snav__links button {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #f0f0f099;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    padding-bottom: 2px;
    transition: color 0.25s ease;
  }
  .snav__links button::after {
    content: '';
    position: absolute;
    left: 0; bottom: -2px;
    width: 0; height: 1px;
    background: rgba(58,85,112,0.7);
    transition: width 0.3s ease;
  }
  .snav__links button:hover { color: #f0f0f0; }
  .snav__links button:hover::after { width: 100%; }
  .snav__links button.snav__active { color: #f0f0f0; }
  .snav__links button.snav__active::after { width: 100%; background: #3a5570; }

  /* ── HAMBURGER (mobile only) ── */
  .snav__burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 32px; 
    height: 32px;
    background: none; 
    border: none;
    cursor: pointer;
    z-index: 210;
    padding: 4px;
  }
  .snav__burger span {
    display: block;
    width: 100%; 
    height: 1px;
    background: #f0f0f0;
    transition: transform 0.35s ease, opacity 0.25s ease, width 0.3s ease;
    transform-origin: center;
  }
  /* open state */
  .snav__burger--open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .snav__burger--open span:nth-child(2) { opacity: 0; width: 0; }
  .snav__burger--open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  /* ── MOBILE MENU OVERLAY ── */
  .snav__overlay {
    position: fixed;
    inset: 0;
    z-index: 190;
    background: rgba(8,8,8,0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 40px 80px;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-12px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .snav__overlay--open {
    opacity: 1;
    transform: none;
    pointer-events: all;
  }

  /* thin accent rule above menu items */
  .snav__overlay::before {
    content: '';
    display: block;
    width: 40px; height: 1px;
    // background: rgba(58,85,112,0.6);
    backdrop: #f0f0f0;
    margin-bottom: 48px;
  }

  .snav__menu {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .snav__menu button {
    // font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.8rem, 12vw, 4.5rem);
    letter-spacing: 0.04em;
    color: white;
    background: none; border: none;
    cursor: pointer;
    line-height: 1;
    text-align: left;
    padding: 4px 0;
    transition: color 0.2s ease;
    width: 100%;
  }
  .snav__menu button:hover { color: #f0f0f0; }
  .snav__menu button.snav__active { color: #f0f0f0; }

  /* stagger each item in */
  .snav__overlay--open .snav__menu li:nth-child(1) button { animation: menuItem 0.4s ease 0.05s both; }
  .snav__overlay--open .snav__menu li:nth-child(2) button { animation: menuItem 0.4s ease 0.12s both; }
  .snav__overlay--open .snav__menu li:nth-child(3) button { animation: menuItem 0.4s ease 0.19s both; }
  .snav__overlay--open .snav__menu li:nth-child(4) button { animation: menuItem 0.4s ease 0.26s both; }

  @keyframes menuItem {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: none; }
  }

  /* small tag below each menu item */
//   .snav__menu-sub {
//     // font-family: 'DM Sans', sans-serif;
//     font-size: 0.62rem;
//     font-weight: 400;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     // color: #333;
//     color: white;
//     margin-top: 0;
//     padding-left: 2px;
//   }

  /* bottom strip */
  .snav__overlay-footer {
    position: absolute;
    bottom: 32px; left: 40px; right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .snav__overlay-footer span {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    // color: #2a2a2a;
    color: white;
  }

  /* ── BREAKPOINT ── */
  @media (max-width: 600px) {
    .snav { padding: 0 20px; }
    .snav__links { display: none; } /* hide desktop links */
    .snav__burger { display: flex; } /* show hamburger */
    .snav__overlay { padding: 0 24px 80px; }
    .snav__overlay-footer { left: 24px; right: 24px; }
  }
`;

const LINKS = [
  { label: "Home", key: "home", sub: "Start here" },
  { label: "Work", key: "work", sub: "Selected projects" },
  { label: "About", key: "about", sub: "The person behind the lens" },
  { label: "Contact", key: "contact", sub: "Get in touch" },
];

export default function Nav({ activePage = "", onNavigate }) {
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);

  /* scroll tint */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("snav--scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when overlay is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNav = (key) => {
    setOpen(false);
    onNavigate?.(key);
  };

  return (
    <>
      <style>{CSS}</style>

      <nav ref={navRef} className="snav" aria-label="Primary navigation">
        <a href="/" className="snav__logo">NAKUL</a>

        {/* ── desktop links ── */}
        <ul className="snav__links">
          {LINKS.map(({ label, key }) => (
            <li key={key}>
              <button
                className={activePage === key ? "snav__active" : ""}
                aria-current={activePage === key ? "page" : undefined}
                onClick={() => handleNav(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* ── hamburger ── */}
        <button
          className={`snav__burger${open ? " snav__burger--open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── mobile overlay menu ── */}
      <div
        className={`snav__overlay${open ? " snav__overlay--open" : ""}`}
        aria-hidden={!open}
      >
        <ul className="snav__menu" role="menu">
          {LINKS.map(({ label, key, sub }) => (
            <li key={key} role="none">
              <button
                role="menuitem"
                className={activePage === key ? "snav__active" : ""}
                onClick={() => handleNav(key)}
              >
                {label}
              </button>
              <p className="snav__menu-sub">{sub}</p>
            </li>
          ))}
        </ul>

        <div className="snav__overlay-footer">
          <span>© 2024 Nakul</span>
          <span>Film · Documentary · Brand</span>
        </div>
      </div>
    </>
  );
}
