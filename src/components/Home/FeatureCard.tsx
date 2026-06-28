import { useEffect, useRef, useState } from "react";

/**
 * FeatureCardUnified
 * ------------------
 * Self-contained, looping "Design + engineering, unified" workspace animation.
 * No external deps beyond React. Fonts (Inter + JetBrains Mono) are loaded from
 * Google Fonts on mount — swap them for your own faces if you like.
 *
 * Usage:
 *   import FeatureCardUnified from "./FeatureCardUnified";
 *   <FeatureCardUnified />
 *
 *   // override copy:
 *   <FeatureCardUnified
 *     eyebrow="Featured"
 *     headline="Design + engineering, unified."
 *     lede="Our designers and engineers don’t hand off…"
 *   />
 *
 * Props:
 *   eyebrow, headline, lede  – copy
 *   designerLabel, engineerLabel – cursor labels
 *   maxScale (default 1.22)  – how far the 760×600 stage may upscale on wide screens
 *   className, style         – passthrough on the outer wrapper
 *
 * Notes:
 *   • Fully responsive: the fixed 760×600 stage auto-scales to its container.
 *   • Respects prefers-reduced-motion (calm, composed still).
 */
export default function FeatureCardUnified({
  eyebrow = "Featured",
  headline = "Design + engineering, unified.",
  lede = "Our designers and engineers don\u2019t hand off \u2014 they work together from day one. Decisions get made in the same room, on the same Slack.",
  designerLabel = "Designer",
  engineerLabel = "Engineer",
  maxScale = 1.22,
  className = "",
  style = {},
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState("00:14");

  // load fonts once
  useEffect(() => {
    const id = "jsu-fonts";
    if (typeof document !== "undefined" && !document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  // scale the 760×600 stage to fit its container
  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;
    const W = 760;
    const H = 600;

    const fit = () => {
      const w = frame.clientWidth || W;
      const s = Math.min(w / W, maxScale);
      stage.style.transform = `scale(${s})`;
      frame.style.height = `${H * s}px`;
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(fit)
        : null;

    resizeObserver?.observe(frame);

    window.addEventListener("resize", fit);
    fit();

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [maxScale]);

  // live timer (sells "live"); paused for reduced-motion users
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let t = 14;
    const id = setInterval(() => {
      t += 1;
      const m = String(Math.floor(t / 60)).padStart(2, "0");
      const s = String(t % 60).padStart(2, "0");
      setClock(`${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`jsu-embed ${className}`} style={style}>
      <style>{CSS}</style>
      <div className="jsu-frame" ref={frameRef}>
        <div className="jsu-stage" ref={stageRef}>
          {/* live workspace */}
          <section className="jsu-canvas">
            <div className="jsu-topbar">
              JOEL&nbsp;Studios&nbsp;&nbsp;·&nbsp;&nbsp;<b>workspace</b>&nbsp;&nbsp;·&nbsp;&nbsp;live
            </div>
            <div className="jsu-rec"><i />REC</div>

            {/* tokens card */}
            <div className="jsu-card jsu-tokens">
              <div className="jsu-clabel">tokens · design</div>
              <div className="jsu-pills">
                <span className="jsu-pill b flash">color.blue.6</span>
                <span className="jsu-pill r flash">radius.lg</span>
                <span className="jsu-pill g flash">type.h2</span>
              </div>
            </div>

            {/* design <-> code */}
            <div className="jsu-card jsu-swap">
              <div className="jsu-clabel jsu-clabel--row">
                design
                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 3h10M8.5 1 11 3l-2.5 2" />
                  <path d="M14 6H4M6.5 8 4 6l2.5-2" />
                </svg>
                code
              </div>
              <div className="jsu-ico">
                <svg viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <g className="a1"><path d="M3 6h26" /><path d="M25 2l4 4-4 4" /></g>
                  <g className="a2"><path d="M31 12H5" /><path d="M9 16l-4-4 4-4" /></g>
                </svg>
              </div>
            </div>

            {/* build card */}
            <div className="jsu-card jsu-build">
              <div className="jsu-row">
                <span className="jsu-clabel">build · 042</span>
                <span className="jsu-ship"><i />shipping</span>
              </div>
              <div className="jsu-pct">94<span>%</span></div>
              <div className="jsu-cov">test coverage</div>
              <div className="jsu-track"><i /></div>
            </div>

            {/* status bar */}
            <div className="jsu-status">
              <span className="jsu-dot" />
              <b>{clock}</b><span className="jsu-sep">·</span>live
              <span className="jsu-sep">·</span>2&nbsp;collaborators
              <span className="jsu-sep">·</span>1&nbsp;build
            </div>

            {/* cursors */}
            <div className="jsu-cursor jsu-cursor--designer">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor"><path d="M2 1.6l13.4 8-5.7 1.3 3 6.4-2.5 1.2-3-6.5-4.9 3.7z" /></svg>
              <span className="jsu-tag">{designerLabel}</span>
            </div>
            <div className="jsu-cursor jsu-cursor--engineer">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor"><path d="M2 1.6l13.4 8-5.7 1.3 3 6.4-2.5 1.2-3-6.5-4.9 3.7z" /></svg>
              <span className="jsu-tag">{engineerLabel}</span>
            </div>
          </section>

          {/* message */}
          <section className="jsu-featured">
            <div className="jsu-eyebrow">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 6.5L21 9l-5 4.2L17.5 20 12 16.3 6.5 20 8 13.2 3 9l6.5-.5z" /></svg>
              {eyebrow}
            </div>
            <h2 className="jsu-headline">{headline}</h2>
            <p className="jsu-lede">{lede}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

const CSS = `
.jsu-embed{--ink:#0E0D0C;--muted:#9A9A9A;--muted-2:#B8B8B6;--line:#ECECEC;--paper:#FFFFFF;--wash:#F6F6F4;--bar-ink:#262524;--blue:#528AEB;--pink:#E04671;--green:#56B97D;--orange:#E08A45;--progress:#E0722C;--blue-bg:#ECEFFC;--blue-fg:#4E5BD2;--red-bg:#FCEAEF;--red-fg:#D6486B;--green-bg:#E5F3EB;--green-fg:#349C66;--mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;--sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;width:100%;color:var(--ink);font-family:var(--sans)}
.jsu-embed *{box-sizing:border-box}
.jsu-frame{position:relative;width:100%;overflow:hidden}
.jsu-stage{position:absolute;top:0;left:0;width:760px;height:600px;transform-origin:top left;border-radius:18px;background:var(--paper);box-shadow:0 1px 0 rgba(0,0,0,.02),0 24px 60px -28px rgba(20,18,16,.22);overflow:hidden;border:1px solid #F0F0EE}
.jsu-canvas{position:absolute;inset:0 0 auto 0;height:432px;background:radial-gradient(circle at 1px 1px,rgba(15,13,12,.05) 1px,transparent 0) 0 0/22px 22px,var(--paper)}
.jsu-topbar{position:absolute;top:18px;left:0;right:0;text-align:center;font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--muted)}
.jsu-topbar b{color:#6F6F6D;font-weight:500}
.jsu-rec{position:absolute;top:18px;right:22px;display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--muted)}
.jsu-rec i{width:8px;height:8px;border-radius:50%;background:var(--pink);animation:jsu-recpulse 1.6s ease-in-out infinite}
@keyframes jsu-recpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.82)}}
.jsu-card{position:absolute;background:var(--paper);border:1px solid var(--line);border-radius:13px;box-shadow:0 14px 30px -18px rgba(20,18,16,.22);opacity:0;transform:translateY(10px) scale(.985);animation:jsu-rise .9s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes jsu-rise{to{opacity:1;transform:translateY(0) scale(1)}}
.jsu-clabel{font-family:var(--mono);font-size:10px;letter-spacing:.13em;color:var(--muted)}
.jsu-clabel--row{display:flex;align-items:center;gap:6px;justify-content:center}
.jsu-tokens{left:40px;top:86px;width:172px;padding:14px 14px 16px;animation-delay:.15s}
.jsu-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.jsu-pill{font-family:var(--mono);font-size:11px;font-weight:500;padding:5px 9px;border-radius:8px;line-height:1;white-space:nowrap}
.jsu-pill.b{background:var(--blue-bg);color:var(--blue-fg)}
.jsu-pill.r{background:var(--red-bg);color:var(--red-fg)}
.jsu-pill.g{background:var(--green-bg);color:var(--green-fg)}
.jsu-pill.flash{animation:jsu-flash 3.6s ease-in-out infinite}
.jsu-pill.r.flash{animation-delay:1.2s}
.jsu-pill.g.flash{animation-delay:2.2s}
@keyframes jsu-flash{0%,86%,100%{box-shadow:0 0 0 0 rgba(82,138,235,0)}90%{box-shadow:0 0 0 3px rgba(82,138,235,.16)}}
.jsu-swap{left:282px;top:196px;width:120px;height:84px;padding:13px 14px;animation-delay:.5s}
.jsu-ico{display:flex;align-items:center;justify-content:center;height:34px;margin-top:8px}
.jsu-ico svg{width:34px;height:18px;color:var(--ink)}
.jsu-ico .a1{animation:jsu-swapA 3.4s ease-in-out infinite}
.jsu-ico .a2{animation:jsu-swapB 3.4s ease-in-out infinite}
@keyframes jsu-swapA{0%,70%,100%{transform:translateX(0)}82%{transform:translateX(3px)}}
@keyframes jsu-swapB{0%,70%,100%{transform:translateX(0)}82%{transform:translateX(-3px)}}
.jsu-build{left:466px;top:250px;width:206px;padding:16px 18px 20px;animation-delay:.35s}
.jsu-row{display:flex;align-items:center;justify-content:space-between}
.jsu-ship{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:.04em;color:var(--green-fg);background:var(--green-bg);padding:4px 8px;border-radius:7px}
.jsu-ship i{width:6px;height:6px;border-radius:50%;background:var(--green)}
.jsu-pct{font-size:32px;font-weight:800;letter-spacing:-.02em;margin:16px 0 2px}
.jsu-pct span{font-size:14px;font-weight:600;color:var(--muted-2);margin-left:2px}
.jsu-cov{font-family:var(--mono);font-size:10px;letter-spacing:.06em;color:var(--muted)}
.jsu-track{height:5px;border-radius:4px;background:#F0EFEC;margin-top:13px;overflow:hidden}
.jsu-track i{display:block;height:100%;width:30%;border-radius:4px;background:linear-gradient(90deg,#E8924A,var(--progress));animation:jsu-fill 14s cubic-bezier(.4,.1,.2,1) infinite}
@keyframes jsu-fill{0%{width:28%}48%{width:71%}74%{width:94%}90%,100%{width:94%}}
.jsu-status{position:absolute;left:14px;top:374px;display:inline-flex;align-items:center;gap:9px;background:var(--bar-ink);color:#EDECEA;border-radius:11px;padding:11px 15px;font-family:var(--mono);font-size:11px;letter-spacing:.04em;box-shadow:0 14px 26px -16px rgba(20,18,16,.4);opacity:0;transform:translateY(8px);animation:jsu-rise .8s cubic-bezier(.2,.7,.2,1) .7s forwards}
.jsu-status .jsu-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:jsu-livedot 2s ease-out infinite}
@keyframes jsu-livedot{0%{box-shadow:0 0 0 0 rgba(86,185,125,.45)}70%,100%{box-shadow:0 0 0 7px rgba(86,185,125,0)}}
.jsu-status b{color:#fff;font-weight:500}
.jsu-sep{color:#6E6C6A;margin:0 2px}
.jsu-cursor{position:absolute;left:0;top:0;width:0;height:0;z-index:5;will-change:transform;filter:drop-shadow(0 4px 7px rgba(20,18,16,.18))}
.jsu-cursor svg{position:absolute;left:0;top:0}
.jsu-tag{position:absolute;left:15px;top:16px;font-family:var(--mono);font-size:11px;font-weight:600;color:#fff;padding:4px 9px;border-radius:7px;white-space:nowrap;line-height:1}
.jsu-cursor--designer{animation:jsu-designerPath 14s cubic-bezier(.55,.1,.3,.95) infinite}
.jsu-cursor--designer .jsu-tag{background:var(--blue)}
.jsu-cursor--designer svg{color:var(--blue)}
.jsu-cursor--engineer{animation:jsu-engineerPath 14s cubic-bezier(.55,.1,.3,.95) infinite}
.jsu-cursor--engineer .jsu-tag{background:var(--pink)}
.jsu-cursor--engineer svg{color:var(--pink)}
@keyframes jsu-designerPath{0%{transform:translate(228px,150px)}14%{transform:translate(214px,138px)}30%{transform:translate(168px,252px)}50%{transform:translate(286px,214px)}66%{transform:translate(300px,250px)}80%{transform:translate(300px,250px)}100%{transform:translate(228px,150px)}}
@keyframes jsu-engineerPath{0%{transform:translate(556px,300px)}16%{transform:translate(520px,330px)}34%{transform:translate(560px,150px)}52%{transform:translate(418px,206px)}66%{transform:translate(360px,250px)}80%{transform:translate(360px,250px)}100%{transform:translate(556px,300px)}}
.jsu-featured{position:absolute;left:0;right:0;top:432px;bottom:0;background:var(--wash);padding:30px 36px 0}
.jsu-eyebrow{display:flex;align-items:center;gap:7px;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.18em;color:var(--orange);text-transform:uppercase}
.jsu-eyebrow svg{width:13px;height:13px}
.jsu-headline{font-size:31px;font-weight:800;letter-spacing:-.025em;margin:14px 0 0;line-height:1.05}
.jsu-lede{max-width:660px;margin:13px 0 0;font-size:14.5px;line-height:1.55;color:#46443F}
@media (prefers-reduced-motion:reduce){
.jsu-card,.jsu-status{animation:none!important;opacity:1!important;transform:none!important}
.jsu-rec i,.jsu-status .jsu-dot,.jsu-pill.flash,.jsu-ico .a1,.jsu-ico .a2{animation:none!important}
.jsu-track i{animation:none!important;width:94%!important}
.jsu-cursor--designer{animation:none!important;transform:translate(300px,250px)}
.jsu-cursor--engineer{animation:none!important;transform:translate(360px,250px)}
}
`;
