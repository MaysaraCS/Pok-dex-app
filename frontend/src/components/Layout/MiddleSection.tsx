'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface MiddleSectionProps {
    leftImage: string;
    rightImage: string;
    children: ReactNode; //  Pokemon list in the center
}

export default function MiddleSection({
    leftImage,
    rightImage,
    children
}: MiddleSectionProps) {
    return (
        <div className="w-full">
            {/* Creates a 12-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Static Image - Takes 2 columns */}
                <div className="hidden lg:block lg:col-span-2">
                    {/* stick when scrolling */}
                    <div className="sticky top-4">
                        <div className="relative w-full h-[600px] bg-gray-200 rounded-lg overflow-hidden">
                            <Image
                                src={leftImage}
                                alt="Left decoration"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Center Content Area - Takes 7 columns  */}
                <div className="col-span-1 lg:col-span-7">
                    {children}
                </div>

                {/* Right Static Image - Takes 3 columns  */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-4">
                        <div className="relative w-full h-[600px] bg-gray-200 rounded-lg overflow-hidden">
                            <Image
                                src={rightImage}
                                alt="Right decoration"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}