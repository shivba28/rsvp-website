/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1220px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

export default function Card() {

  const [Open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <div className={`card  mx-5 my-auto relative ${Open ? 'open' : ''} ${isMobile ? 'mobile h-[400px] w-[400px]' : 'w-[600px] h-[600px]'}`}>
        <div className='left-card w-[100%] h-[100%] relative text-white p-[20%] z-1 shadow-lg cursor-pointer' onClick={() => setOpen(prev => !prev)}>
          <div className='card-front absolute w-[90%] h-[90%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 backface-hidden text-center p-10 content-center border-2'>
            <p className="mb-8">You Are Invited to</p>
            <h1 className='mb-2 head text-4xl xl:text-7xl'>Prashant Pawar's</h1>
            <img alt="front-img" className='w-[60%] mx-auto' src='party2.png'/>
            <p className='mb-2 text-1xl xl:text-3xl'>60th Birthday Party</p>
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
            <div className="p-8 w-[100%] max-w-md relative mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <input type="text" name="name" placeholder="Your Name" className="text-white mb-5 p-2 border-b-2 border-white" required autoComplete="true"/>
                  <input type="number" name="guests" placeholder="# of Guests" className="text-white mb-2 p-2 border-b-2 border-white" required autoComplete="true"/>
                  <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded cursor-pointer">Submit</button>
                  
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new URLSearchParams();
    data.append("name", form.name.value);
    data.append("guests", form.guests.value);

    try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxfZWh7H7QhduR2v18xGo2qBpIDOUPecSuLOct7EmoLFJ3hakW_UPZNHo3huSsYjLstCw/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString()
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    alert("Thanks for RSVPing!");

    } catch (err) {
      console.error("RSVP failed:", err);
      alert("Something went wrong. Please try again.");
    }
    form.reset();
  }
}
