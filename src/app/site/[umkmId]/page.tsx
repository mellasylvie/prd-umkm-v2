'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  useFirestore,
  useDoc,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import { doc, collection, query, where } from 'firebase/firestore';
import {
  Loader2,
  MapPin,
  Instagram,
  ShoppingCart,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UmkmProfile, Product } from '@/firebase/firestore/data';
import SiteFooter from '@/components/site-footer';
import { getImage } from '@/lib/data';

export default function MinisitePage() {
  const { umkmId } = useParams();
  const firestore = useFirestore();

  const umkmRef = useMemoFirebase(
    () => (umkmId ? doc(firestore, 'umkm_profiles', umkmId as string) : null),
    [firestore, umkmId]
  );
  const { data: umkmProfile, isLoading: isLoadingUmkm } = useDoc<UmkmProfile>(umkmRef);

  const productsQuery = useMemoFirebase(
    () =>
      umkmId
        ? query(
            collection(firestore, `umkm_profiles/${umkmId}/products`)
          )
        : null,
    [firestore, umkmId]
  );
  const { data: products, isLoading: isLoadingProducts } =
    useCollection<Product>(productsQuery);

  const isLoading = isLoadingUmkm || isLoadingProducts;
  const userLogo = getImage('user-logo');
  const userBanner = getImage('user-banner');

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!umkmProfile) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background text-center">
        <h2 className="text-2xl font-bold">Minisite Tidak Ditemukan</h2>
        <p className="text-muted-foreground">
          Tautan yang Anda kunjungi mungkin rusak atau halaman telah dihapus.
        </p>
        <Button asChild>
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex-1">
        <section className="relative h-48 w-full md:h-64">
          <Image
            src={umkmProfile.bannerUrl || userBanner?.imageUrl || 'https://placehold.co/1200x400'}
            alt={`${umkmProfile.name} banner`}
            layout="fill"
            objectFit="cover"
            className="rounded-b-lg"
            data-ai-hint="abstract banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </section>

        <section className="container mx-auto -mt-16 px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <Image
              src={umkmProfile.logoUrl || userLogo?.imageUrl || 'https://placehold.co/128x128'}
              alt={`${umkmProfile.name} logo`}
              width={128}
              height={128}
              className="rounded-full border-4 border-background bg-background object-cover"
              data-ai-hint="company logo"
            />
            <h1 className="mt-4 text-4xl font-bold">{umkmProfile.name}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {umkmProfile.description}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {umkmProfile.contactWhatsapp && (
                <Button asChild>
                  <a
                    href={`https://wa.me/${umkmProfile.contactWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              )}
              {umkmProfile.contactInstagram && (
                <Button variant="outline" asChild>
                  <a
                    href={`https://instagram.com/${umkmProfile.contactInstagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="mr-2 h-4 w-4" /> Instagram
                  </a>
                </Button>
              )}
              {umkmProfile.contactShopee && (
                <Button variant="outline" asChild>
                  <a
                    href={umkmProfile.contactShopee}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Shopee
                  </a>
                </Button>
              )}
               {umkmProfile.location && (
                <Button variant="outline" asChild>
                  <a
                    href={umkmProfile.location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-4 w-4" /> Lokasi
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto py-12 px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">Produk Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products && products.length > 0 ? (
                    products.map(product => (
                        <Card key={product.id} className="overflow-hidden">
                            <Link href={`/site/${umkmId}/${product.id}`}>
                                <CardHeader className="p-0">
                                    <Image
                                        src={product.imageUrl || 'https://placehold.co/400x400/E8B83E/FFFFFF?text=Produk'}
                                        alt={product.name}
                                        data-ai-hint="product image"
                                        width={400}
                                        height={400}
                                        className="object-cover w-full aspect-square transition-transform duration-300 hover:scale-105"
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg hover:text-primary transition-colors">{product.name}</CardTitle>
                                    <p className="text-primary font-semibold mt-1">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Badge 
                                    variant={
                                        product.stockStatus === 'In Stock' ? 'secondary' :
                                        product.stockStatus === 'Low Stock' ? 'default' : 'destructive'
                                    }
                                    className={`w-fit ${
                                        product.stockStatus === 'Low Stock' ? 'bg-amber-500 text-black' : ''
                                    }`}
                                    >
                                    {product.stockStatus === 'In Stock' ? 'Stok Tersedia' : product.stockStatus === 'Low Stock' ? 'Stok Terbatas' : 'Stok Habis' }
                                    </Badge>
                                </CardFooter>
                            </Link>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <h3 className="text-xl font-semibold">Belum Ada Produk</h3>
                        <p className="text-muted-foreground mt-2">Pemilik toko belum menambahkan produk apapun.</p>
                    </div>
                )}
            </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
