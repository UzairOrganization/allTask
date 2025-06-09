'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, UserCog, PenTool } from 'lucide-react' // Import icons

export default function AdminHeader() {
    const pathname = usePathname()

    const navLinks = [
        {
            name: 'Dashboard',
            href: '/admin/admin-dashboard',
            icon: <Home className="h-5 w-5" />,
        },
        {
            name: 'All Professionals',
            href: '/admin/all-professionals',
            icon: <UserCog className="h-5 w-5" />,
        },
        {
            name: 'All Users',
            href: '/admin/all-users',
            icon: <Users className="h-5 w-5" />,
        },
        {
            name: 'All Services',
            href: '/admin/modifications',
            icon: <PenTool className="h-5 w-5" />,
        }
    ]

    return (
        <header className="border-b p-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container w-[98%] mx-auto flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="logo w-[210px]">
                    <Link href="/">
                        <img src="/assets/images/logoMain.png" alt="" className="w-full" />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-green-700 ${pathname === link.href ? 'text-green-700' : 'text-gray-600'
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile menu button (optional) */}
                <div className="md:hidden">
                    <button className="p-2 text-gray-600 hover:text-green-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}