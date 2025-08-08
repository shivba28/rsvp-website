// app/api/rsvp/route.js (for App Router)
// OR pages/api/rsvp.js (for Pages Router)

export async function POST(request) {
  try {
    // Parse the JSON body
    const { name, guests, selectedDates } = await request.json();
    
    // Validate required fields
    if (!name || !guests || !selectedDates || selectedDates.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Name, guests, and at least one date are required' }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    const scriptURL = "https://script.google.com/macros/s/AKfycby4lyRxl58jx0B5iDBNVvV64UFdXHLWhOLDvQS-Fzqki3vATGIYUOCJE9xyyj9FIjzn/exec";
    
    // Create FormData for Google Apps Script
    const formData = new FormData();
    formData.append("name", name);
    formData.append("guests", guests.toString());
    // Send dates as a formatted string
    const formattedDates = selectedDates
      .map(date => new Date(date).toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric' 
      }))
      .join(', ');
    formData.append("selectedDates", formattedDates);
    formData.append("datesCount", selectedDates.length.toString());

    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
      redirect: "follow",
      // Add headers that help with CORS
      mode: 'cors',
    });

    // Log response details for debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const result = await response.text();
    console.log('Response body:', result);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, body: ${result}`);
    }
    
    return new Response(
      JSON.stringify({ 
        message: "RSVP saved successfully", 
        result: result 
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );

  } catch (error) {
    console.error('Error saving RSVP:', error);
    
    return new Response(
      JSON.stringify({ 
        message: "Error saving RSVP", 
        error: error.message 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}

// Handle preflight OPTIONS request for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}