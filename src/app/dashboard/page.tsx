import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Users, Package, DollarSign } from "lucide-react"

import { chartData, recentActivities } from "@/lib/data"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart as RechartsBarChart, XAxis, YAxis, Bar, CartesianGrid } from "recharts"

const statCards = [
  {
    title: "Total Kunjungan",
    value: "1,254",
    change: "+20.1% from last month",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Klik WhatsApp",
    value: "342",
    change: "+180.1% from last month",
    icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Produk Paling Dilihat",
    value: "Kopi Gayo",
    change: "210 clicks",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Estimasi Pendapatan",
    value: "Rp 12.500.000",
    change: "+32% from last month",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
]

export default function Dashboard() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview Kunjungan</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{ visits: { label: "Visits", color: "hsl(var(--primary))" } }} className="h-[300px] w-full">
              <RechartsBarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Aktivitas Terakhir</CardTitle>
            <CardDescription>
              Lihat pesanan dan pembaruan terbaru.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk/Info</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead className="text-right">Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{activity.product}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{activity.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
