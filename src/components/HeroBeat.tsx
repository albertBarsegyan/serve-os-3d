import React from 'react'

export default function HeroBeat() {
  return (
    <section className="scene hero" id="beat-hero" data-beat="0" data-screen-label="01 Hero">
      <div className="scene-inner">
        <div className="panel">
          <div
            className="panel-art"
            data-parallax="0"
            style={{ '--p1': '#7c4c26', '--p2': '#231610', backgroundImage: "url('assets/restaurant.png')" }}
          ></div>
          <div className="panel-meta done">
            <span className="file">assets/01-restaurant.webp</span>
            <p className="desc">Wide establishing shot — big, beautiful restaurant interior: warm wood, brass fixtures, hanging lights, diners at tables. Slow Ken-Burns zoom.</p>
          </div>
        </div>
        <div className="hero-copy">
          <h1 className="hero-wm reveal">serve<span className="os">-os</span></h1>
          <p className="hero-line reveal d1">Every table tells a story.<br /><em>Most of them are about waiting.</em></p>
        </div>
      </div>
      <div className="scroll-cue">scroll<span className="arr">↓</span></div>
    </section>
  )
}
