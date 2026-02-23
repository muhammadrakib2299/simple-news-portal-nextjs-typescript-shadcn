import type { Metadata } from "next"
import {
  Globe,
  Briefcase,
  Cpu,
  Trophy,
  Clapperboard,
  Heart,
  FlaskConical,
  Target,
  Eye,
  Shield,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Daily News — our mission, values, and commitment to delivering trusted journalism.",
}

const coverageAreas = [
  { icon: Globe, name: "General", desc: "World and breaking news" },
  { icon: Briefcase, name: "Business", desc: "Markets and economy" },
  { icon: Cpu, name: "Technology", desc: "Tech and innovation" },
  { icon: Trophy, name: "Sports", desc: "Scores and highlights" },
  { icon: Clapperboard, name: "Entertainment", desc: "Culture and media" },
  { icon: Heart, name: "Health", desc: "Wellness and medicine" },
  { icon: FlaskConical, name: "Science", desc: "Discovery and research" },
]

const values = [
  {
    icon: Target,
    title: "Accuracy",
    description:
      "Every story is fact-checked and verified before publication. We correct errors promptly and transparently.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We clearly identify our sources and distinguish between news reporting, analysis, and opinion.",
  },
  {
    icon: Shield,
    title: "Independence",
    description:
      "Our editorial decisions are made free from political, corporate, or other outside influence.",
  },
]

export default function AboutPage() {
  return (
    <div className="py-8 space-y-12">
      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold">About Daily News</h1>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Daily News is your trusted source for accurate, timely, and
          comprehensive news coverage. We bring you the stories that matter,
          from breaking headlines to in-depth analysis across every major topic.
        </p>
      </div>

      {/* Mission */}
      <section className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          We believe everyone deserves access to reliable, unbiased news. Our
          mission is to inform, educate, and empower our readers by delivering
          high-quality journalism that helps them understand the world around
          them. In an era of information overload, we cut through the noise to
          bring you what truly matters.
        </p>
      </section>

      <Separator />

      {/* Values */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((v) => (
            <Card key={v.title} className="py-0 gap-0">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Coverage Areas */}
      <section>
        <h2 className="text-2xl font-bold mb-2">What We Cover</h2>
        <p className="text-muted-foreground mb-6">
          Our team covers seven major categories to keep you informed on every
          front.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {coverageAreas.map((area) => (
            <div
              key={area.name}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <area.icon className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium">{area.name}</p>
                <p className="text-xs text-muted-foreground">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6">By the Numbers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { number: "50K+", label: "Daily Readers" },
            { number: "7", label: "Categories" },
            { number: "100+", label: "Articles / Month" },
            { number: "24/7", label: "News Coverage" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold">{stat.number}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
