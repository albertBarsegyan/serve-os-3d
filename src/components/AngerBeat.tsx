import React from 'react'

export default function AngerBeat() {
  return (
    <section className="scene art-beat alt" id="beat-anger" data-beat="4" data-mood="cold" data-screen-label="05 Anger">
      <div className="scene-inner">
        <div className="panel">
          <div
            className="panel-art"
            data-parallax="0.16"
            style={{ '--p1': '#3b4b57', '--p2': '#161d24', backgroundImage: "url('assets/04-leaving.webp')" }}
          ></div>
          <div className="panel-meta done">
            <span className="file">assets/04-angry.webp</span>
            <p className="desc">Close-ish on the customer: frustrated, angry. Comic steam-puff shapes near the head, cool desaturated mood.</p>
          </div>
        </div>
        <div className="copy">
          <div className="beat-tag reveal"><span className="num">05</span> · the breaking point</div>
          <h2 className="headline reveal d1">Hungry.<br />Ignored.<br />Done.</h2>
        </div>
      </div>
    </section>
  )
}
