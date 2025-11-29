// Static banner component

'use client';

import Image from 'next/image';

interface StaticBannerProps {
    imageSrc: string;
    alt: string;
    className?: string;
}

export default function StaticBanner({
    imageSrc,
    alt,
    className = ''
}: StaticBannerProps) {
    return (
        <div className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}>
            <Image
                src={imageSrc}
                alt={alt}
                fill
                className="object-cover"
                priority
            />
        </div>
    );
}