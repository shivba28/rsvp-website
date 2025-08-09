/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react';

export default function BgMarquee() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('images-list.json')
        .then(res => res.json())
        .then(data => {
            const repeated = Array.from({ length: 100 }, (_, i) => data[i % data.length]);
            const shuffled = repeated.sort(() => 0.5 - Math.random());
            setImages(shuffled);
        });
    }, []);

    // Tailwind-based size variation (right now only col-span-2 is used)
    function getRandomSizeClass() {
        const sizes = ['col-span-2'];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    return(
        <div className="fixed top-0 left-0 w-[120%] min-h-screen z-0 overflow-hidden inset-0 animate-marquee opacity-10 bg-white">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,2fr))] gap-[5px] p-1">
                {images.map((src, index) => {
                // Random size variation
                const sizeClass = getRandomSizeClass();

                return (
                    <div key={index} className={`overflow-hidden rounded ${sizeClass} md:hover:scale-110 transition-transform duration-500`}>
                    <img
                        src={src}
                        alt=""
                        className="w-full h-full object-auto"
                    />
                    </div>
                );
                })}
            </div>
        </div>
  )
}