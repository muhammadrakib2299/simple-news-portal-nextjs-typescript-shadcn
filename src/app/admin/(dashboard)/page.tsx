import { FileText, Users, Mail, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboardPage() {
  const [articleCount, userCount, subscriberCount, unreadMessageCount] =
    await Promise.all([
      prisma.article.count(),
      prisma.user.count(),
      prisma.subscriber.count({ where: { active: true } }),
      prisma.contactMessage.count({ where: { read: false } }),
    ])

  const stats = [
    {
      label: "Articles",
      value: articleCount,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      label: "Users",
      value: userCount,
      icon: Users,
      color: "text-green-500",
    },
    {
      label: "Subscribers",
      value: subscriberCount,
      icon: Mail,
      color: "text-violet-500",
    },
    {
      label: "Unread Messages",
      value: unreadMessageCount,
      icon: MessageSquare,
      color: "text-orange-500",
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="py-0">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
