# Chapter 3: Visual Identity & Image SEO

Google Image Search is an often-overlooked traffic source. For a portfolio, it's essential for visual branding.

## 1. Alt Tag Mastery
Alt tags aren't just for accessibility; they are keyword anchors.
*   **Bad**: `alt="me"`
*   **Good**: `alt="Sameer Bagul Portfolio"`
*   **Master**: `alt="Sameer Bagul - Freelance Software AI Developer based in Pune, India"`

## 2. ImageObject Schema
Tell Google exactly what is in the meta-level of the image:
*   `contentUrl`: The absolute path.
*   `caption`: The descriptive summary.
*   `representativeOfPage`: Setting the Hero image as the primary visual.

## 3. Next.js Optimization
Using the `<Image />` component from Next.js provides:
*   **Lazy Loading**: Only load images when they enter the viewport.
*   **WebP/AVIF**: Smaller file sizes without quality loss.
*   **Layout Stability**: Prevents CLS (Cumulative Layout Shift) by reserving space.
