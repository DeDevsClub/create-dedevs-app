import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          DevDocs Starter
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Welcome to the home of your new documentation
        </p>
        <div className="mt-8 flex justify-center">
          <Image
            src="/images/hero-light.svg"
            alt="Hero Light"
            width={600}
            height={400}
            className="block dark:hidden"
          />
          <Image
            src="/images/hero-dark.svg"
            alt="Hero Dark"
            width={600}
            height={400}
            className="hidden dark:block"
          />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/introduction"
            className="block rounded-lg border p-6 transition-colors hover:bg-accent"
          >
            <h3 className="text-xl font-bold mb-2">Introduction</h3>
            <p className="text-muted-foreground">
              Learn about the basics of the documentation
            </p>
          </Link>
          <Link 
            href="/quickstart"
            className="block rounded-lg border p-6 transition-colors hover:bg-accent"
          >
            <h3 className="text-xl font-bold mb-2">Quickstart</h3>
            <p className="text-muted-foreground">
              Get up and running quickly with the platform
            </p>
          </Link>
          <Link 
            href="/development"
            className="block rounded-lg border p-6 transition-colors hover:bg-accent"
          >
            <h3 className="text-xl font-bold mb-2">Development</h3>
            <p className="text-muted-foreground">
              Guidance for development and customization
            </p>
          </Link>
          <Link 
            href="/api-reference/introduction"
            className="block rounded-lg border p-6 transition-colors hover:bg-accent"
          >
            <h3 className="text-xl font-bold mb-2">API Reference</h3>
            <p className="text-muted-foreground">
              Explore the API documentation
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
