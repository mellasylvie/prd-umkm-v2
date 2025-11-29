import type { ImagePlaceholder } from './types';
import placeholderImagesData from './placeholder-images.json';

export const placeholderImages: ImagePlaceholder[] = placeholderImagesData.placeholderImages;

export const getImage = (id: string) => {
    return placeholderImages.find(img => img.id === id);
}

export const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Owner, Kopi Kenangan Senja',
    avatarId: 'testimonial-avatar-1',
    comment:
      'UMKM Boost mengubah cara saya berjualan online. Minisite-nya elegan dan mudah dibuat. Omzet saya naik 30% dalam sebulan!',
  },
  {
    name: 'Siti Aminah',
    role: 'Founder, Batik Lestari',
    avatarId: 'testimonial-avatar-2',
    comment:
      'Fitur promosi otomatisnya luar biasa. Saya tidak perlu pusing lagi memikirkan caption, tinggal generate dan share. Sangat membantu!',
  },
  {
    name: 'Rian Nugraha',
    role: 'Pengrajin, Anyaman Rotan',
    avatarId: 'testimonial-avatar-3',
    comment:
      'Tampilan premium dari UMKM Boost membuat produk saya terlihat lebih berkelas. Insight pengunjung juga sangat berguna untuk strategi penjualan.',
  },
];


export const chartData = [
    { date: 'Jan', visits: Math.floor(Math.random() * 1000) + 200 },
    { date: 'Feb', visits: Math.floor(Math.random() * 1000) + 200 },
    { date: 'Mar', visits: Math.floor(Math.random() * 1000) + 200 },
    { date: 'Apr', visits: Math.floor(Math.random() * 1000) + 200 },
    { date: 'May', visits: Math.floor(Math.random() * 1000) + 200 },
    { date: 'Jun', visits: Math.floor(Math.random() * 1000) + 200 },
];

export const barChartData = [
  { name: 'Kopi Gayo', visits: 456 },
  { name: 'Batik Tulis', visits: 389 },
  { name: 'Tas Anyam', visits: 275 },
  { name: 'Madu Hutan', visits: 212 },
  { name: 'Keripik Singkong', visits: 187 },
];

export const recentActivities = [
    { product: 'Kopi Gayo Premium', type: 'New Order', time: '5 minutes ago' },
    { product: 'Batik Tulis Klasik', type: 'Stock Update', time: '1 hour ago' },
    { product: 'Minisite', type: 'Content Update', time: '3 hours ago' },
    { product: 'Sambal Terasi Juara', type: 'New Review', time: '5 hours ago' },
    { product: 'Tas Anyam Rotan', type: 'New Order', time: '1 day ago' },
]

export const productCategories = [
  'Semua', 'Minuman', 'Makanan', 'Fashion', 'Kesehatan', 'Bumbu', 'Aksesoris'
]
