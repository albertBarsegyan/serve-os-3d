import React from 'react'

export default function FastBeat() {
  return (
    <section className="scene art-beat alt" id="beat-fast" data-beat="8" data-mood="warm" data-screen-label="09 Kitchen fires">
      <div className="scene-inner">
        <div className="panel">
          <div
            className="panel-art"
            data-parallax="0.2"
            style={{ '--p1': '#8c4c20', '--p2': '#271710', backgroundImage: "url('assets/06-fast.webp')" }}
          ></div>
          <div className="panel-meta done">
            <span className="file">assets/06-fast.webp</span>
            <p className="desc">A waiter swiftly setting down a steaming, delicious plate. Comic speed / motion lines, the customer lighting up. Quick parallax push.</p>
          </div>
        </div>
        <div className="copy">
          <div className="beat-tag reveal"><span className="num">09</span> · the kitchen fires</div>
          <h2 className="headline reveal d1">Tickets fire straight<br />to the kitchen. Food moves.</h2>
        </div>
      </div>
    </section>
  )
}
