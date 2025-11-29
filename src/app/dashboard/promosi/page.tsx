import PromotionGenerator from '@/components/dashboard/promotion-generator';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PromotionPage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">Promosi Otomatis</h1>
            <p className="text-muted-foreground">Buat konten promosi dengan mudah menggunakan AI.</p>
        </div>
        <PromotionGenerator />
    </div>
  );
}
