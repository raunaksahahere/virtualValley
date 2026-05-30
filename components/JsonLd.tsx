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

export function FAQJsonLd() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Virtual Valley offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Virtual Valley offers website development, website repair and maintenance, and social media management services across India.",
        },
      },
      {
        "@type": "Question",
        name: "How much does website development cost in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Virtual Valley's website development packages range from ₹10,000 for a basic 1–3 page site to ₹90,000+ for enterprise-grade solutions with advanced features.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Virtual Valley located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Virtual Valley is based in Teghoria, Kolkata, West Bengal, India. We serve clients across all of India.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Virtual Valley?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach Virtual Valley at contact@thevirtualvalley.com, by phone at +91 8017007352, or via WhatsApp at the same number.",
        },
      },
      {
        "@type": "Question",
        name: "Does Virtual Valley work with clients across India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Virtual Valley serves clients across all of India, not just Kolkata.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Virtual Valley Growth Partner Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Growth Partner Program is a commission-based referral program where partners earn commission for every client they refer to Virtual Valley for website development or social media services.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Basic sites take 3–7 days, professional builds take 2–4 weeks, and enterprise solutions are scoped per project based on requirements.",
        },
      },
      {
        "@type": "Question",
        name: "What social media platforms does Virtual Valley manage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Virtual Valley manages one platform per plan. Platforms include Instagram, Facebook, YouTube, and others based on client needs.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}
