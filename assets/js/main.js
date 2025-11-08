const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("site-nav--open");
    menuToggle.classList.toggle("menu-toggle--open");
  });

  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("site-nav--open") &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      nav.classList.remove("site-nav--open");
      menuToggle.classList.remove("menu-toggle--open");
    }
  });
}

const projectGrid = document.querySelector("[data-orb-container]");
const projectOrb = projectGrid?.querySelector(".project-grid__orb");
const projectCards = projectGrid ? [...projectGrid.querySelectorAll(".project-card")] : [];

function moveProjectOrb(target, { animate = true } = {}) {
  if (!projectGrid || !projectOrb || !target) return;

  const containerRect = projectGrid.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const x = targetRect.left - containerRect.left + targetRect.width / 2;
  const y = targetRect.top - containerRect.top + targetRect.height / 2;
  const maxOrbSize = Math.min(containerRect.width, 420);
  const minOrbBaseline = Math.min(containerRect.width, containerRect.height) * 0.6;
  const minOrbSize = Math.min(Math.max(minOrbBaseline, 160), maxOrbSize);
  const desiredSize = Math.max(targetRect.width, targetRect.height) * 1.4;
  const clampedSize = Math.min(Math.max(desiredSize, minOrbSize), maxOrbSize);
  const half = clampedSize / 2;

  const clampedX = Math.min(Math.max(x, half), containerRect.width - half);
  const clampedY = Math.min(Math.max(y, half), containerRect.height - half);

  if (!animate) {
    projectOrb.style.transition = "none";
    requestAnimationFrame(() => {
      projectOrb.style.setProperty("--x", `${clampedX}px`);
      projectOrb.style.setProperty("--y", `${clampedY}px`);
      projectOrb.style.setProperty("--size", `${clampedSize}px`);
      projectOrb.dataset.theme = target.dataset.orbColor || "blue";
      projectOrb.style.opacity = "0.85";
      projectOrb.getBoundingClientRect();
      projectOrb.style.transition = "";
    });
  } else {
    projectOrb.style.setProperty("--x", `${clampedX}px`);
    projectOrb.style.setProperty("--y", `${clampedY}px`);
    projectOrb.style.setProperty("--size", `${clampedSize}px`);
    projectOrb.dataset.theme = target.dataset.orbColor || "blue";
    projectOrb.style.opacity = "0.85";
  }

  projectCards.forEach((card) => {
    if (card === target) {
      card.classList.add("is-active");
    } else {
      card.classList.remove("is-active");
    }
  });
}

if (projectCards.length && projectOrb) {
  const activateFirst = () => moveProjectOrb(projectCards[0], { animate: false });
  activateFirst();

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => moveProjectOrb(card));
    card.addEventListener("focus", () => moveProjectOrb(card));
    card.addEventListener("click", () => moveProjectOrb(card));
  });

  window.addEventListener("resize", () => {
    const activeCard = projectCards.find((card) => card.classList.contains("is-active")) || projectCards[0];
    moveProjectOrb(activeCard, { animate: false });
  });
}

const animatedBlocks = [...document.querySelectorAll("[data-animate-3d]")];

if (animatedBlocks.length) {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    animatedBlocks.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -8%" }
    );

    animatedBlocks.forEach((el) => observer.observe(el));
  }
}

const sectionTransitions = [...document.querySelectorAll("[data-section-transition]")];

if (sectionTransitions.length) {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    sectionTransitions.forEach((section) => {
      section.classList.add("section-enter");
      section.dataset.sectionActive = "true";
    });
  } else {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target;
          if (entry.isIntersecting) {
            section.classList.add("section-enter");
            section.classList.remove("section-exit");
            section.dataset.sectionActive = "true";
          } else if (section.dataset.sectionActive === "true") {
            section.classList.remove("section-enter");
            section.classList.add("section-exit");
            section.dataset.sectionActive = "false";
          }
        });
      },
      { threshold: 0.35, rootMargin: "-5% 0px" }
    );

    sectionTransitions.forEach((section) => {
      sectionObserver.observe(section);
    });

    const setInitialState = () => {
      sectionTransitions.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          section.classList.add("section-enter");
          section.dataset.sectionActive = "true";
        }
      });
    };

    window.addEventListener("load", setInitialState, { once: true });
  }
}

const tiltTargets = [...document.querySelectorAll("[data-tilt]")];

if (tiltTargets.length) {
  const resetTilt = (target) => {
    target.classList.remove("is-tilting");
    target.style.setProperty("--tilt-rotate-x", "0deg");
    target.style.setProperty("--tilt-rotate-y", "0deg");
    target.style.setProperty("--tilt-translate-z", "0px");

    window.setTimeout(() => {
      target.classList.remove("tilt-active");
      target.style.removeProperty("--tilt-rotate-x");
      target.style.removeProperty("--tilt-rotate-y");
      target.style.removeProperty("--tilt-translate-z");
    }, 180);
  };

  const handleTiltMove = (event) => {
    if (event.pointerType === "touch") return;
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - relativeY) * 14;
    const rotateY = (relativeX - 0.5) * 16;

    target.classList.add("is-tilting", "tilt-active");
    target.style.setProperty("--tilt-rotate-x", `${rotateX.toFixed(2)}deg`);
    target.style.setProperty("--tilt-rotate-y", `${rotateY.toFixed(2)}deg`);
    target.style.setProperty("--tilt-translate-z", "18px");
  };

  const handleTiltEnd = (event) => {
    const target = event.currentTarget;
    resetTilt(target);
  };

  tiltTargets.forEach((target) => {
    target.addEventListener("pointermove", handleTiltMove);
    target.addEventListener("pointerleave", handleTiltEnd);
    target.addEventListener("pointerup", handleTiltEnd);
    target.addEventListener("blur", handleTiltEnd);
  });
}

