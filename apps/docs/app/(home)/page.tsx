'use client'

import { Icon } from "@iconify/react";
import Bento from "@/components/bento";

const HomePage = () => {
  const items = [

    {
      title: "Documentation",
      // meta: "1+ contributors",
      description: "Visit the documentation to learn how to use the project.",
      icon: <Icon icon="mdi:book" className="w-6 h-6 text-sky-500" />,
      // status: "Beta",
      tags: ["Documentation"],
      cta: "/docs/components/cards",
      ctaText: "Components",
      external: false,
    },
    {
      title: "OpenAPI",
      // meta: "1+ contributors",
      description: "Visit the OpenAPI documentation to interact with the API.",
      icon: <Icon icon="mdi:api" className="w-6 h-6 text-sky-500" />,
      // status: "Beta",
      tags: ["OpenAPI", "Documentation"],
      cta: "/docs/openapi/defillama/tvl/chains",
      ctaText: "OpenAPI",
      external: false,
    },
    {
      title: "GitHub Repository",
      // meta: "1+ contributors",
      description: "Visit the GitHub repository to contribute to the project.",
      icon: <Icon icon="mdi:github" className="w-6 h-6 text-sky-500" />,
      // status: "Beta",
      tags: ["Repository", "GitHub", "Contribution"],
      cta: "https://github.com/DeDevsClub/create-dedevs-app",
      ctaText: "Fork",
      external: true,
    },
    {
      title: "YouTube Tutorial",
      // meta: "1+ contributors",
      description: "Watch the YouTube tutorial to learn how to use the project.",
      icon: <Icon icon="mdi:youtube" className="w-6 h-6 text-sky-500" />,
      // status: "Beta",
      tags: ["Tutorials", "YouTube", "Contribution"],
      cta: "https://www.youtube.com/watch?v=VPjBpPp63qM",
      ctaText: "YouTube",
      external: true,
    },
  ]
  return (
    <main
    className="w-full flex items-center justify-center"
  >
    <Bento items={items} />
  </main>
  );
};

export default HomePage