import React from 'react'

export default function ScanBeat() {
  return (
    <section className="scene art-beat" id="beat-scan" data-beat="7" data-mood="warm" data-screen-label="08 Scan">
      <div className="scene-inner">
        <div className="panel">
          <div
            className="panel-art"
            data-parallax="0.14"
            style={{ '--p1': '#c1742e', '--p2': '#2a1c10', backgroundImage: "url('assets/05-qr.webp')" }}
          ></div>
          <div className="panel-meta done">
            <span className="file">assets/05-qr.webp</span>
            <p className="desc">Bright + optimistic — glowing QR on the tabletop, a hand holding a phone scanning it, a colorful holographic menu blooming above. Scan-beam sweeps.</p>
          </div>
        </div>
        <div className="copy">
          <div className="beat-tag reveal"><span className="num">08</span> · with serve-os</div>
          <h2 className="headline reveal d1">Scan. Browse.<br />Order — right from the table.</h2>
        </div>
      </div>
    </section>
  )
}
