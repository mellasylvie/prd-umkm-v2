import Link from 'next/link';
import { Mountain, Twitter, Instagram, Facebook } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start col-span-2 md:col-span-1">
             <Link href="/" className="flex items-center justify-center mb-4" prefetch={false}>
                <Mountain className="h-6 w-6 text-primary" />
                <span className="font-semibold text-xl ml-2">UMKM Boost</span>
            </Link>
            <p className="text-sm text-muted-foreground">Solusi digital untuk UMKM Indonesia.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Fitur</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Minisite</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Katalog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Promosi AI</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Insight</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Tentang Kami</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Karir</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; 2024 UMKM Boost. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
