# Chapter 5: Core Web Vitals & Performance

Performance is a direct ranking factor since the 2021 Page Experience Update.

## 1. The Three Vital Metrics
*   **LCP (Largest Contentful Paint)**: How fast the main content loads. Target: < 2.5s.
*   **FID (First Input Delay)**: How fast the site responds to clicks. Target: < 100ms.
*   **CLS (Cumulative Layout Shift)**: Does the content jump around? Target: < 0.1.

## 2. Edge Computing
By using the Edge Runtime (especially for OG images), we serve content from the server closest to the user, reducing latency (TTFB - Time to First Byte).

## 3. Code Splitting
Only send the JavaScript the user needs for the current page. Next.js does this automatically, but dynamic imports can further optimize heavy components like 3D models or complex charts.
