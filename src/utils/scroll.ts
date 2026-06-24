/* ============================================================
   serve-os story site — scroll choreography (vanilla, synchronous)
   IntersectionObserver is unreliable in some preview sandboxes,
   so everything is driven off a single rAF-throttled scroll loop
   reading getBoundingClientRect. Robust + reduced-motion aware.
   ============================================================ */

export {}

declare global {
  interface Window {
    __serveosRelayout: () => void
  }
}

;(function () {
  'use strict'
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const nav = document.querySelector<HTMLElement>('.nav')
  const prog = document.getElementById('progress')
  const railBtns = Array.from(document.querySelectorAll<HTMLElement>('.rail button'))
  const beats = Array.from(document.querySelectorAll<HTMLElement>('[data-beat]'))
  const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
  const artbeats = Array.from(document.querySelectorAll<HTMLElement>('.art-beat'))
  const parallaxArt = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))

  /* clock refs */
  const clockScene = document.getElementById('beat-clock')
  const handM = document.getElementById('handM')
  const handH = document.getElementById('handH')
  const digital = document.getElementById('digital')
  const tint = document.getElementById('clockTint')
  const c5 = document.getElementById('c5')
  const c15 = document.getElementById('c15')
  const c30 = document.getElementById('c30')

  function clamp(v: number, a: number, b: number): number {
    return v < a ? a : v > b ? b : v
  }

  function updateChrome(): void {
    const h = document.documentElement
    const max = h.scrollHeight - h.clientHeight
    const sc = h.scrollTop || document.body.scrollTop
    if (prog) prog.style.width = (max > 0 ? (sc / max) * 100 : 0) + '%'
    if (nav) nav.classList.toggle('solid', sc > 40)
  }

  function updateReveals(): void {
    const H = window.innerHeight
    for (const el of reveals) {
      const r = el.getBoundingClientRect()
      el.classList.toggle('in', r.top < H * 0.9 && r.bottom > H * 0.04)
    }
    for (const el of artbeats) {
      const r = el.getBoundingClientRect()
      el.classList.toggle('in', r.top < H * 0.7 && r.bottom > H * 0.3)
    }
  }

  function updateRail(): void {
    const mid = window.innerHeight / 2
    let best = 0
    let bestD = Infinity
    for (const beat of beats) {
      const r = beat.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) continue
      const d = Math.abs((r.top + r.bottom) / 2 - mid)
      if (d < bestD) {
        bestD = d
        best = Number(beat.getAttribute('data-beat'))
      }
    }
    for (const btn of railBtns) {
      btn.classList.toggle('on', Number(btn.getAttribute('data-i')) === best)
    }
  }

  /* parallax: art layer drifts slower than the scene as it crosses viewport */
  function updateParallax(): void {
    if (reduce || document.body.getAttribute('data-parallax-on') === 'off') return
    const H = window.innerHeight
    for (const el of parallaxArt) {
      const host = el.closest<HTMLElement>('.panel') ?? el.parentElement
      if (!host) continue
      const r = host.getBoundingClientRect()
      if (r.bottom < -200 || r.top > H + 200) continue
      const center = (r.top + r.bottom) / 2
      const off = (center - H / 2) / H
      const depth = Number(el.getAttribute('data-parallax')) || 0.12
      el.style.transform = `scale(1.1) translate3d(0,${(off * depth * 100).toFixed(2)}px,0)`
    }
  }

  function clockTick(): void {
    if (!clockScene || !digital || !handM || !handH || !c5 || !c15 || !c30) return
    const r = clockScene.getBoundingClientRect()
    const total = r.height - window.innerHeight
    let p = total > 0 ? -r.top / total : 0
    p = clamp(p, 0, 1)

    const minutes = Math.round(p * 30)
    digital.textContent = '00:' + (minutes < 10 ? '0' : '') + minutes
    handM.style.transform = `rotate(${p * 180}deg)`
    handH.style.transform = `rotate(${p * 15}deg)`

    c5.classList.toggle('show', minutes < 11)
    c15.classList.toggle('show', minutes >= 11 && minutes < 23)
    c30.classList.toggle('show', minutes >= 23)

    if (tint) {
      const a = (0.1 + p * 0.34).toFixed(2)
      tint.style.background = `rgba(40,60,78,${a})`
    }
  }

  let ticking = false
  function loop(): void {
    updateChrome()
    updateRail()
    updateReveals()
    updateParallax()
    if (!reduce) clockTick()
    ticking = false
  }
  function onScroll(): void {
    if (!ticking) {
      requestAnimationFrame(loop)
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', loop)
  window.addEventListener('load', loop)

  /* rail navigation */
  for (const btn of railBtns) {
    btn.addEventListener('click', () => {
      const i = Number(btn.getAttribute('data-i'))
      const target = beats.find((x) => Number(x.getAttribute('data-beat')) === i)
      if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    })
  }

  if (reduce) {
    reveals.forEach((el) => el.classList.add('in'))
    artbeats.forEach((el) => el.classList.add('in'))
    if (digital && handM && handH && c30) {
      digital.textContent = '00:30'
      handM.style.transform = 'rotate(180deg)'
      handH.style.transform = 'rotate(15deg)'
      c30.classList.add('show')
    }
  }

  loop()
  setTimeout(loop, 120)
  /* expose for tweak panel re-sync after layout changes */
  window.__serveosRelayout = loop
})()
