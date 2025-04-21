import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import HeroSection from "@/components/hero-section";
import Button from "@/components/button";

export const metadata = {
  title: "DeDevs | Docs",
  description:
    "Explore DeDevs documentation for components and OpenAPI specifications.",
};

interface FeatureCardProps {
  title: string;
  description?: string;
  href: string;
  className?: string;
}

function FeatureCard({
  title,
  href,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors w-full"
    >
      <Card className="h-full w-full bg-card/50 backdrop-blur-sm hover:border-primary">
        <CardHeader className="p-4">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        {/* Can add more content or an icon here */}
      </Card>
    </Link>
  );
}

function FeatureGrid() {
  return (
    <section className="flex gap-6 w-full mx-auto py-4 text-center justify-center items-center">
      <FeatureCard
        title="Components"
        description="Browse UI components."
        href="/docs/components"
        className="w-full"
      />
      <FeatureCard
        title="OpenAPI Specs"
        description="Interact with the OpenAPI documentation."
        href="/docs/openapi"
        className="w-full"
      />
      {/* Add more FeatureCards here for a more complex bento layout if needed */}
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-start pt-12 md:pt-16 gap-4">
      <HeroSection
        className="flex flex-col mb-12 pt-12"
        ctaComponent={
          <Link
            href="/docs/components"
            className="flex items-center bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors w-full"
          >
            <Button variant="outline" size="default" className="w-full">
              Get Started
            </Button>
          </Link>
        }
        imageURL="/hero.svg"
      />
      <FeatureGrid />
    </main>
  );
}
