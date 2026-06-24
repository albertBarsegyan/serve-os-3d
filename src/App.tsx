import React from 'react'
import Nav from './components/Nav.tsx'
import Rail from './components/Rail.tsx'
import HeroBeat from './components/HeroBeat.tsx'
import Act1Beat from './components/Act1Beat.tsx'
import OrderBeat from './components/OrderBeat.tsx'
import ClockBeat from './components/ClockBeat.tsx'
import AngerBeat from './components/AngerBeat.tsx'
import TurnBeat from './components/TurnBeat.tsx'
import Act2Beat from './components/Act2Beat.tsx'
import ScanBeat from './components/ScanBeat.tsx'
import FastBeat from './components/FastBeat.tsx'
import HappyBeat from './components/HappyBeat.tsx'
import CtaBeat from './components/CtaBeat.tsx'
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakToggle,
  TweakColor,
} from '../tweaks-panel.tsx'

interface TweakConfig {
  layout: string
  mood: boolean
  parallax: boolean
  arthint: boolean
  accent: string
}

const TWEAK_DEFAULTS: TweakConfig = /*EDITMODE-BEGIN*/{
  "layout": "overlay",
  "mood": true,
  "parallax": true,
  "arthint": true,
  "accent": "#e8702a"
}/*EDITMODE-END*/

export default function App() {
  const [t, setTweak] = useTweaks<TweakConfig>(TWEAK_DEFAULTS)

  React.useEffect(() => {
    // scroll.ts queries the DOM immediately — import after React renders
    import('./utils/scroll.ts')
  }, [])

  React.useEffect(() => {
    const b = document.body
    b.dataset.layout = t.layout
    b.dataset.mood = t.mood ? 'on' : 'off'
    b.dataset.parallaxOn = t.parallax ? 'on' : 'off'
    b.dataset.arthint = t.arthint ? 'on' : 'off'
    const accent = Array.isArray(t.accent) ? t.accent[0] : t.accent
    document.documentElement.style.setProperty('--accent', accent)
    if (window.__serveosRelayout) requestAnimationFrame(window.__serveosRelayout)
  }, [t.layout, t.mood, t.parallax, t.arthint, t.accent])

  return (
    <>
      <Nav />
      <div className="progress" id="progress"></div>
      <Rail />
      <main id="top">
        <HeroBeat />
        <Act1Beat />
        <OrderBeat />
        <ClockBeat />
        <AngerBeat />
        <TurnBeat />
        <Act2Beat />
        <ScanBeat />
        <FastBeat />
        <HappyBeat />
        <CtaBeat />
      </main>
      <TweaksPanel>
        <TweakSection label="Scene layout" />
        <TweakRadio label="Art vs copy" value={t.layout}
          options={['overlay', 'split', 'stacked']}
          onChange={(v) => setTweak('layout', v)} />
        <TweakSection label="Motion & mood" />
        <TweakToggle label="Mood washes" value={t.mood} onChange={(v) => setTweak('mood', v)} />
        <TweakToggle label="Parallax depth" value={t.parallax} onChange={(v) => setTweak('parallax', v)} />
        <TweakSection label="Story accent" />
        <TweakColor label="Amber" value={t.accent}
          options={['#e8702a', '#d2541b', '#f0922f', '#d93a28']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Show art-slot labels" value={t.arthint} onChange={(v) => setTweak('arthint', v)} />
      </TweaksPanel>
    </>
  )
}
