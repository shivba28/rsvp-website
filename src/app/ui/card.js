/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

export default function Card({ onRSVPClick }) {

  const [Open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <div className={`card  mx-5 my-auto relative ${Open ? 'open' : ''} ${isMobile ? 'mobile h-[400px] w-[400px]' : 'w-[600px] h-[600px]'}`}>
        <div className='left-card w-[100%] h-[100%] relative text-white p-[20%] z-1 shadow-lg cursor-pointer' onClick={() => setOpen(prev => !prev)}>
          <div className='card-front absolute w-[90%] h-[90%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 backface-hidden text-center p-10 content-center border-2'>
            <p className="mb-8">You Are Invited to</p>
            <h1 className='mb-2 head text-4xl md:text-7xl'>Prashant Pawar's</h1>
            <img alt="front-img" className='w-[60%] mx-auto' src='party2.png'/>
            <p className='mb-2 text-1xl md:text-3xl'>60th Birthday Party</p>
          </div>
          
          <motion.div
          style={{  transform: isMobile ? 'rotateX(-180deg)' : 'rotateY(180deg)',
                    transformStyle: 'preserve-3d'}}
          className='card-back absolute w-[90%] h-[90%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 backface-hidden text-center p-20 border-2'>
            {/* optional text goes here */}
            {/* <img alt="back-img" src='party2.png' className='w-100'/> */}
          </motion.div>
        </div>
        <div className='right-card w-[100%] h-[100%] text-center shadow-xl text-white absolute top-0 left-0 content-center z-0'>
          <div className='border-2 w-[90%] h-[90%] content-center relative mx-auto'>
            <p className="text-xl md:text-3xl mb-4">Join us for the Celebration 🎉</p>
            <a className='hover:underline' href="https://maps.app.goo.gl/7WMr2DRmYith4hc86" target='_blank'><p className="mb-2">📍 Location: Prashu, Plot No. 56, Parvatidevi Society, Kolhapur</p></a>
            <iframe className='w-[80%] h-[40%] mx-auto my-4 hidden md:block' src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d238.87949688559405!2d74.2772809!3d16.6732826!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1754520102157!5m2!1sen!2sus" style={{border:1}} allowFullScreen={false} loading="lazy" referrerPolicy="origin"></iframe>
            <p className="mb-2">📅 Date: August 28, 2025</p>
            <p className="mb-4">🕒 Time: 6:00 PM</p>
            <button className="mt-2 px-4 py-2 border-2 bg-white text-black hover:bg-gray-400 hover:text-black transition cursor-pointer" onClick={onRSVPClick}>
              RSVP Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
