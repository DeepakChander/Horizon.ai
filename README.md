# Horizon AI

An AI-powered travel planning landing page built with React, TypeScript, Vite, Tailwind CSS, and Shadcn-style components. It features cinematic hero animations, smooth scroll-triggered sections, a sticky, blurred navbar with an always-available CTA, and a conversion-focused trip planner form that posts to an n8n webhook.

## ✨ Highlights
- Futuristic dark UI with blue/teal accent gradients
- GSAP hero entrance animation for a premium first impression
- Framer Motion animations for Features, How It Works, and Pricing cards
- Sticky header with backdrop blur, smooth scrolling, and a persistent CTA
- Shadcn-style UI components (Dialog, Button, Input, Popover, Calendar, Toaster)
- Form built with React Hook Form + Zod (schema validation) and Axios POST
- Sonner toasts for success/error feedback
- Pricing section with three plans and a “Most Popular” emphasis
- Path alias `@` for clean imports

## 🧱 Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS 3 + tailwindcss-animate
- Framer Motion + GSAP
- React Hook Form + Zod + @hookform/resolvers
- Radix primitives (Dialog, Popover, Slot)
- Sonner (Toaster)
- Axios

## 📦 Project Structure
```
src/
  assets/
  components/
    layout/
      Header.tsx
      Footer.tsx
    sections/
      Hero.tsx
      Features.tsx
      HowItWorks.tsx
      Pricing.tsx
    ui/
      button.tsx
      calendar.tsx
      dialog.tsx
      form.tsx
      input.tsx
      popover.tsx
      toaster.tsx
      use-toast.ts
    TripForm.tsx
  lib/
    utils.ts
  App.tsx
  index.css
  main.tsx
```

## 🔧 Local Setup
Prerequisites: Node.js 18+ (or 20+ recommended) and npm

1) Install dependencies
```bash
npm install
```

2) Add background video
- Place a looping video at `public/background-video.mp4` (e.g., abstract, network lines). This drives the hero’s visual layer.

3) Start the dev server
```bash
npm run dev
```
Open the “Local” URL shown in your terminal output (Vite chooses an available port, e.g., http://localhost:5174/).

4) Build and preview (optional)
```bash
npm run build
npm run preview
```

## ▶️ How It Works
- The main CTA opens a Dialog hosting `TripForm`.
- Form validation is powered by Zod; dates use a calendar picker with constraints.
- On submit, Axios posts to the n8n webhook as JSON with field labels as keys (including spaces) and ISO-formatted dates (yyyy-MM-dd).
- Success: modal closes, success toast shows.
- Error: modal stays open, destructive toast shows.

Webhook URL location:
- `src/components/TripForm.tsx` → the `N8N_WEBHOOK_URL` constant.
  - Update if you need to target a different endpoint.

## 🧭 Navigation & Sections
- Header: logo (left), smooth-scroll links (center), “Plan Your Dream Trip Now” CTA (right).
- Hero: animated title/subtitle with GSAP; background video with gradient overlay.
- Features: 4-card grid with icons and motion-in on scroll.
- How It Works: 3 steps with icons and subtle animations.
- Pricing: 3-tier pricing with hover accents and a highlighted “Voyager” plan.
- Footer: lightweight, year-aware copyright block.

## 🎨 Styling & Theming
- Tailwind CSS with CSS variable-driven color tokens for background, foreground, borders, etc.
- `src/index.css` defines the base CSS variables and applies dark theme utilities.
- Extra animations via `tailwindcss-animate`.

## 🧰 Scripts
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

## 🗺️ Path Aliases
- Configured in both `vite.config.ts` and `tsconfig.app.json`:
  - Alias `@` → `src`
  - Import examples: `import { Button } from "@/components/ui/button"`

## 🔍 Troubleshooting
- Only text, no styles visible:
  - Ensure Tailwind is configured correctly: `postcss.config.js` uses `{ tailwindcss: {}, autoprefixer: {} }`.
  - Verify `src/index.css` begins with `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;` and is imported in `src/main.tsx`.
  - Confirm `tailwind.config.js` content includes `./index.html` and `./src/**/*.{ts,tsx}`.
  - Stop and restart the dev server. Hard refresh the browser (Ctrl+F5).
- Submitting the form navigates or clears the page:
  - Header links are programmatic scroll buttons (no hashes).
  - The submit button is `type="button"` and calls `form.handleSubmit(onSubmit)` directly.
  - If you still see a redirect, close old tabs pointing to stale ports and use the port shown in the terminal.
- Toasts not showing:
  - Ensure `<Toaster />` is mounted in `src/main.tsx`.

## ♿ Accessibility
- Dialog uses Radix primitives for focus management and keyboard accessibility.
- Buttons and links use clear focus styles and appropriate semantics.

## 📄 License
This repository is marked `"private": true`. Choose and add a license to fit your use case if you intend to distribute it.

## 🙌 Acknowledgements
- Tailwind CSS, Radix UI, Framer Motion, GSAP, Sonner
- Vite + React + TypeScript

---

If you run into issues, open your terminal’s Vite output to confirm the active port and check your browser console for any runtime errors. Happy travels with Horizon AI!
