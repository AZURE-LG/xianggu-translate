---
name: Mycelium Path
colors:
  surface: '#f0fdf1'
  surface-dim: '#d0ddd2'
  surface-bright: '#f0fdf1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf7eb'
  surface-container: '#e4f1e6'
  surface-container-high: '#deece0'
  surface-container-highest: '#d9e6da'
  on-surface: '#131e17'
  on-surface-variant: '#404942'
  inverse-surface: '#28332b'
  inverse-on-surface: '#e7f4e8'
  outline: '#707972'
  outline-variant: '#bfc9c0'
  surface-tint: '#226b4a'
  primary: '#005133'
  on-primary: '#ffffff'
  primary-container: '#216a49'
  on-primary-container: '#9fe7be'
  inverse-primary: '#8ed6ad'
  secondary: '#566500'
  on-secondary: '#ffffff'
  secondary-container: '#d9ed78'
  on-secondary-container: '#5c6b00'
  tertiary: '#3c4941'
  on-tertiary: '#ffffff'
  tertiary-container: '#536158'
  on-tertiary-container: '#ccdbd0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a9f2c8'
  primary-fixed-dim: '#8ed6ad'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#005234'
  secondary-fixed: '#d9ed78'
  secondary-fixed-dim: '#bdd05f'
  on-secondary-fixed: '#181e00'
  on-secondary-fixed-variant: '#404c00'
  tertiary-fixed: '#d7e6db'
  tertiary-fixed-dim: '#bbcabf'
  on-tertiary-fixed: '#121e17'
  on-tertiary-fixed-variant: '#3c4a42'
  background: '#f0fdf1'
  on-background: '#131e17'
  surface-variant: '#d9e6da'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
---

## Brand & Style
The design system is built on the narrative of the **Mycelium Path**—an organic yet structured network that facilitates the silent, rapid transfer of information. It moves away from decorative tropes to focus on a **Professional Minimalist** aesthetic. 

The system emphasizes a "low-disturbance" philosophy for browser integration. Visual weight is used sparingly to mark the "path" of translation: the journey from the source text to the target result. Surfaces are clean and utilitarian, prioritizing legibility and speed of recognition. The emotional response is one of reliability, precision, and quiet efficiency.

## Colors
The palette is centered around **Mycelium Green** for primary connections and actions, and **Spore Lime** for highlights. 

- **Canvas & Surface:** Utilize a high-contrast relationship between the background and elevated elements to ensure clear separation without heavy shadows.
- **Ink & Muted:** Hierarchical text colors ensure that primary content (translated text) stands out against secondary metadata (language labels, phonetics).
- **The Path Metaphor:** Use the `mycelium` color for active states and lines that connect source and target fields. Use `spore` for "new" or "highlighted" translated segments to guide the eye.

## Typography
The typography system prioritizes clarity and density for translation contexts. **Hanken Grotesk** provides a modern, clean sans-serif feel that pairs seamlessly with system fonts like Microsoft YaHei UI and PingFang SC for CJK characters.

- **Monospaced Accents:** **JetBrains Mono** is used for labels, language codes (e.g., EN, ZH), and UI metadata to provide a "tool-like" precision.
- **Vertical Rhythm:** Line heights are strictly adhered to for readable bilingual blocks where text is often compared side-by-side.
- **Weight:** Use SemiBold (600) for source text to distinguish it from the translated output, which typically uses Regular (400).

## Layout & Spacing
This design system employs a strict **4px grid**. Because the product is a browser extension, space is a premium.

- **Component Spacing:** Use `12px` (md) for the standard gap between the input field and the result card to suggest connection.
- **Extension Layout:** The default extension width is fixed at `420px` to maintain a compact footprint over web content. 
- **Grouping:** Use `4px` (xs) for related labels and `8px` (sm) for internal padding within buttons and inputs.

## Elevation & Depth
Elevation is handled through **Tonal Layering** and **Low-Contrast Outlines** rather than aggressive shadows.

1.  **Level 0 (Canvas):** The base background layer.
2.  **Level 1 (Surface):** Default state for input fields and cards, using a `1px` border of the `line` color.
3.  **Level 2 (Raised):** Used for hover states or active dropdowns. These elements receive a subtle, high-diffusion shadow: `0 4px 12px rgba(0,0,0,0.05)`.
4.  **Contrast:** The distinction between `Surface` and `Canvas` is the primary way of showing hierarchy. In Dark Mode, a slightly lighter border is used to define container edges.

## Shapes
The shape language is controlled and systematic. 

- **Inputs & Buttons:** Use an `8px` radius to maintain a modern, approachable feel that isn't too "bubbly."
- **Cards & Overlays:** Use a larger `12px` radius to encapsulate content blocks, providing a clear structural hierarchy.
- **Active Indicators:** Use pill-shaped (100px) caps for language toggles or active status chips.

## Components
- **Buttons:** Primary buttons use `Mycelium Green` with `Ink` or white text. Minimal padding: `8px 16px`. Secondary buttons use a `1px` border with no fill.
- **Input Fields:** `Surface` color background with `1px` `Line` border. On focus, the border changes to `Mycelium Green`.
- **Translation Cards:** A distinct container with `12px` radius. The source and target areas are separated by a subtle `1px` horizontal line or a vertical "mycelium path" line on the left margin.
- **Chips/Labels:** Small, monospaced text inside a `Spore Lime` background with `20%` opacity to highlight specific translated terms or dictionary definitions.
- **The "Path" Line:** A `2px` vertical line using the `Mycelium` color that visually connects the "Input" trigger to the "Output" result, reinforcing the brand narrative of a direct information conduit.
- **Checkboxes & Radios:** Sharp, functional, and using the `Mycelium Green` for active states.