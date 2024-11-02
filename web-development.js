// GSAP Animation for Floating Shapes within Web Development Heading
const shapes = [".shape1", ".shape2", ".shape3", ".shape4"];
const shapeSettings = [
  { xRange: [-50, 50], yRange: [-50, 50], rotation: [-15, 15], scale: [0.9, 1.1], duration: 4, ease: "power1.inOut" },
  { xRange: [-60, 60], yRange: [-60, 60], rotation: [-20, 20], scale: [0.85, 1.15], duration: 5, ease: "power2.inOut" },
  { xRange: [-70, 70], yRange: [-70, 70], rotation: [-25, 25], scale: [0.8, 1.2], duration: 6, ease: "power3.inOut" },
  { xRange: [-50, 50], yRange: [-50, 50], rotation: [-30, 30], scale: [0.9, 1.1], duration: 5, ease: "power1.inOut" }
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

// Animation for Web Development Heading
gsap.from(".web-development-heading-container", {
  x: -150,       
  opacity: 0,    
  duration: 1.2, 
  ease: "power2.out"
});

// Animation for Web Development Details Container (Pop-out effect)
gsap.to(".web-development-details-container", {
  x: -50,        // Slide from left
  opacity: 1,    // Fade in
  delay: 1.5,    // Sync delay with heading animation
  duration: 1,   // Animation duration
  ease: "power2.out",
});
