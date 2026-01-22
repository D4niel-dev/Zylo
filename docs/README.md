# Zylo Official Website

This folder contains the source code for the Zylo official landing page.

## Structure

- `index.html`: Main landing page structure
- `css/`: Styling files
  - `design-system.css`: Core variables and tokens
  - `sections.css`: Layout for specific sections
  - `components.css`: Reusable UI elements
- `js/`: Interactivity
  - `main.js`: UI logic (menus, copying)
  - `animations.js`: Scroll and tilt effects
- `assets/`: Images and icons

## Deployment (GitHub Pages)

1. Go to your GitHub Repository Settings.
2. Navigate to "Pages" on the sidebar.
3. Under "Build and deployment" > "Source", select "Deploy from a branch".
4. Under "Branch", select `main` (or your default branch) and the `/website` folder (if GitHub allows specific folder selection, otherwise you may need to move these files to root or `docs/` depending on your preference, or use a GitHub Action).
   
   *Note: If GitHub Pages only allows `/root` or `/docs`, you can rename this `website` folder to `docs` and select `/docs` in settings.*

## Customization

- Change colors in `css/design-system.css`.
- Add your own screenshots to `assets/images` and reference them in `index.html`.
