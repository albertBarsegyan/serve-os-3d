import React from 'react'

export default function Nav() {
  return (
    <header className="nav" id="nav">
      <a className="brand" href="#top" aria-label="serve-os home">
        <img src="assets/logo.png" alt="serve-os logo" />
        <span className="wm">serve<b>-os</b></span>
      </a>
      <nav className="nav-links" aria-label="primary">
        <a href="#beat-clock">The problem</a>
        <a href="#beat-turn">The fix</a>
        <a href="#beat-scan">How it works</a>
        <a href="#beat-cta">Pricing</a>
      </nav>
      <div className="nav-cta">
        <a className="ghost" href="https://serve-os.net/auth/sign-in">Log in</a>
        <a className="solid-btn" href="https://calendly.com/albertbarsegyan6/serve-os-demo">Book a demo</a>
      </div>
    </header>
  )
}
