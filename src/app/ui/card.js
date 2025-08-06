/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Card() {

  const [Open, setOpen] = useState(false)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <div className={`card w-[600px] h-[600px] mx-3 my-auto relative cursor-pointer ${Open ? 'open' : ''}`} onClick={() => setOpen(prev => !prev)}>
        <div className='left-card w-[100%] h-[100%] relative text-white p-[20%] z-1 shadow-lg'>
          <div className='card-front absolute w-[90%] h-[90%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 backface-hidden text-center p-10 content-center border-2'>
            <p className="mb-8">You Are Invited to</p>
            <h1 className='mb-2 head text-6xl'>Prashant Pawar's</h1>
            <img alt="front-img" className='w-[60%] mx-auto' src='party2.png'/>
            <p className='mb-2 text-3xl'>60th Birthday Party</p>
            <p className='mb-2 absolute -bottom-9 -right-6'>Open</p>
          </div>
          
          <motion.div
          style={{  transform: 'rotateY(180deg)',
                    transformStyle: 'preserve-3d'}}
          className='card-back absolute w-[90%] h-[90%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 backface-hidden text-center p-20 border-2'>
            {/* optional text goes here */}
            <img alt="back-img" src='party2.png' className='w-100'/>
            <p className='mb-2 absolute -bottom-9 -left-6'>Close</p>
          </motion.div>
        </div>
        <div className='right-card w-[100%] h-[100%] text-center shadow-xl text-white absolute top-0 left-0 content-center z-0'>
          <div className='border-2 w-[90%] h-[90%] content-center relative mx-auto'>
            <p className="text-md md:text-lg mb-4">Join us for the Birthday Celebration 🎉</p>
            <p className="mb-2">📍 Location: 123 Celebration Lane</p>
            <p className="mb-2">📅 Date: August 25, 2025</p>
            <p className="mb-4">🕒 Time: 6:00 PM onwards</p>
            <button className="mt-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-200 hover:text-black transition">
              RSVP Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
