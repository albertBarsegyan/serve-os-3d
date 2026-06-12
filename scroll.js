/* ============================================================
   serve-os story site — scroll choreography (vanilla, synchronous)
   IntersectionObserver is unreliable in some preview sandboxes,
   so everything is driven off a single rAF-throttled scroll loop
   reading getBoundingClientRect. Robust + reduced-motion aware.
   ============================================================ */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var nav      = document.querySelector(".nav");
  var prog     = document.getElementById("progress");
  var railBtns = [].slice.call(document.querySelectorAll(".rail button"));
  var beats    = [].slice.call(document.querySelectorAll("[data-beat]"));
  var reveals  = [].slice.call(document.querySelectorAll(".reveal"));
  var artbeats = [].slice.call(document.querySelectorAll(".art-beat"));
  var parallaxArt = [].slice.call(document.querySelectorAll("[data-parallax]"));

  /* clock refs */
  var clockScene = document.getElementById("beat-clock");
  var handM   = document.getElementById("handM");
  var handH   = document.getElementById("handH");
  var digital = document.getElementById("digital");
  var tint    = document.getElementById("clockTint");
  var c5  = document.getElementById("c5");
  var c15 = document.getElementById("c15");
  var c30 = document.getElementById("c30");

  function clamp(v,a,b){return v<a?a:(v>b?b:v);}

  function updateChrome(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var sc = h.scrollTop || document.body.scrollTop;
    if(prog) prog.style.width = (max>0 ? (sc/max)*100 : 0) + "%";
    if(nav) nav.classList.toggle("solid", sc > 40);
  }

  function updateReveals(){
    var H = window.innerHeight;
    for(var i=0;i<reveals.length;i++){
      var r = reveals[i].getBoundingClientRect();
      reveals[i].classList.toggle("in", r.top < H*0.90 && r.bottom > H*0.04);
    }
    for(var j=0;j<artbeats.length;j++){
      var ar = artbeats[j].getBoundingClientRect();
      artbeats[j].classList.toggle("in", ar.top < H*0.7 && ar.bottom > H*0.3);
    }
  }

  function updateRail(){
    var mid = window.innerHeight/2, best = 0, bestD = Infinity;
    for(var i=0;i<beats.length;i++){
      var r = beats[i].getBoundingClientRect();
      if(r.bottom < 0 || r.top > window.innerHeight) continue;
      var d = Math.abs((r.top + r.bottom)/2 - mid);
      if(d < bestD){ bestD = d; best = +beats[i].getAttribute("data-beat"); }
    }
    for(var k=0;k<railBtns.length;k++){
      railBtns[k].classList.toggle("on", +railBtns[k].getAttribute("data-i") === best);
    }
  }

  /* parallax: art layer drifts slower than the scene as it crosses viewport */
  function updateParallax(){
    if(reduce || document.body.getAttribute("data-parallax-on") === "off") return;
    var H = window.innerHeight;
    for(var i=0;i<parallaxArt.length;i++){
      var el = parallaxArt[i];
      var host = el.closest(".panel") || el.parentElement;
      var r = host.getBoundingClientRect();
      if(r.bottom < -200 || r.top > H+200) continue;
      var center = (r.top + r.bottom)/2;
      var off = (center - H/2) / H;          /* -0.5..0.5-ish */
      var depth = +(el.getAttribute("data-parallax")) || 0.12;
      el.style.transform = "scale(1.1) translate3d(0," + (off * depth * 100).toFixed(2) + "px,0)";
    }
  }

  function clockTick(){
    if(!clockScene) return;
    var r = clockScene.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    var p = total>0 ? (-r.top)/total : 0;
    p = clamp(p,0,1);

    var minutes = Math.round(p*30);
    digital.textContent = "00:" + (minutes<10?"0":"") + minutes;
    handM.style.transform = "rotate(" + (p*180) + "deg)";
    handH.style.transform = "rotate(" + (p*15) + "deg)";

    c5.classList.toggle("show",  minutes < 11);
    c15.classList.toggle("show", minutes >= 11 && minutes < 23);
    c30.classList.toggle("show", minutes >= 23);

    if(tint){
      var a = (0.10 + p*0.34).toFixed(2);
      tint.style.background = "rgba(40,60,78," + a + ")";
    }
  }

  var ticking = false;
  function loop(){
    updateChrome();
    updateRail();
    updateReveals();
    updateParallax();
    if(!reduce) clockTick();
    ticking = false;
  }
  function onScroll(){ if(!ticking){ requestAnimationFrame(loop); ticking = true; } }

  window.addEventListener("scroll", onScroll, {passive:true});
  window.addEventListener("resize", loop);
  window.addEventListener("load", loop);

  /* rail navigation */
  railBtns.forEach(function(b){
    b.addEventListener("click", function(){
      var i = +b.getAttribute("data-i");
      var target = beats.filter(function(x){return +x.getAttribute("data-beat")===i;})[0];
      if(target) target.scrollIntoView({behavior: reduce ? "auto":"smooth", block:"start"});
    });
  });

  if(reduce){
    reveals.forEach(function(el){el.classList.add("in");});
    artbeats.forEach(function(el){el.classList.add("in");});
    if(digital){digital.textContent="00:30";handM.style.transform="rotate(180deg)";handH.style.transform="rotate(15deg)";c30.classList.add("show");}
  }

  loop();
  setTimeout(loop, 120);
  /* expose for tweak panel re-sync after layout changes */
  window.__serveosRelayout = loop;
})();
