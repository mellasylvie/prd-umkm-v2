'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  useFirestore,
  useDoc,
  useMemoFirebase,
  useUser,
} from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product, UmkmProfile } from '@/firebase/firestore/data';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { umkmId, productId } = useParams();
  const firestore = useFirestore();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const umkmRef = useMemoFirebase(
    () => (umkmId ? doc(firestore, 'umkm_profiles', umkmId as string) : null),
    [firestore, umkmId]
  );
  const { data: umkmProfile, isLoading: isLoadingUmkm } = useDoc<UmkmProfile>(umkmRef);

  const productRef = useMemoFirebase(
    () => (umkmId && productId ? doc(firestore, `umkm_profiles/${umkmId}/products`, productId as string) : null),
    [firestore, umkmId, productId]
  );
  const { data: product, isLoading: isLoadingProduct } = useDoc<Product>(productRef);

  const handleBuy = () => {
    if (!user) {
      toast({
        title: 'Anda Belum Login',
        description: 'Silakan login terlebih dahulu untuk melanjutkan pembelian.',
        variant: 'destructive',
      });
      router.push('/login');
    } else {
      toast({
        title: 'Mantap!',
        description: `${product?.name} telah ditambahkan ke keranjang. (Fitur keranjang segera hadir!)`,
      });
    }
  };

  const isLoading = isLoadingUmkm || isLoadingProduct;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!product || !umkmProfile) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background text-center">
        <h2 className="text-2xl font-bold">Produk Tidak Ditemukan</h2>
        <p className="text-muted-foreground">
          Produk yang Anda cari tidak ada atau telah dihapus.
        </p>
        <Button asChild>
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali
      </Button>
      <Card>
        <CardContent className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <Image
              src={product.imageUrl || 'https://placehold.co/600x600/E8B83E/FFFFFF?text=Produk'}
              alt={product.name}
              width={600}
              height={600}
              className="w-full rounded-lg object-cover aspect-square"
              data-ai-hint="product image"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <Link href={`/site/${umkmId}`}>
                <span className="text-sm text-primary hover:underline">{umkmProfile.name}</span>
            </Link>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <Badge variant="secondary" className="w-fit">
              {product.category}
            </Badge>
            <p className="text-3xl font-bold text-primary">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(product.price)}
            </p>
            <div className="space-y-2">
                <h3 className="font-semibold">Deskripsi Produk</h3>
                <p className="text-muted-foreground">{product.description}</p>
            </div>
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

            <Button size="lg" onClick={handleBuy} disabled={product.stockStatus === 'Out of Stock'}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Beli Sekarang
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
