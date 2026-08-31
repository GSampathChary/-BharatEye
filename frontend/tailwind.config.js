/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sachet: {
          navy: "#0B2545",       // Deep Navy Header (Image 1 & 5)
          darknavy: "#061329",   // Darkest Header Accent
          blue: "#0052CC",       // Royal Cobalt Blue Action Bar (Image 1 & 4)
          skyblue: "#0066FF",    // Smart Disaster AI Blue (Image 4)
          bg: "#EEF2F6",         // Light Slate App Body Background (Image 1 & 4)
          card: "#FFFFFF",       // Pure White Card Containers (Image 1 & 4)
          cardheader: "#0F172A", // Dark Slate Card Header Stripes
          gold: "#F59E0B",       // National Header Title Gold Accent (Image 1)
          amber: "#EA580C",      // Warning Orange
          green: "#16A34A",      // Operational Green
          red: "#DC2626",        // Critical Disaster Red
        },
        bg: {
          dark: "#06111F",
          panel: "#0B1726",
          card: "#101F31",
          hover: "#182C44",
        },
        cyan: {
          accent: "#00F2FE",
          glow: "rgba(0, 242, 254, 0.15)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 242, 254, 0.25)',
        'panel': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'sachet': '0 4px 12px rgba(11, 37, 69, 0.08)',
      }
    },
  },
  plugins: [],
}
