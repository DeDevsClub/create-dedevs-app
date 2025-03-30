import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 md:p-24">
      <main className="flex w-full flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-6 text-center mb-12">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            DeDevs Club 2025
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-primary">DeDevs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-[700px]">
            Building better tools and communities for developers. 
            Get started with our modern development environment.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px] mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Fast Development</CardTitle>
              <CardDescription>
                Build and iterate quickly with modern tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-36 flex items-center justify-center rounded-md bg-muted p-6">
                <Image
                  src="/hero.svg"
                  alt="Fast development"
                  width={150}
                  height={150}
                  className="dark:invert"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-start">Learn more →</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Modern Components</CardTitle>
              <CardDescription>
                Accessible UI components ready to use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-36 flex items-center justify-center rounded-md bg-muted p-6">
                <Image
                  src="/window.svg"
                  alt="Modern components"
                  width={150}
                  height={150}
                  className="dark:invert"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-start">Explore components →</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Full-Stack Ready</CardTitle>
              <CardDescription>
                Everything you need for modern web projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-36 flex items-center justify-center rounded-md bg-muted p-6">
                <Image
                  src="/globe.svg"
                  alt="Full-stack ready"
                  width={150}
                  height={150}
                  className="dark:invert"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-start">View documentation →</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Code Example */}
        <Card className="w-full max-w-[1200px] mb-16">
          <CardHeader>
            <CardTitle>Get started in seconds</CardTitle>
            <CardDescription>
              Edit <code className="rounded bg-black/[.05] px-1 py-0.5 font-mono text-sm dark:bg-white/[.06]">app/page.tsx</code> to customize this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="jsx" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="jsx">JSX</TabsTrigger>
                <TabsTrigger value="tsx">TSX</TabsTrigger>
              </TabsList>
              <TabsContent value="jsx" className="bg-black/[.05] p-4 rounded-md dark:bg-white/[.06]">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<Button size="lg">
  Get Started with DeDevs
</Button>`}
                </pre>
              </TabsContent>
              <TabsContent value="tsx" className="bg-black/[.05] p-4 rounded-md dark:bg-white/[.06]">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<Button 
  size="lg" 
  onClick={() => console.log("Welcome to DeDevs!")}
>
  Get Started with DeDevs
</Button>`}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <Separator className="my-8" />

      {/* Footer */}
      <footer className="flex flex-wrap gap-6 items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.dedevs.club"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Documentation
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/DeDevsClub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://dedevs.club"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Visit DeDevs.club →
        </a>
      </footer>
    </div>
  );
}
