'use client';

import { Menu, Mountain, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from './dashboard-nav-items';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/dashboard/minisite': 'Minisite',
    '/dashboard/katalog': 'Katalog',
    '/dashboard/promosi': 'Promosi',
    '/dashboard/insight': 'Insight',
    '/dashboard/pengaturan': 'Pengaturan'
}

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  
  const title = pageTitles[pathname] || 'Dashboard';

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden sticky top-0 z-30">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Mountain className="h-6 w-6 text-primary" />
              <span className="">UMKM Boost</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                   pathname === item.href && 'bg-muted text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>
    </header>
  );
}
