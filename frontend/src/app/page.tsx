import TopSection from '@/components/Layout/TopSection';
import MiddleSection from '@/components/Layout/MiddleSection';
import PokemonList from '@/components/PokemonList';

export default function Home() {
  // carouselImages - batman banners
  const carouselImages = [
    '/images/banners/carousel-1.jpg',
    '/images/banners/carousel-2.jpg',
    '/images/banners/carousel-3.jpg',
  ];

  // Static banner images - using local images
  const staticBanner1 = '/images/banners/static-banner-1.jpg';
  const staticBanner2 = '/images/banners/static-banner-2.jpg';

  // Middle section static images
  const leftStaticImage = '/images/placeholders/left-image.jpg';
  const rightStaticImage = '/images/placeholders/right-image.jpg';

  // If using online placeholders temporarily, uncomment these:
  // const leftStaticImage = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=300&h=600&fit=crop';
  // const rightStaticImage = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=600&fit=crop';

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {/* Top Section - Carousel + Static Banners */}
        <TopSection
          carouselImages={carouselImages}
          staticBanner1={staticBanner1}
          staticBanner2={staticBanner2}
        />

        {/* Middle Section - Left/Right Static Images + Center Content */}
        <MiddleSection
          leftImage={leftStaticImage}
          rightImage={rightStaticImage}
        >
          {/* Actual Pokémon list in the persistent middle section */}
          {/* This list fetches data only from the Laravel API */}
          <PokemonList />
        </MiddleSection>
      </div>
    </main>
  );
}