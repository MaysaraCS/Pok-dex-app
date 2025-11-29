import TopSection from '@/components/Layout/TopSection';
import MiddleSection from '@/components/Layout/MiddleSection';

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
          {/* Temporary placeholder content - will be replaced with Pokemon list */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Search Bar & Pokémon List
            </h2>
            <p className="text-gray-600 mb-8">
              This area will contain the search bar and scrollable Pokémon list.
            </p>

            {/* Simulated scrollable content to test sticky behavior */}
            <div className="space-y-4">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-100 rounded-lg border border-gray-300"
                >
                  <p className="text-gray-700">
                    Placeholder content item {i + 1} - Scroll down to see the sticky side images stay in place!
                  </p>
                </div>
              ))}
            </div>
          </div>
        </MiddleSection>
      </div>
    </main>
  );
}