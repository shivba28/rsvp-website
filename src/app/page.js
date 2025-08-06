'use client'
import Card from "@/app/ui/card";
import Background from "@/app/ui/bgMarquee";

import { useState } from "react";

export default function HomePage() {

  const [isModalOpen, setModalOpen] = useState(false)

  return(
    <main>
      <Background />
      <Card onRSVPClick={() => setModalOpen(true)}/>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl w-[90%] max-w-md relative">
                <h2 className="text-xl font-bold mb-4 text-black">RSVP Form</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <input type="text" name="name" placeholder="Your Name" className="input text-black mb-5 p-2" required autoComplete="true"/>
                  <input type="number" name="guests" placeholder="# of Guests" className="input text-black mb-2 p-2" required autoComplete="true"/>
                  <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded cursor-pointer">Submit</button>
                  
                </form>
                <button onClick={() => setModalOpen(false)} className="absolute top-2 right-4 text-xl text-black cursor-pointer">✕</button></div>
            </div>
        )}
    </main>
  )

   async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = {
      name: form.name.value,
      guests: form.guests.value
    }

    // Send to Google Sheets (via Google Apps Script)
    await fetch('https://script.google.com/macros/s/AKfycbwQvwfq_9twNmL9GkOuP4pzq95znsxF6L400_5-dkrRfj0OYSFAsK0FbtqrRuan8OXQ/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })

    // Optional: Send email via EmailJS
    // await emailjs.send('service_id', 'template_id', data, 'user_id')

    alert("Thanks for RSVPing!")
    setModalOpen(false)
  }
}
