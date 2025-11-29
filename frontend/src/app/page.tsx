import Carousel from '@/components/Carousel';

export default function Home() {

  // carouselImages - batman banners
  const carouselImages = [
    '/images/banners/carousel-1.jpg',
    '/images/banners/carousel-2.jpg',
    '/images/banners/carousel-3.jpg',
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {/* Top Section - Carousel Banner */}
        <div className="mb-8">
          <div className="h-[400px] w-full">
            <Carousel images={carouselImages} autoRotateInterval={3000} />
          </div>
        </div>

        {/* Temporary content */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Pokédex App
          </h1>
          <p className="text-gray-600">
            Carousel is working! More components coming soon...
          </p>
        </div>
      </div>
    </main>
  );
}