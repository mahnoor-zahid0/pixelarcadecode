// GSAP Animation for Floating Shapes within Web Development Heading
// GSAP Animation for Floating Shapes within Web Development Heading
const shapes = [".shape1", ".shape2", ".shape3", ".shape4"];
const shapeSettings = [
  { xRange: [-400, 400], yRange: [-400, 400], rotation: [-60, 60], scale: [0.9, 1.3], duration: 6, ease: "power1.inOut" },
  { xRange: [-450, 450], yRange: [-450, 450], rotation: [-80, 80], scale: [0.9, 1.3], duration: 7, ease: "power2.inOut" },
  { xRange: [-500, 500], yRange: [-500, 500], rotation: [-90, 90], scale: [0.9, 1.3], duration: 8, ease: "power3.inOut" },
  { xRange: [-400, 400], yRange: [-400, 400], rotation: [-100, 100], scale: [0.9, 1.3], duration: 7, ease: "power1.inOut" }
];

shapes.forEach((shape, index) => {
  const settings = shapeSettings[index];
  gsap.to(shape, {
    x: `random(${settings.xRange[0]}, ${settings.xRange[1]})`,
    y: `random(${settings.yRange[0]}, ${settings.yRange[1]})`,
    rotation: `random(${settings.rotation[0]}, ${settings.rotation[1]})`,
    scale: `random(${settings.scale[0]}, ${settings.scale[1]})`,
    duration: settings.duration,
    repeat: -1,
    yoyo: true,
    ease: settings.ease
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Fade in each section on scroll
  gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50, // Slide up slightly
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // Start animation when section is 80% in view
        toggleActions: "play none none reverse", // Play on enter, reverse on leave
      }
    });
  });
});
// GSAP Animation for Typing Effect on Text
gsap.from(".animate-text", {
  duration: 1.5,
  opacity: 0,
  y: 50,
  stagger: 0.25, // Reduced stagger for faster sequence
  ease: "power3.out",
});

// Initialize Barba.js for Smooth Page Transitions
barba.init({
  transitions: [
    {
      name: 'fade-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          scale: 0.95, // Add a slight scale-down effect
          duration: 0.6,
          ease: "power2.inOut",
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          scale: 1.05, // Start slightly larger and scale down to normal
          duration: 0.6,
          ease: "power2.inOut",
        });
      },
    },
  ],
});

// Typing Animation for Code Simulation in Code Output Area
const codeLines = [
  "Initializing Web Development Environment...",
  "Loading resources...",
  "Connecting to server...",
  "Generating HTML structure...",
  "Adding CSS styles...",
  "Setting up JavaScript functions...",
  "Launching preview...",
  "Output: Responsive Web Page Generated ✔️"
];

const codeOutputContainer = document.querySelector('.code-output');

function createCodeLine(content) {
  const line = document.createElement('div');
  line.className = 'code-line';
  line.textContent = content;
  codeOutputContainer.appendChild(line);
  return line;
}

// Animate Typing Effect for Each Code Line
function animateCodeLines() {
  codeLines.forEach((text, i) => {
    const line = createCodeLine(text);

    // Stagger each line's typing effect
    gsap.to(line, {
      opacity: 1,
      duration: 0.1 * text.length, // duration based on text length for typing effect
      ease: "power2.in",
      delay: i * 1.2, // delay between lines
      onComplete: () => {
        // Scroll the container as lines fill up
        if (i > 2) { // start scrolling after a few lines
          gsap.to(codeOutputContainer, {
            scrollTop: codeOutputContainer.scrollHeight,
            duration: 0.5,
            ease: "power1.inOut",
          });
        }
      }
    });
  });
}

// Start code simulation when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  animateCodeLines();
});

// GSAP Animation for Vision Section
gsap.registerPlugin(ScrollTrigger);

gsap.from(".vision-item", {
  scrollTrigger: {
    trigger: "#vision",
    start: "top 80%", // Start animation when 80% of the vision section is visible
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 30, // Slide from bottom
  duration: 1.2,
  stagger: 0.3, // Delay between each item
  ease: "power3.out"
});
