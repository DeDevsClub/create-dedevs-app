"use client"

import { useState } from "react"
import { TypingEffect } from "@/components/typing-effect"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  const [introComplete, setIntroComplete] = useState(false)
  const [bioComplete, setBioComplete] = useState(false)

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2021 - Present",
      description:
        "Leading the frontend development team, implementing modern React architectures, and optimizing application performance.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions",
      period: "2018 - 2021",
      description:
        "Developed and maintained web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines and automated testing.",
    },
    {
      title: "Junior Developer",
      company: "StartUp Labs",
      period: "2016 - 2018",
      description:
        "Worked on frontend development using JavaScript and CSS. Collaborated with designers to implement responsive UI components.",
    },
  ]

  const skills = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "C#"] },
    { category: "Frontend", items: ["React", "Next.js", "Vue.js", "CSS/SCSS", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Express", "Django", "ASP.NET Core"] },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"] },
    { category: "DevOps", items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git"] },
    { category: "AI/ML", items: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"] },
  ]

  return (
    <div className="space-y-12 py-8">
      <section className="max-w-3xl mx-auto">
        <Card className="bg-muted/40">
          <CardContent className="pt-6">
            <TypingEffect
              text="Initializing personal profile... Access granted. Loading bio data..."
              typingSpeed={30}
              className="text-lg"
              onComplete={() => setIntroComplete(true)}
            />

            {introComplete && (
              <TypingEffect
                text="Hello, I'm a full-stack developer with a passion for AI, cybersecurity, and creating immersive digital experiences. I specialize in building modern web applications with a focus on performance, accessibility, and user experience."
                typingSpeed={20}
                className="mt-4 text-lg"
                onComplete={() => setBioComplete(true)}
              />
            )}
          </CardContent>
        </Card>
      </section>

      {bioComplete && (
        <>
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Experience Timeline</h2>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{exp.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {exp.company} | {exp.period}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Skills</h2>
            <Tabs defaultValue="Languages" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                {skills.map((skillGroup) => (
                  <TabsTrigger key={skillGroup.category} value={skillGroup.category}>
                    {skillGroup.category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {skills.map((skillGroup) => (
                <TabsContent key={skillGroup.category} value={skillGroup.category}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{skillGroup.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, index) => (
                          <Button key={index} variant="outline" className="cursor-default">
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Contact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Enter your message" rows={4} />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Link
                      href="https://github.com"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                    >
                      <Github size={18} />
                      github.com/portfolio
                    </Link>
                    <Link
                      href="https://twitter.com"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                    >
                      <Twitter size={18} />
                      twitter.com/portfolio
                    </Link>
                    <Link
                      href="https://linkedin.com"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                    >
                      <Linkedin size={18} />
                      linkedin.com/in/portfolio
                    </Link>
                    <Link
                      href="mailto:hello@example.com"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail size={18} />
                      hello@example.com
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

