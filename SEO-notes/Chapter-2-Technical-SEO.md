# Chapter 2: Technical SEO & Structured Data

Technical SEO is the invisible layer that translates your website's intent into machine-readable data.

## 1. Structured Data (JSON-LD)
Structured data uses the Schema.org vocabulary to tell search engines exactly what an entity is.

### The Person Schema
Identifies you as a professional entity.
```json
{
  "@type": "Person",
  "name": "Sameer Bagul",
  "jobTitle": "Software AI Developer",
  "knowsAbout": ["MERN", "AI", "SEO"]
}
```

### The ProfessionalService Schema
Crucial for freelancers. It anchors you to a location and a service category, helping you rank for "Near Me" searches.

## 2. Progressive Web Apps (PWA)
Implementing a `manifest.json` and service workers signals to Google that your site is high-performance and reliable.
*   **Installability**: Increases user retention (Direct Traffic).
*   **App Icons**: Custom branding on mobile home screens.

## 3. Dynamic OG Images
Using Next.js Edge Runtime to generate custom images for every URL. When someone shares your blog or notes, a visual card is generated dynamically, increasing social CTR.
