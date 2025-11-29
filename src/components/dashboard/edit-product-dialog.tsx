'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Upload, Loader2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { updateProduct, Product } from '@/firebase/firestore/data';
import { useToast } from '@/hooks/use-toast';

const productSchema = z.object({
  name: z.string().min(3, 'Nama produk minimal 3 karakter'),
  price: z.coerce.number().positive('Harga harus lebih dari 0'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  category: z.string({ required_error: 'Kategori harus dipilih' }),
  stockStatus: z.string({ required_error: 'Status stok harus dipilih' }),
  imageUrl: z.string().url('URL gambar tidak valid').optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const productCategories = [
  'Minuman', 'Makanan', 'Fashion', 'Kesehatan', 'Bumbu', 'Aksesoris'
]

export default function EditProductDialog({
  children,
  umkmProfileId,
  product,
}: {
  children: React.ReactNode;
  umkmProfileId?: string;
  product: Product;
}) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });
  
  useEffect(() => {
    if(product) {
        form.reset({
            ...product,
        });
    }
  }, [product, form, open]);


  const onSubmit = async (data: ProductFormValues) => {
    if (!umkmProfileId) {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Profil UMKM tidak ditemukan.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProduct(firestore, umkmProfileId, product.id, data);
      toast({
        title: 'Berhasil!',
        description: 'Perubahan produk telah disimpan.',
      });
      setOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Gagal Memperbarui Produk',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Produk</DialogTitle>
          <DialogDescription>
            Ubah detail produk Anda di bawah ini. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Foto Produk</Label>
              <Button variant="outline" type="button">
                <Upload className="mr-2 h-4 w-4" /> Ganti Foto
              </Button>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Nama Produk</Label>
                  <FormControl>
                    <Input placeholder="cth. Kopi Gayo Premium" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <Label>Harga</Label>
                  <FormControl>
                    <Input type="number" placeholder="cth. 75000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Deskripsi</Label>
                  <FormControl>
                    <Textarea
                      placeholder="Jelaskan tentang produk Anda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Label>Kategori</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockStatus"
              render={({ field }) => (
                <FormItem>
                  <Label>Status Stok</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status Stok" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="In Stock">Stok Tersedia</SelectItem>
                      <SelectItem value="Low Stock">Stok Terbatas</SelectItem>
                      <SelectItem value="Out of Stock">Stok Habis</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Perubahan
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
