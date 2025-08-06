/* eslint-disable @next/next/no-img-element */

export default function BgMarquee() {

    const images = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
    // add more paths
    ];

    // Shuffle array
    const shuffled = [...images].sort(() => Math.random() - 0.5);

    return(
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden p-[10px] grid grid-cols-6 auto-rows-[100px] animate-marquee">
            {shuffled.map((src, i) => {
                // Random span and margin
                const colSpan = Math.floor(Math.random() * 2) + 1; // 1 or 2
                const rowSpan = Math.floor(Math.random() * 2) + 1; // 1 or 2
                const margin = Math.floor(Math.random() * 10) + 1; // 1px - 10px

                return (
                <div
                    key={i}
                    className={`col-span-${colSpan} row-span-${rowSpan} m-[${margin}px]`}
                >
                    <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover rounded"
                    />
                </div>
                );
            })}
        </div>
  )
}