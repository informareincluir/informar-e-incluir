// -------------- transição entre páginas com fade-out --------------
document.addEventListener("DOMContentLoaded", () => {
  // marca container para animação
  const container = document.querySelector(".container");
  if (container) {
    container.classList.add("fade-in");
    // garantir opacidade inicial para animação custom (fallback)
    container.style.opacity = 1;
  }

  // intercepta cliques em links para aplicar fade-out
  document.querySelectorAll('a[href]').forEach(link => {
    // ignorar links ancoras locais (#) e links externos que abrem em nova aba
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    link.addEventListener("click", (e) => {
      // se o link tem target _blank, deixa abrir normalmente
      if (link.target === "_blank") return;

      e.preventDefault();
      // start fade-out
      document.body.classList.add("fade-out");
      // aguarda a duração do fade (600ms) e então navega
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });

  // touch feedback para dispositivos móveis (toque)
  const touchEls = document.querySelectorAll(".btn, .seta, .video-link");
  touchEls.forEach(el => {
    el.addEventListener("touchstart", () => {
      el.style.transform = "scale(0.985)";
    }, {passive: true});
    el.addEventListener("touchend", () => {
      el.style.transform = "";
    }, {passive: true});
  });
});

// -------------- acessibilidade extra para vídeos --------------
// se o navegador tiver vídeos e preferências de redução de movimento, respeitar
(function respectReducedMotionForVideo(){
  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.querySelectorAll('video').forEach(v => {
        v.removeAttribute('autoplay');
        v.pause();
      });
    }
  } catch (e) { /* silencioso */ }
})();

