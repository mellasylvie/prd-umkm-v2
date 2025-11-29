'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  BookCopy,
  LayoutTemplate,
  Megaphone,
  BarChart2,
  Settings,
  Mountain,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/firebase"
import { navItems } from "./dashboard-nav-items"

export default function DashboardSidebar() {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="">UMKM Boost</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                  pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
           <Link
                href="/dashboard/pengaturan"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                  pathname === "/dashboard/pengaturan" && "bg-muted text-primary"
                )}
              >
                <Settings className="h-4 w-4" />
                Pengaturan
              </Link>
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted/50">
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
        </div>
      </div>
    </div>
  )
}
