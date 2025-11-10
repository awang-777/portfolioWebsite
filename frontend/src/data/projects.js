const projects = [
  {
    id: 'spacetime',
    title: 'Spacetime',
    path: '/projects/spacetime',
    mediaType: 'video',
    mediaSrc: '/spacetime.mp4',
    mediaProps: {
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      preload: 'auto',
    },
    longDescription: [
      'Spacetime is a real-time visualization created in TouchDesigner that explores the concept of gravitational time dilation. Particles orbit a central mass, with their velocity linked to their distance from the gravity well.',
      'The central implosion and explosion sequences mimic a supernova event, highlighting how spacetime is stretched and compressed around massive celestial bodies. I focused on the particle system shaders, procedural animation, and the lighting composition.',
    ],
    technologies: ['TouchDesigner', 'GLSL', 'Generative Art', 'Real-time Graphics'],
    responsibilities: [
      'Designed the particle simulation and motion dynamics',
      'Implemented real-time shaders and lighting in TouchDesigner',
      'Directed the storytelling through visual pacing and color',
    ],
  },
  {
    id: 'particle-system',
    title: 'Particle System',
    path: '/projects/particle-system',
    mediaType: 'iframe',
    mediaSrc: 'https://openprocessing.org/sketch/2757664/embed/',
    mediaProps: {
      title: 'Particle System',
    },
    longDescription: [
      'This particle system is an experiment in emergent behavior using p5.js on the OpenProcessing platform. Particles are influenced by cursor position and velocity, creating organic swirls and turbulence.',
      'I prototyped multiple force fields and easing functions to find a balance between stability and playful motion. The sketch is optimized to run smoothly in the browser while supporting full-screen interaction.',
    ],
    technologies: ['p5.js', 'JavaScript', 'Creative Coding'],
    responsibilities: [
      'Authored the particle physics update loop and rendering pipeline',
      'Crafted interactive controls that translate cursor movement into force vectors',
      'Optimized the sketch for browser performance and responsiveness',
    ],
    links: [
      {
        label: 'View on OpenProcessing',
        url: 'https://openprocessing.org/sketch/2757664',
      },
    ],
  },
];

export const projectsById = projects.reduce((acc, project) => {
  acc[project.id] = project;
  return acc;
}, {});

export const getProjectById = (id) => projectsById[id];

export default projects;


