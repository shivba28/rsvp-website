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

// Multi-date picker component
function DatePicker({ selectedDates = [], onDateChange, availableDates = [] }) {
  const handleDateToggle = (date) => {
    // Ensure selectedDates is always an array
    const currentDates = Array.isArray(selectedDates) ? selectedDates : [];
    const isSelected = currentDates.includes(date);
    
    if (isSelected) {
      onDateChange(currentDates.filter(d => d !== date));
    } else {
      onDateChange([...currentDates, date]);
    }
  };

  return (
    <div className="mb-4">
      <p className="text-white mb-2 text-sm">Select Available Dates:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {availableDates.map((date) => {
          const currentDates = Array.isArray(selectedDates) ? selectedDates : [];
          const isSelected = currentDates.includes(date);
          
          return (
            <button
              key={date}
              type="button"
              onClick={() => handleDateToggle(date)}
              className={`px-3 py-1 text-xs rounded border transition-colors ${
                isSelected
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              {new Date(date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </button>
          );
        })}
      </div>
      {selectedDates && selectedDates.length > 0 && (
        <p className="text-xs text-gray-300 mt-1">
          Selected: {selectedDates.length} date{selectedDates.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

export default function Card() {
  const [Open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  // Define available dates (customize these as needed)
  const availableDates = [
    '2025-09-23',
    '2025-09-24',
    '2025-09-25',
    '2025-09-26',
    '2025-09-27',
    '2025-09-28',
    '2025-09-29'
  ];

  const [form, setForm] = useState({
    name: "",
    guests: "",
    selectedDates: []
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one date is selected
    if (!form.selectedDates || form.selectedDates.length === 0) {
      setMessage("❌ Please select at least one date.");
      return;
    }

    setMessage("Submitting...");

    try {
      // Direct submission to Google Apps Script (bypass Next.js API route for GitHub Pages)
      const scriptURL = "https://script.google.com/macros/s/AKfycby4lyRxl58jx0B5iDBNVvV64UFdXHLWhOLDvQS-Fzqki3vATGIYUOCJE9xyyj9FIjzn/exec";
      
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("guests", form.guests.toString());
      
      // Format dates for Google Sheets
      const formattedDates = form.selectedDates
        .map(date => new Date(date).toLocaleDateString('en-US', { 
          weekday: 'short',
          month: 'short', 
          day: 'numeric' 
        }))
        .join(', ');
      formData.append("selectedDates", formattedDates);
      formData.append("datesCount", form.selectedDates.length.toString());

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
        redirect: "follow",
        mode: 'cors',
      });

      if (response.ok) {
        setMessage(`✅ RSVP saved! Thank you, ${form.name}.`);
        setForm({ name: "", guests: "", selectedDates: [] });
      } else {
        setMessage("❌ Failed to save RSVP. Please try again.");
      }
    } catch (err) {
      setMessage("❌ Network error. Please try again.");
      console.error('Submit error:', err);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen transition-all bg-gray-500 ${Open && isMobile ? 'min-height-class':''}`}>
      <div className={`card  mx-5 my-auto relative ${Open ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
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
          className='card-back absolute w-[90%] h-[90%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 backface-hidden text-center p-10 border-2 content-center'>
            {/* optional text goes here */}
            {/* <img alt="back-img" src='party2.png' className='w-100'/> */}
            <p className="text-xl md:text-3xl mb-4 block xl:hidden">Join us for the Celebration 🎉</p>
            <a className='hover:underline block xl:hidden' href="https://maps.app.goo.gl/8UuCaXpSKLkKLJrQA" target='_blank'><p className="mb-2">📍 Location: Prashu, Plot No. 56, Parvatidevi Society, Kolhapur</p></a>
          </motion.div>
        </div>
        <div className='right-card w-[100%] h-[100%] text-center shadow-xl text-white absolute top-0 left-0 content-center z-0'>
          <div className='border-2 w-[90%] h-[90%] content-center relative mx-auto'>
            <p className="text-xl md:text-3xl mb-4 hidden xl:block">Join us for the Celebration 🎉</p>
            <a className='hover:underline hidden xl:block' href="https://maps.app.goo.gl/8UuCaXpSKLkKLJrQA" target='_blank'><p className="mb-2">📍 Location: Prashu, Plot No. 56, Parvatidevi Society, Kolhapur</p></a>
            <div className="p-8 w-[100%] max-w-md relative mx-auto">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    className="text-white mb-5 p-2 border-b-2 border-white bg-transparent placeholder-gray-300" 
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    autoComplete="name" 
                    required
                  />
                  <input 
                    type="number" 
                    name="guests" 
                    placeholder="# of Guests" 
                    className="text-white mb-4 p-2 border-b-2 border-white bg-transparent placeholder-gray-300" 
                    value={form.guests} 
                    onChange={(e) => setForm({ ...form, guests: e.target.value })} 
                    autoComplete="off" 
                    required
                  />
                  
                  <DatePicker
                    selectedDates={form.selectedDates}
                    onDateChange={(dates) => setForm({ ...form, selectedDates: dates })}
                    availableDates={availableDates}
                  />
                  
                  <button 
                    type="submit" 
                    className="mt-4 px-4 py-2 bg-black text-white rounded cursor-pointer hover:bg-gray-800 transition-colors"
                  >
                    Submit RSVP
                  </button>
                </form>
                <p style={{ color: "white", marginTop: "10px", fontSize: "14px" }}>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}