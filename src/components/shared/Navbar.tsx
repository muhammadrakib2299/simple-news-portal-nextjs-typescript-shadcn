import Link from "next/link"

const Navbar = () => {
  return (
    <header className="py-4 shadow-md ">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* logo */}
        <div>
            <Link href={'/'}>Daily News</Link>
        </div>
        {/* destok menu */}




        {/* color switcher and login buuton */}
        </nav>
    </header>
  )
}

export default Navbar