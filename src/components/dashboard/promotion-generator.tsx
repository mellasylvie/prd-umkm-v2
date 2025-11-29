'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Copy, Share2, Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generatePromotionalContentAction } from '@/app/actions/promotions';
import { getImage } from '@/lib/data';

const GeneratePromotionalContentInputSchema = z.object({
  productName: z.string().min(3, 'Nama produk minimal 3 karakter.'),
  productDescription: z.string().min(10, 'Deskripsi produk minimal 10 karakter.'),
  productPrice: z.coerce.number().min(0, 'Harga produk harus positif.'),
  productCategory: z.string().min(1, 'Kategori produk harus diisi.'),
  targetAudience: z.string().min(3, 'Target audiens minimal 3 karakter.'),
  promotionType: z.enum(['caption', 'poster'], {
    required_error: 'Tipe promosi harus dipilih.',
  }),
  templateStyle: z.string().min(1, 'Gaya template harus dipilih.'),
});

type GeneratePromotionalContentInput = z.infer<typeof GeneratePromotionalContentInputSchema>;

const posterTemplates = [
  { id: 'poster-template-1', name: 'Minimalist' },
  { id: 'poster-template-2', name: 'Bold' },
  { id: 'poster-template-3', name: 'Elegant' },
];

export default function PromotionGenerator() {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<GeneratePromotionalContentInput>({
    resolver: zodResolver(GeneratePromotionalContentInputSchema),
    defaultValues: {
      productName: 'Kopi Gayo Premium',
      productDescription: 'Biji kopi arabika pilihan dari dataran tinggi Gayo, Aceh. Diproses secara natural untuk menghasilkan cita rasa fruity dan aroma yang kuat.',
      productPrice: 75000,
      productCategory: 'Minuman',
      targetAudience: 'Pecinta kopi, dewasa muda, profesional',
      promotionType: 'caption',
      templateStyle: 'minimalist',
    },
  });

  const onSubmit = async (data: GeneratePromotionalContentInput) => {
    setIsLoading(true);
    setGeneratedContent('');
    try {
      const result = await generatePromotionalContentAction(data);
      if (result.error) {
        throw new Error(result.error);
      }
      setGeneratedContent(result.data?.content || '');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal membuat konten.';
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Berhasil Disalin',
      description: 'Caption promosi telah disalin ke clipboard.',
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Generator Konten</CardTitle>
              <CardDescription>
                Isi detail produk untuk membuat konten promosi dengan AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="cth. Kopi Gayo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Produk</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Jelaskan keunggulan produk..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="productPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Produk</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="cth. 75000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="cth. Minuman" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audiens</FormLabel>
                    <FormControl>
                      <Input placeholder="cth. Mahasiswa, pekerja kantor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="promotionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Promosi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tipe promosi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="caption">Caption Media Sosial</SelectItem>
                        <SelectItem value="poster">Ide Konten Poster</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="templateStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gaya Template</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih gaya template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="elegant">Elegant</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="fun">Fun & Playful</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Konten
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Hasil Konten</CardTitle>
          <CardDescription>
            Ini adalah hasil konten yang dibuat oleh AI. Anda bisa menyalin atau langsung membagikannya.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">AI sedang meracik kata-kata...</p>
            </div>
          ) : (
             form.watch('promotionType') === 'caption' ? (
                <Textarea
                    readOnly
                    value={generatedContent || "Hasil caption akan muncul di sini..."}
                    className="h-full min-h-[350px] text-base"
                />
             ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {posterTemplates.map(template => {
                        const image = getImage(template.id);
                        return (
                            <div key={template.id} className="relative group">
                                {image && (
                                    <Image src={image.imageUrl} alt={template.name} width={300} height={400} className="rounded-lg aspect-[3/4] object-cover" data-ai-hint={image.imageHint}/>
                                )}
                                <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                    <p className="text-white text-xs text-center">{generatedContent || "Deskripsi untuk poster ini akan muncul di sini."}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
             )
          )}
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={copyToClipboard} disabled={!generatedContent}>
            <Copy className="mr-2 h-4 w-4" /> Salin
          </Button>
          <Button disabled={!generatedContent}>
            <Share2 className="mr-2 h-4 w-4" /> Bagikan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
