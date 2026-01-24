# Zylo - The Ultimate Community Workspace

Welcome to the official repository for the Zylo landing page! This website showcases the features, performance, and community vibe of the Zylo platform.

**Live Demo:** *Not yet available*

## Features

- **Modern & Responsive:** Built with a custom "Avant-Garde" design system (Glassmorphism, Neon gradients).
- **Interactive Elements:**
  - **Smart OS Modal:** Auto-detects OS or allows manual selection with click-to-copy commands.
  - **Enhanced Slideshow:** Glass reflection overlay and interactive navigation.
  - **3D Tilt effects:** On hover for mockup elements.
  - **Responsive Comparison Table:** Horizontal scrolling support for mobile.
  - **Typewriter Text:** Dynamic text animation for command prompts.
- **Performance Optimized:**
  - Lazy loading for images.
  - Defer loading for scripts.
  - Pure CSS animations.
- **PWA Ready:** Includes `manifest.json` and Service Worker for installation capability.
- **SEO Optimized:** Full Open Graph (OG) and Twitter Card tags.

## Project Structure

This project is hosted in the `/docs` folder to be compatible with GitHub Pages.

```
/docs
├── css/                # Design system and stylesheets
├── js/                 # Logic and animations
├── assets/             # Images and icons
├── index.html          # Main landing page
├── privacy.html        # Privacy Policy
├── terms.html          # Terms of Service
└── documentation.html  # User Documentation
```

## Local Development

We've included handy scripts in the `scripts/` folder to make your life easier.

### Running Locally
To preview the site on your local machine:
```bash
# Windows
.\scripts\dev_server.bat
```
This will start a Python HTTP server at `http://localhost:8000`.

### Deployment
To push changes to GitHub:
```bash
# Windows
.\scripts\deploy.bat
```

## Credits

Designed & Built with ❤️ by Daniel.
Open Source under the MIT License.
