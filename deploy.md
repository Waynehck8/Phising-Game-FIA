# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Option 2: Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Your site will be live instantly

### Option 3: GitHub Pages
1. Add to package.json:
```json
{
  "homepage": "https://yourusername.github.io/phishing-game",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```
2. Install: `npm install -D gh-pages`
3. Deploy: `npm run deploy`

## Local Testing
```bash
npm start          # Development server
npm run build      # Production build
npm run test       # Run tests
```

## Environment Variables
No environment variables required for this project.

## Build Output
The build creates a `build/` folder with:
- Optimized JavaScript bundles
- Minified CSS with Tailwind
- Static assets (images)
- Ready for any static hosting service

## Performance
- Bundle size: ~63KB gzipped
- CSS size: ~3.5KB gzipped
- Optimized for production
