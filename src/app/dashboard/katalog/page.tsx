"use client"
import Image from "next/image"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Loader2 } from "lucide-react"

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import AddProductDialog from "@/components/dashboard/add-product-dialog"
import { collection, query, where } from "firebase/firestore"
import { getImage } from "@/lib/data"

const productCategories = [
  'Semua', 'Minuman', 'Makanan', 'Fashion', 'Kesehatan', 'Bumbu', 'Aksesoris'
]


export default function CatalogPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const userProfileQuery = useMemoFirebase(
    () => (user ? query(collection(firestore, 'umkm_profiles'), where('ownerId', '==', user.uid)) : null),
    [firestore, user]
  );
  const { data: umkmProfiles, isLoading: isLoadingProfile } = useCollection(userProfileQuery);
  const umkmProfile = umkmProfiles?.[0];

  const productsQuery = useMemoFirebase(
    () => (umkmProfile ? collection(firestore, 'umkm_profiles', umkmProfile.id, 'products') : null),
    [firestore, umkmProfile]
  );
  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);
  
  const filteredProducts = activeCategory === 'Semua'
    ? products
    : products?.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Katalog Produk</h1>
          <p className="text-muted-foreground">Kelola semua produk Anda di satu tempat.</p>
        </div>
        <AddProductDialog umkmProfileId={umkmProfile?.id}>
          <Button size="sm" className="h-8 gap-1" disabled={!umkmProfile}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Tambah Produk
            </span>
          </Button>
        </AddProductDialog>
      </div>
      
      <div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {productCategories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {(isLoadingProfile || isLoadingProducts) && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

      {!isLoadingProducts && !isLoadingProfile && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              const image = getImage('product-placeholder'); // Using a generic placeholder
              return (
                <Card key={product.id}>
                  <CardHeader className="p-0">
                      <Image
                        src={product.imageUrl || image?.imageUrl || 'https://placehold.co/400x400'}
                        alt={product.name}
                        data-ai-hint="product image"
                        width={400}
                        height={400}
                        className="object-cover w-full aspect-square rounded-t-lg"
                      />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-primary font-semibold mt-1">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                     <Badge 
                      variant={
                        product.stockStatus === 'In Stock' ? 'secondary' :
                        product.stockStatus === 'Low Stock' ? 'default' : 'destructive'
                      }
                      className={
                        product.stockStatus === 'Low Stock' ? 'bg-amber-500 text-black' : ''
                      }
                    >
                      {product.stockStatus === 'In Stock' ? 'Stok Tersedia' : product.stockStatus === 'Low Stock' ? 'Stok Terbatas' : 'Stok Habis' }
                    </Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold">Belum Ada Produk</h3>
              <p className="text-muted-foreground mt-2">Mulai tambahkan produk pertama Anda untuk ditampilkan di sini.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
