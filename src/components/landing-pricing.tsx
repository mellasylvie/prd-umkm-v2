import { Check, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const tiers = [
  {
    name: 'Gratis',
    price: 'Rp 0',
    description: 'Mulai digitalisasi bisnis Anda tanpa biaya.',
    features: [
      'Minisite & Katalog Digital',
      'Hingga 10 produk',
      'Akses Komunitas Dasar',
      'Tema standar',
    ],
    cta: 'Mulai Gratis',
    href: '/register',
  },
  {
    name: 'Pro',
    price: 'Rp 99rb',
    description: 'Buka fitur canggih untuk pertumbuhan bisnis.',
    features: [
      'Semua di paket Gratis',
      'Produk tanpa batas',
      'Promosi Otomatis (AI)',
      'Insight Pengunjung Dasar',
      'Pelatihan Digitalisasi',
      'Dukungan Prioritas',
    ],
    cta: 'Pilih Pro',
    href: '/register',
    popular: true,
  },
  {
    name: 'Premium',
    price: 'Rp 249rb',
    description: 'Solusi lengkap untuk ekspansi bisnis maksimal.',
    features: [
      'Semua di paket Pro',
      'Analitik Pengunjung Lanjutan',
      'Sesi mentoring 1-on-1',
      'Integrasi domain custom',
      'Akses awal fitur baru',
    ],
    cta: 'Hubungi Kami',
    href: '#',
  },
];

export default function LandingPricing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Harga & Paket</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pilih Paket yang Tepat untuk Anda</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Investasi terbaik untuk masa depan digital UMKM Anda. Mulai dari gratis.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-8 mt-12">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                'flex flex-col h-full',
                tier.popular ? 'border-primary border-2 shadow-lg -translate-y-4' : 'border-border'
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 right-4 -mt-3">
                  <div className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Star className="h-4 w-4" />
                    Populer
                  </div>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <p className="font-bold text-4xl text-primary">{tier.price}<span className="text-sm font-normal text-muted-foreground">/bulan</span></p>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className={cn('w-full', tier.popular ? 'bg-primary' : 'bg-primary/80')} size="lg">
                    <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
