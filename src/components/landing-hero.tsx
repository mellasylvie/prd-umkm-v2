import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getImage } from '@/lib/data';

export default function LandingHero() {
  const minisiteMockup = getImage('minisite-mockup');

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                Bangun Minisite & Katalog Digital untuk UMKM Anda dalam Hitungan Menit
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Solusi cepat, mudah, dan elegan untuk hadir secara online. Tampilkan produk terbaik Anda dengan platform premium yang dirancang untuk UMKM.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/register" prefetch={false}>
                  Mulai Sekarang
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/site/contoh" prefetch={false}>
                  Lihat Contoh Minisite
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Card className="bg-card/40 border-primary/20 p-2 transform-gpu [-webkit-transform-style:preserve-3d] [transform-style:preserve-3d] [transform:rotateY(-25deg)_rotateX(15deg)] w-full max-w-sm">
                <CardContent className="p-0">
                    {minisiteMockup && (
                        <Image
                            src={minisiteMockup.imageUrl}
                            alt={minisiteMockup.description}
                            data-ai-hint={minisiteMockup.imageHint}
                            width={600}
                            height={800}
                            className="rounded-md object-cover aspect-[3/4]"
                        />
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
