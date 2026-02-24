import { redirect } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  Mail,
  MessageSquare,
  LogOut,
  Newspaper,
} from "lucide-react"
import { auth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Articles", href: "/admin/articles", icon: FileText },
  { label: "Categories", href: "/admin/categories", icon: FolderOpen },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Subscribers", href: "/admin/subscribers", icon: Mail },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <span className="font-bold">Daily News</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <p className="text-sm font-medium truncate">
            {session.user.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {session.user.email}
          </p>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/admin/login" })
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 mt-2"
              type="submit"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
