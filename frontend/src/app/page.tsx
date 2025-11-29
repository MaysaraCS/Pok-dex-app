import TopSection from '@/components/Layout/TopSection';

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



  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {/* Top Section - Carousel + Static Banners */}
        <TopSection
          carouselImages={carouselImages}
          staticBanner1={staticBanner1}
          staticBanner2={staticBanner2}
        />

        {/* Temporary content */}
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Pokédex App
          </h1>
          <p className="text-gray-600">
            Top section complete! Carousel + Static Banners ✅
          </p>
        </div>
      </div>
    </main>
  );
}