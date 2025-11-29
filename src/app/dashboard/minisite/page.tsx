import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, Smartphone, MapPin, Instagram, Link as LinkIcon, ShoppingCart, MessageCircle } from "lucide-react"

import { getImage } from "@/lib/data"

const templates = [
  { id: 'template-minimalist', name: 'Minimalist' },
  { id: 'template-elegant', name: 'Elegant' },
  { id: 'template-modern', name: 'Modern' },
]

export default function MinisiteEditorPage() {
  const userLogo = getImage('user-logo');
  const userBanner = getImage('user-banner');

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Editor Minisite</CardTitle>
            <CardDescription>Sesuaikan tampilan dan informasi minisite Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Usaha</Label>
              <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Upload Logo</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner">Banner</Label>
              <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Upload Banner</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Usaha</Label>
              <Textarea id="description" placeholder="Ceritakan tentang usaha Anda..." />
            </div>
            <div className="space-y-2">
              <Label>Tombol Aksi (CTA)</Label>
              <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Nomor WhatsApp (e.g. 62812...)" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Username Instagram" />
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Link Toko Shopee" />
                  </div>
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="location">Lokasi & Peta</Label>
                 <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input id="location" placeholder="Link Google Maps" />
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
                <button key={template.id} className={`relative rounded-lg overflow-hidden border-2 ${index === 1 ? 'border-primary' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-primary`}>
                  {image && 
                    <Image src={image.imageUrl} alt={template.name} width={200} height={150} data-ai-hint={image.imageHint} className="aspect-[4/3] object-cover"/>
                  }
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{template.name}</span>
                  </div>
                </button>
              )
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
             <Button>Simpan Perubahan</Button>
          </CardHeader>
          <CardContent>
            <div className="w-full aspect-[9/19] bg-muted rounded-lg border-4 border-foreground/50 overflow-y-auto p-2">
              <div className="bg-background rounded-md">
                {userBanner && 
                    <Image src={userBanner.imageUrl} alt="Banner" width={1200} height={400} data-ai-hint={userBanner.imageHint} className="w-full h-32 object-cover rounded-t-md" />
                }
                <div className="p-4 relative">
                    <div className="absolute -top-10 left-4">
                        {userLogo &&
                            <Image src={userLogo.imageUrl} alt="Logo" width={64} height={64} data-ai-hint={userLogo.imageHint} className="rounded-full border-4 border-background" />
                        }
                    </div>
                    <h2 className="text-xl font-bold mt-8">Nama Usaha Anda</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Ini adalah tempat untuk deskripsi singkat yang menarik tentang usaha Anda. Jelaskan apa yang membuat produk Anda spesial.
                    </p>
                    <div className="flex gap-2 mt-4">
                        <Button size="sm"><MessageCircle className="h-4 w-4 mr-2" /> WhatsApp</Button>
                        <Button size="sm" variant="outline"><Instagram className="h-4 w-4 mr-2" /> Instagram</Button>
                    </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
