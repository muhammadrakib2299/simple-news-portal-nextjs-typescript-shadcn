import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Navbar = () => {
  return (
    <header className="py-4 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center sm:px-6 lg:px-8">
        
        {/* logo */}
        <div className="text-xl font-bold">
          <Link href="/">Daily News</Link>
        </div>

        {/* desktop menu */}
        <NavigationMenu>
          <NavigationMenuList>

            {/* Normal link */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/news">News</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col p-4 space-y-2">
                <NavigationMenuLink asChild>
                  <Link href="/services/web">Web Development</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/services/mobile">Mobile Apps</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/services/seo">SEO</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

      </nav>
    </header>
  )
}

export default Navbar
