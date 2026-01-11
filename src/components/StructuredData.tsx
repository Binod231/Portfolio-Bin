"use client";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Binod Prasad Joshi",
    url: "https://portfolio-bin.vercel.app",
    image: "https://portfolio-bin.vercel.app/portfoilo.jpeg",
    sameAs: [
      "https://github.com/Binod231",
      "https://www.linkedin.com/in/binod-prasad-joshi-549067281",
      "https://awspathway.com"
    ],
    jobTitle: "Cloud & Backend Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Karnovation Inc"
    },
    alumniOf: {
      "@type": "Organization",
      name: "AWS Academy"
    },
    knowsAbout: [
      "Cloud Architecture",
      "AWS",
      "Backend Development",
      "FastAPI",
      "Python",
      "Docker",
      "PostgreSQL",
      "Redis",
      "Cloud Native Security"
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Solutions Architect - Associate",
        credentialCategory: "Professional Certification",
        recognizedBy: {
          "@type": "Organization",
          name: "Amazon Web Services"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Developer - Associate",
        credentialCategory: "Professional Certification",
        recognizedBy: {
          "@type": "Organization",
          name: "Amazon Web Services"
        }
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "joshibinodprasad77@gmail.com",
      contactType: "Professional"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
