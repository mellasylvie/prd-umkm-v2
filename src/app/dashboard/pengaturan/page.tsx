import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">Pengaturan</h1>
            <p className="text-muted-foreground">Kelola akun dan pengaturan umum Anda.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Halaman Pengaturan</CardTitle>
                <CardDescription>Konten untuk pengaturan akan segera hadir.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Ini adalah halaman placeholder untuk Pengaturan.</p>
            </CardContent>
        </Card>
    </div>
  )
}
