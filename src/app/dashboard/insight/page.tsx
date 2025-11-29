'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart as RechartsBarChart,
  LineChart,
  XAxis,
  YAxis,
  Bar,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Users,
  MousePointerClick,
  Activity,
  Package,
} from 'lucide-react';
import { chartData, barChartData } from '@/lib/data';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

export default function InsightPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileQuery = useMemoFirebase(
    () => (user ? query(collection(firestore, 'umkm_profiles'), where('ownerId', '==', user.uid)) : null),
    [firestore, user]
  );
  const { data: umkmProfiles } = useCollection(userProfileQuery);
  const umkmProfile = umkmProfiles?.[0];

  const productsQuery = useMemoFirebase(
    () => (umkmProfile ? collection(firestore, 'umkm_profiles', umkmProfile.id, 'products') : null),
    [firestore, umkmProfile]
  );
  const { data: products } = useCollection(productsQuery);
  
  const statCards = [
    {
      title: 'Total Produk',
      value: products?.length ?? 0,
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      description: 'Jumlah produk dalam katalog Anda.',
    },
    {
      title: 'Total Kunjungan (30 hari)',
      value: '1,254',
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: '+20.1% dari bulan lalu',
    },
    {
      title: 'Klik CTA (30 hari)',
      value: '412',
      icon: <MousePointerClick className="h-4 w-4 text-muted-foreground" />,
      description: '+15.5% dari bulan lalu',
    },
    {
      title: 'Bounce Rate',
      value: '45.2%',
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      description: '-5% dari bulan lalu',
    },
  ];

  const chartConfig = {
    visits: { label: 'Kunjungan', color: 'hsl(var(--primary))' },
    clicks: { label: 'Klik', color: 'hsl(var(--chart-2))' },
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Insight Pengunjung</h1>
        <p className="text-muted-foreground">
          Analisis performa minisite Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grafik Kunjungan Harian</CardTitle>
          <CardDescription>
            Tren kunjungan minisite Anda selama 30 hari terakhir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart
              data={chartData.map((d, i) => ({
                ...d,
                day: i + 1,
                clicks: Math.floor(d.visits / (Math.random() * 5 + 2)),
              }))}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `Hari ${value}`}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="var(--color-visits)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="var(--color-clicks)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Produk Paling Populer</CardTitle>
            <CardDescription>
              Produk yang paling banyak dilihat oleh pengunjung.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ visits: { label: 'Kunjungan', color: 'hsl(var(--primary))' } }}
              className="h-[300px] w-full"
            >
              <RechartsBarChart
                data={barChartData}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  width={100}
                />
                <XAxis type="number" hide />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="visits" fill="var(--color-visits)" radius={5} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Performa CTA</CardTitle>
            <CardDescription>Distribusi klik pada tombol aksi Anda.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span>Klik WhatsApp</span>
              <span className="font-bold">{umkmProfile?.contactWhatsapp ? '210' : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Klik Instagram</span>
              <span className="font-bold">{umkmProfile?.contactInstagram ? '152' : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Klik Toko Shopee</span>
              <span className="font-bold">{umkmProfile?.contactShopee ? '50' : 'N/A'}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
