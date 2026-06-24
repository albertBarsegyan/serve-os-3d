import React from 'react'

export default function CtaBeat() {
  return (
    <section className="scene cta" id="beat-cta" data-beat="10" data-screen-label="11 CTA">
      <div className="scene-inner">
        <div className="beat-tag reveal"><span className="num">11</span> · one system, every station</div>
        <h2 className="cta-wm reveal d1">serve<span className="os">-os</span> — one system, every station.</h2>
        <p className="sub reveal d2">Smart ordering, kitchen sync, payments, analytics and staff management — finally speaking the same language.</p>
        <div className="btns reveal d3">
          <a className="btn primary" href="#">Book a demo →</a>
          <a className="btn secondary" href="#">See it live</a>
        </div>
        <div className="foot">
          <span className="fbrand"><img src="assets/logo.png" alt="" /> serve-os · one system, every station.</span>
          <span>© 2026 serve-os, inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></span>
        </div>
      </div>
    </section>
  )
}
