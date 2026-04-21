const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const revealItems = document.querySelectorAll(".reveal");
const root = document.documentElement;

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const supportsReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!supportsReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    root.style.setProperty("--parallax-y", `${window.scrollY}px`);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateParallax();
}
