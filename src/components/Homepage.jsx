import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

// ─── Minimal CSS — only what Tailwind cannot do ─────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

  .font-bebas { font-family: 'Bebas Neue', sans-serif; }
  .font-dm { font-family: 'DM Sans', sans-serif; }

  /* Cinematic background */
  .hero-bg {
    background:
      radial-gradient(ellipse 50% 65% at 74% 36%, rgba(30,55,90,0.75) 0%, transparent 60%),
      radial-gradient(ellipse 28% 35% at 80% 18%, rgba(45,80,130,0.35) 0%, transparent 52%),
      radial-gradient(ellipse 70% 55% at 62% 52%, rgba(10,18,35,0.90) 0%, transparent 75%),
      linear-gradient(155deg, #060810 0%, #0a0f1a 45%, #060709 100%);
  }
  .hero-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 45% 55% at 68% 42%, rgba(58,85,112,0.30) 0%, transparent 68%),
      linear-gradient(130deg, transparent 38%, rgba(58,85,112,0.12) 100%);
    z-index: 1;
  }
  .hero-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to right, rgba(6,8,16,0.95) 0%, rgba(6,8,16,0.55) 44%, rgba(6,8,16,0.10) 100%),
      linear-gradient(to top, rgba(6,8,16,0.90) 0%, transparent 44%),
      linear-gradient(to bottom, rgba(6,8,16,0.55) 0%, transparent 26%);
    z-index: 2;
  }

  /* Film grain */
  .hero-grain {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  /* Scanlines */
  .hero-scan {
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px, transparent 3px,
      rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px
    );
  }

  /* Image frame clip */
  .img-frame {
    clip-path: polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%);
  }
  .img-frame::after {
    content: '';
    position: absolute;
    inset: 8px;
    border: 1px solid rgba(58,85,112,0.09);
    clip-path: polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%);
  }

  /* Headline clip-path — GSAP animates this */
  .hero-headline {
    clip-path: inset(0 100% 0 0);
  }

  /* Hover states — Tailwind can't do border-color on hover with rgba */
  .btn-primary:hover {
    border-color: #3a5570 !important;
    background: rgba(58,85,112,0.14) !important;
  }
  .btn-ghost:hover { color: #f0f0f0 !important; }

  /* Mobile */
  @media (max-width: 640px) {
    .hero-img-wrap { display: none; }
  }
`;

export default function Home() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const ruleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const imgRef = useRef(null);
  const lenisRef = useRef(null);

  // ── Lenis smooth scroll ──────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenisRef.current = lenis;

    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);

    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  // ── GSAP mount timeline ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow — fade + slide up
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.3
      );

      // Headline — clip-path wipe left to right
      tl.to(headlineRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut" },
        0.55
      );

      // Rule — width expand
      tl.fromTo(ruleRef.current,
        { width: 0 },
        { width: 52, duration: 0.7, ease: "power2.out" },
        1.05
      );

      // Subheadline — fade + slide up
      tl.fromTo(subRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.18
      );

      // CTAs — fade + slide up
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.48
      );

      // Image — fade + slide in from right
      tl.fromTo(imgRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1.0 },
        0.9
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{css}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#080808] font-dm"
        style={{ height: "140vh", minHeight: 675 }}
        aria-label="Nakul — Cinematic Video Editor"
      >

        {/* Cinematic background */}
        <div className="hero-bg absolute inset-0 z-0" aria-hidden="true" />

        {/* Film grain */}
        <div
          className="hero-grain absolute  inset-0 z-3 pointer-events-none"
          style={{ opacity: 0.05 }}
          aria-hidden="true"
        />

        {/* Scanlines */}
        <div className="hero-scan absolute inset-0 z-3 pointer-events-none" aria-hidden="true" />

        {/* ── Portrait placeholder — right, vertically centred ── */}
        <div
          ref={imgRef}
          className=" lg:block hidden hero-img-wrap absolute z-4 lg:top-[50%] lg:right-[12%] translate-y-[-50%]  flex flex-col items-center gap-5"
          
        >
          <div
            className="img-frame relative flex items-center justify-center
              border border-[rgba(58,85,112,0.22)] bg-[rgba(58,85,112,0.035)]"
            style={{ width: 320, height: 470 }}
          >
            <span
              className="font-dm  text-white text-[9px] tracking-[0.18em] uppercase text-center
                ]"
              style={{ lineHeight: 2 }}
            >
              <img className="w-full h-full object-cover" src="https://i.pinimg.com/736x/9b/da/02/9bda024e50b719387cd088d57f176ae6.jpg" alt="Homepage-image" />
            </span>
          </div>
          <span className="font-dm text-[12px] tracking-[0.26em] ml-[8vw]  uppercase text-[#6d6c6c]">
            Nakul
          </span>
        </div>

        {/* ── Main content ── */}
        <div
          className="absolute top-0 left-0 bottom-0 z-4 flex flex-col gap-[3vw] justify-start"
          style={{ maxWidth: 810, padding: "0 40px", paddingTop: "22vh", paddingBottom: 120 }}
        >

          {/* Eyebrow */}
          {/* <p
            ref={eyebrowRef}
            className="font-dm text-[14px] hidden font-normal uppercase mb-5.5
              flex items-center gap-3 text-[rgba(58,85,112,0.95)]"
            style={{ letterSpacing: "0.26em", opacity: 0 }}
          >
            <span
              className="inline-block shrink-0 bg-[rgba(58,85,112,0.95)]"
              style={{ width: 28, height: 1 }}
              aria-hidden="true"
            />
            Nakul
          </p> */}

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="hero-headline uppercase text-[#f0f0f0] mb-8"
            style={{
              fontSize: "clamp(64px, 9.5vw, 132px)",
              letterSpacing: "0.03em",
              lineHeight: 0.9,
            }}
            aria-label="Footage that earns its cut"
          >
            Footage that<br />earns its cut
          </h1>

          {/* Accent rule */}
          <div
            ref={ruleRef}
            className="bg-[rgba(58,85,112,0.45)] mb-7"
            style={{ width: 0, height: 1 }}
            aria-hidden="true"
          />

          {/* Subheadline */}
          <p
            ref={subRef}
            className="font-dm font-light text-[rgba(240,240,240,0.60)] mb-11"
            style={{
              fontSize: "clamp(14px, 1.35vw, 17px)",
              letterSpacing: "0.015em",
              lineHeight: 1.85,
              maxWidth: 520,
              opacity: 0,
            }}
          >
            <strong className="font-normal text-[rgba(240,240,240,0.85)]">
              Hi ! I am Nakul, a cinematic video editor
            </strong>{" "}
            — specialising in documentary, brand films, and narrative content.
            Most editors hand back a timeline. I hands back a story:
            structured, paced, and built to hold an audience from the first
            frame to the last. If your footage isn't converting, connecting,
            or landing the way it should — that's the problem I fixes.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex items-center gap-7"
            style={{ opacity: 0 }}
          >
            <a
              href="#work"
              className="btn-primary font-dm font-normal uppercase text-[#f0f0f0]
                no-underline border border-[rgba(58,85,112,0.65)]
                bg-[rgba(8,8,8,0.20)] transition-all duration-300"
              style={{ fontSize: 11, letterSpacing: "0.18em", padding: "13px 30px" }}
            >
              View Work
            </a>
            <a
              href="#reel"
              className="btn-ghost font-dm font-light uppercase no-underline
                text-[rgba(240,240,240,0.50)] transition-colors duration-300"
              style={{ fontSize: 11, letterSpacing: "0.16em" }}
            >
              Watch Reel&nbsp;↓
            </a>
          </div>

        </div>

      </section>
    </>
  );
}
