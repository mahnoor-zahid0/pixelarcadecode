// GSAP Animation for Floating Shapes within Android Development Heading
const androidShapes = [".shape1", ".shape2", ".shape3", ".shape4"];
const androidShapeSettings = [
  { xRange: [-60, 60], yRange: [-60, 60], rotation: [-20, 20], scale: [0.85, 1.15], duration: 5, ease: "power2.inOut" },
  { xRange: [-70, 70], yRange: [-70, 70], rotation: [-25, 25], scale: [0.8, 1.2], duration: 6, ease: "power3.inOut" },
  { xRange: [-50, 50], yRange: [-50, 50], rotation: [-15, 15], scale: [0.9, 1.1], duration: 4, ease: "power1.inOut" },
  { xRange: [-55, 55], yRange: [-55, 55], rotation: [-30, 30], scale: [0.85, 1.15], duration: 5, ease: "power2.inOut" }
];

androidShapes.forEach((shape, index) => {
  const settings = androidShapeSettings[index];
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

// Animation for Android Development Details Container
gsap.from(".android-development-details-container", {
  x: -150,
  opacity: 0,
  delay: 1,
  duration: 1,
  ease: "power2.out"
});
