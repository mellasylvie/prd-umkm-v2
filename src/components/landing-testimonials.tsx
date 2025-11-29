import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { testimonials, getImage } from '@/lib/data';

export default function LandingTestimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Kisah Sukses dari Rekan UMKM
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Lihat bagaimana UMKM Boost telah membantu para pengusaha seperti Anda untuk berkembang.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:grid-cols-3 mt-8">
          {testimonials.map((testimonial) => {
            const avatar = getImage(testimonial.avatarId);
            return (
              <Card key={testimonial.name} className="bg-card text-left">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {avatar && (
                        <Image
                          src={avatar.imageUrl}
                          alt={`Avatar of ${testimonial.name}`}
                          data-ai-hint={avatar.imageHint}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                    )}
                    <div>
                      <p className="text-sm font-medium leading-none">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">&ldquo;{testimonial.comment}&rdquo;</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
