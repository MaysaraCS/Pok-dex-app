// Banner section layout

'use client';

import Carousel from '@/components/Carousel';
import StaticBanner from '@/components/StaticBanner';

interface TopSectionProps {
    carouselImages: string[];
    staticBanner1: string;
    staticBanner2: string;
}

export default function TopSection({
    carouselImages,
    staticBanner1,
    staticBanner2
}: TopSectionProps) {
    return (
        <div className="w-full mb-8">

            {/* claude AI explanation >>>>
            grid: Creates a CSS Grid container
            grid-cols-1: On mobile, everything stacks (1 column)
            lg:grid-cols-3: On large screens, creates 3 columns
            gap-4: Adds spacing between grid items */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Left Side  */}
                <div className="lg:col-span-2">
                    <div className="h-[300px] md:h-[400px]">
                        <Carousel
                            images={carouselImages}
                            autoRotateInterval={3000}
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    {/* Top Static Banner */}
                    <div className="h-[145px] md:h-[192px]">
                        <StaticBanner
                            imageSrc={staticBanner1}
                            alt="Static Banner 1"
                        />
                    </div>

                    {/* Bottom Static Banner */}
                    <div className="h-[145px] md:h-[192px]">
                        <StaticBanner
                            imageSrc={staticBanner2}
                            alt="Static Banner 2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}