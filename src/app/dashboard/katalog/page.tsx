"use client"
import Image from "next/image"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

import { products as allProducts, productCategories, getImage } from "@/lib/data"
import AddProductDialog from "@/components/dashboard/add-product-dialog"

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredProducts = activeCategory === 'Semua'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Katalog Produk</h1>
          <p className="text-muted-foreground">Kelola semua produk Anda di satu tempat.</p>
        </div>
        <AddProductDialog>
          <Button size="sm" className="h-8 gap-1">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const image = getImage(product.imageId);
          return (
            <Card key={product.id}>
              <CardHeader className="p-0">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={product.name}
                    data-ai-hint={image.imageHint}
                    width={400}
                    height={400}
                    className="object-cover w-full aspect-square rounded-t-lg"
                  />
                )}
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
                    product.stock === 'In Stock' ? 'secondary' :
                    product.stock === 'Low Stock' ? 'default' : 'destructive'
                  }
                  className={
                    product.stock === 'Low Stock' ? 'bg-amber-500 text-black' : ''
                  }
                >
                  {product.stock}
                </Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
