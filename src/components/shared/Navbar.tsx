"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Switch } from "@/components/ui/switch"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Daily News
          </Link>
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>

            {/* News */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/news"
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300"
                >
                  News
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>


            {/* Services */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    { title: "Web Development", href: "/services/web-development", description: "Build modern, responsive websites and web applications." },
                    { title: "Mobile Apps", href: "/services/mobile-apps", description: "Create native and cross-platform mobile experiences." },
                    { title: "SEO Optimization", href: "/services/seo", description: "Improve your search engine rankings and visibility." },
                    { title: "Cloud Services", href: "/services/cloud", description: "Scalable cloud solutions for your business needs." }
                  ].map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side - Dark Mode */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-slate-600 dark:text-slate-300">
            Dark Mode
          </span>
          <Switch />
        </div>

      </nav>
    </header>
  )
}

export default Navbar
