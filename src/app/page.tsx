import LandingFeatures from '@/components/landing-features';
import LandingHeader from '@/components/landing-header';
import LandingHero from '@/components/landing-hero';
import LandingTestimonials from '@/components/landing-testimonials';
import SiteFooter from '@/components/site-footer';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
      </main>
      <SiteFooter />
    </div>
  );
}
