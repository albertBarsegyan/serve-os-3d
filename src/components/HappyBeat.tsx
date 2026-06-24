import React from 'react'

export default function HappyBeat() {
  return (
    <section className="scene art-beat" id="beat-happy" data-beat="9" data-mood="warm" data-screen-label="10 Satisfied">
      <div className="scene-inner">
        <div className="panel">
          <div
            className="panel-art"
            data-parallax="0.12"
            style={{ '--p1': '#ba8420', '--p2': '#2c1d0d', backgroundImage: "url('assets/07-happy.webp')" }}
          ></div>
          <div className="panel-meta done">
            <span className="file">assets/07-happy.webp</span>
            <p className="desc">Customer happily eating. Warm glow + sparkle accents around the dish, fully satisfied.</p>
          </div>
        </div>
        <div className="copy">
          <div className="beat-tag reveal"><span className="num">10</span> · satisfied</div>
          <h2 className="headline reveal d1">Fed, happy, and out<br />the door smiling.</h2>
        </div>
      </div>
    </section>
  )
}
