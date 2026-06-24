import React from 'react'

export default function OrderBeat() {
  return (
    <section className="scene art-beat" id="beat-order" data-beat="2" data-mood="cool" data-screen-label="03 Order">
      <div className="scene-inner">
        <div className="panel">
          <div
            className="panel-art"
            data-parallax="0.14"
            style={{ '--p1': '#6c462b', '--p2': '#221a13', backgroundImage: "url('assets/02-order-old.webp')" }}
          ></div>
          <div className="panel-meta done">
            <span className="file">assets/02-order-old.webp</span>
            <p className="desc">Customer seated, raising a hand to flag a passing waiter. Menu on the table, hopeful.</p>
          </div>
        </div>
        <div className="copy">
          <div className="beat-tag reveal"><span className="num">02</span> · the old way</div>
          <h2 className="headline reveal d1">You order.<br />And then you wait.</h2>
        </div>
      </div>
    </section>
  )
}
