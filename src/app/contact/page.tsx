import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ContactForm } from "@/components/contact/ContactForm"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Daily News team. Send us your tips, feedback, or inquiries.",
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@dailynews.com",
    href: "mailto:contact@dailynews.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 News Street, New York, NY 10001",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri, 9:00 AM - 6:00 PM EST",
  },
]

export default function ContactPage() {
  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground mt-1">
          Have a news tip, feedback, or question? We&apos;d love to hear from
          you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Contact Form */}
        <Card className="py-0">
          <CardContent className="p-6 sm:p-8">
            <ContactForm />
          </CardContent>
        </Card>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <Card className="py-0">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-semibold">Get in Touch</h3>
              <Separator />
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="flex items-center justify-center h-9 w-9 rounded-md bg-muted shrink-0">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium hover:text-primary/80 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="py-0">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">News Tips</h3>
              <p className="text-sm text-muted-foreground">
                Have a breaking story or news tip? Send it to{" "}
                <a
                  href="mailto:tips@dailynews.com"
                  className="font-medium text-foreground hover:text-primary/80 transition-colors"
                >
                  tips@dailynews.com
                </a>{" "}
                and our editorial team will review it.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
