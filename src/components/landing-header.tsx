'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mountain, LayoutDashboard } from 'lucide-react';
import { useUser } from '@/firebase';

export default function LandingHeader() {
  const { user, isUserLoading } = useUser();

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Mountain className="h-6 w-6 text-primary" />
        <span className="sr-only">UMKM Boost</span>
      </Link>
      <span className="font-semibold text-xl ml-2">UMKM Boost</span>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {isUserLoading ? (
          <div className="h-10 w-24 bg-muted rounded-md animate-pulse" />
        ) : user ? (
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/dashboard" prefetch={false}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login" prefetch={false}>
                Login
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/register" prefetch={false}>
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
