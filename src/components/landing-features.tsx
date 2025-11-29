import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, BookCopy, Megaphone, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: 'Buat Minisite',
    description: 'Ciptakan halaman profil bisnis yang profesional dan elegan hanya dengan beberapa klik.',
  },
  {
    icon: <BookCopy className="h-8 w-8 text-primary" />,
    title: 'Katalog Produk',
    description: 'Kelola dan pamerkan produk Anda dengan tampilan katalog yang bersih dan modern.',
  },
  {
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    title: 'Promosi Otomatis',
    description: 'Buat caption dan poster promosi menarik secara otomatis dengan bantuan AI.',
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: 'Insight Pengunjung',
    description: 'Pahami performa bisnis Anda dengan data kunjungan dan produk terpopuler.',
  },
];

export default function LandingFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Fitur Unggulan</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Semua yang Anda Butuhkan untuk Go Digital</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Platform kami menyediakan alat-alat canggih yang dirancang khusus untuk membawa bisnis UMKM Anda ke level berikutnya.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 mt-12">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background/50 border-border/50 hover:border-primary/50 hover:bg-background transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="flex flex-col items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
