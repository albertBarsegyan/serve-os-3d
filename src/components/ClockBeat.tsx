import React from 'react'

export default function ClockBeat() {
  return (
    <section className="clock-scene" id="beat-clock" data-beat="3" data-screen-label="04 The clock">
      <div className="clock-stage">
        <div className="clock-panel panel">
          <div
            className="panel-art"
            data-parallax="0"
            style={{ backgroundImage: "url('assets/03-waiting.webp')" }}
          ></div>
          <div className="panel-meta done">
            <span className="file">assets/03-waiting.webp</span>
            <p className="desc">Customer alone, arms crossed, empty place setting. A large clock on the wall behind them — clear wall space (the overlay clock sits here).</p>
          </div>
        </div>
        <div className="clock-tint" id="clockTint"></div>

        <div className="clock-overline">
          <span className="beat-tag"><span className="num">04</span> · scroll to wait</span>
        </div>

        <div className="clock-wrap">
          <svg className="analog" viewBox="0 0 200 200" aria-hidden="true">
            <circle className="face" cx="100" cy="100" r="92" />
            <circle className="ring" cx="100" cy="100" r="80" />
            <g className="tick">
              <line x1="100" y1="14" x2="100" y2="28" /><line x1="186" y1="100" x2="172" y2="100" />
              <line x1="100" y1="186" x2="100" y2="172" /><line x1="14" y1="100" x2="28" y2="100" />
            </g>
            <g className="tick-min">
              <line x1="143" y1="24" x2="138" y2="33" /><line x1="176" y1="57" x2="167" y2="62" />
              <line x1="176" y1="143" x2="167" y2="138" /><line x1="143" y1="176" x2="138" y2="167" />
              <line x1="57" y1="176" x2="62" y2="167" /><line x1="24" y1="143" x2="33" y2="138" />
              <line x1="24" y1="57" x2="33" y2="62" /><line x1="57" y1="24" x2="62" y2="33" />
            </g>
            <line className="hand-h" id="handH" x1="100" y1="100" x2="100" y2="60" />
            <line className="hand-m" id="handM" x1="100" y1="100" x2="100" y2="34" />
            <circle className="pin" cx="100" cy="100" r="6.5" />
          </svg>
          <div className="dig-label">minutes waited</div>
          <div className="digital" id="digital">00:00</div>
          <div className="clock-copy">
            <span id="c5">Five minutes.</span>
            <span id="c15">Fifteen.</span>
            <span id="c30">Thirty.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
