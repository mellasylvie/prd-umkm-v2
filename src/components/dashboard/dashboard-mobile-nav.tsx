'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./dashboard-nav-items";
import { cn } from "@/lib/utils";

export default function DashboardMobileNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm md:hidden z-40">
            <nav className="grid grid-cols-5 items-center justify-center gap-1 p-1">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 rounded-lg p-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === item.href && "text-primary bg-muted/50"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
