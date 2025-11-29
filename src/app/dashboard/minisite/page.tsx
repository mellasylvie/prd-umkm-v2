'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Smartphone,
  MapPin,
  Instagram,
  ShoppingCart,
  MessageCircle,
  Loader2,
  Save,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

import { getImage } from '@/lib/data';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  query,
  where,
} from 'firebase/firestore';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UmkmProfile, updateUmkmProfile } from '@/firebase/firestore/data';

const templates = [
  { id: 'template-minimalist', name: 'Minimalist' },
  { id: 'template-elegant', name: 'Elegant' },
  { id: 'template-modern', name: 'Modern' },
];

export default function MinisiteEditorPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const userProfileQuery = useMemoFirebase(
    () =>
      user
        ? query(
            collection(firestore, 'umkm_profiles'),
            where('ownerId', '==', user.uid)
          )
        : null,
    [firestore, user]
  );
  const { data: umkmProfiles, isLoading: isLoadingProfile } =
    useCollection<UmkmProfile>(userProfileQuery);
  const umkmProfile = umkmProfiles?.[0];

  const form = useForm<Partial<UmkmProfile>>();

  useEffect(() => {
    if (umkmProfile) {
      form.reset(umkmProfile);
    }
  }, [umkmProfile, form]);

  const onSubmit = (data: Partial<UmkmProfile>) => {
    if (!umkmProfile) return;
    setIsSaving(true);
    updateUmkmProfile(firestore, umkmProfile.id, data)
      .then(() => {
        toast({
          title: 'Berhasil',
          description: 'Perubahan minisite telah disimpan.',
        });
      })
      .catch((err) => {
        toast({
          variant: 'destructive',
          title: 'Gagal Menyimpan',
          description: 'Terjadi kesalahan saat menyimpan perubahan.',
        });
        console.error(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const userLogo = getImage('user-logo');
  const userBanner = getImage('user-banner');

  const watchedValues = form.watch();

  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1 flex flex-col gap-6">
        <div className="md:hidden sticky top-[60px] bg-background z-10 py-2">
            <h1 className="text-xl font-bold">Editor Minisite</h1>
            <p className="text-sm text-muted-foreground">
              Sesuaikan tampilan dan informasi minisite Anda.
            </p>
        </div>
        <Card>
          <CardHeader className="hidden md:flex">
            <CardTitle>Editor Minisite</CardTitle>
            <CardDescription>
              Sesuaikan tampilan dan informasi minisite Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Usaha</Label>
               <Controller
                  name="name"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => <Input id="name" placeholder="Nama usaha Anda" {...field} />}
                />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Usaha</Label>
              <Button variant="outline" className="w-full" type="button">
                <Upload className="mr-2 h-4 w-4" /> Upload Logo
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner">Banner</Label>
              <Button variant="outline" className="w-full" type="button">
                <Upload className="mr-2 h-4 w-4" /> Upload Banner
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Usaha</Label>
              <Controller
                  name="description"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => <Textarea
                  id="description"
                  placeholder="Ceritakan tentang usaha Anda..."
                  {...field}
                />}
                />
            </div>
            <div className="space-y-2">
              <Label>Tombol Aksi (CTA)</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                   <Controller
                      name="contactWhatsapp"
                      control={form.control}
                      defaultValue=""
                      render={({ field }) =>  <Input placeholder="Nomor WhatsApp (e.g. 62812...)" {...field} />}
                    />
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                   <Controller
                      name="contactInstagram"
                      control={form.control}
                      defaultValue=""
                      render={({ field }) =>  <Input placeholder="Username Instagram" {...field} />}
                    />
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                   <Controller
                      name="contactShopee"
                      control={form.control}
                      defaultValue=""
                      render={({ field }) => <Input placeholder="Link Toko Shopee" {...field} />}
                    />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Lokasi &amp; Peta</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                 <Controller
                    name="location"
                    control={form.control}
                    defaultValue=""
                    render={({ field }) => <Input id="location" placeholder="Link Google Maps" {...field} />}
                  />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pilih Template</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            {templates.map((template, index) => {
              const image = getImage(template.id);
              return (
                <button
                  key={template.id}
                  type="button"
                  className={`relative rounded-lg overflow-hidden border-2 ${
                    index === 1 ? 'border-primary' : 'border-transparent'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={template.name}
                      width={200}
                      height={150}
                      data-ai-hint={image.imageHint}
                      className="aspect-[4/3] object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {template.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="sticky top-6">
          <CardHeader className="flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Smartphone className="h-6 w-6" />
              <CardTitle>Live Preview</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {umkmProfile && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/site/${umkmProfile.id}`} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    Lihat Minisite
                  </Link>
                </Button>
              )}
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Simpan
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-md mx-auto aspect-[9/19] bg-muted rounded-lg border-4 border-foreground/50 overflow-y-auto p-2">
              <div className="bg-background rounded-md">
                {userBanner && (
                  <Image
                    src={userBanner.imageUrl}
                    alt="Banner"
                    width={1200}
                    height={400}
                    data-ai-hint={userBanner.imageHint}
                    className="w-full h-32 object-cover rounded-t-md"
                  />
                )}
                <div className="p-4 relative">
                  <div className="absolute -top-10 left-4">
                    {userLogo && (
                      <Image
                        src={userLogo.imageUrl}
                        alt="Logo"
                        width={64}
                        height={64}
                        data-ai-hint={userLogo.imageHint}
                        className="rounded-full border-4 border-background"
                      />
                    )}
                  </div>
                  <h2 className="text-xl font-bold mt-8">
                    {watchedValues.name || 'Nama Usaha Anda'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    {watchedValues.description || 'Ini adalah tempat untuk deskripsi singkat yang menarik tentang usaha Anda. Jelaskan apa yang membuat produk Anda spesial.'}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {watchedValues.contactWhatsapp && <Button size="sm"><MessageCircle className="h-4 w-4 mr-2" /> WhatsApp</Button>}
                    {watchedValues.contactInstagram && <Button size="sm" variant="outline"><Instagram className="h-4 w-4 mr-2" /> Instagram</Button>}
                     {watchedValues.contactShopee && <Button size="sm" variant="outline"><ShoppingCart className="h-4 w-4 mr-2" /> Shopee</Button>}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
