export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Virtual Valley",
    url: "https://thevirtualvalley.com",
    logo: "https://thevirtualvalley.com/logo.png",
    image: "https://thevirtualvalley.com/og-image.png",
    description:
      "Premium digital agency in Kolkata offering website development, social media management, and digital marketing across India.",
    telephone: "+91-8017007352",
    email: "contact.virtualvalley@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.5726",
      longitude: "88.3639",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "22:00",
    },
    sameAs: [
      "https://instagram.com/virtualvalley",
      "https://facebook.com/virtualvalley",
      "https://youtube.com/@virtualvalley",
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Agency Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Website Development" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Social Media Management" },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Repair & Maintenance",
          },
        },
      ],
    },
    priceRange: "INR INR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Virtual Valley",
    url: "https://thevirtualvalley.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://thevirtualvalley.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
