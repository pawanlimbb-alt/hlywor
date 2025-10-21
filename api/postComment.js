export async function handler(event) {
    // Preflight (OPTIONS)
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: '',
      };
    }
  
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbx6oIoBbI643fJMOaNXP50ZgTJRdHTWLz86s4D7T5NTjacHM9A23wqUepNTqwqgnGZc/exec'; // <-- replace this
  
    if (event.httpMethod === 'POST') {
      try {
        const response = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: event.body,
        });
        const data = await response.text();
        return {
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: data,
        };
      } catch (err) {
        return {
          statusCode: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: err.message }),
        };
      }
    }
  
    if (event.httpMethod === 'GET') {
      try {
        const response = await fetch(googleScriptUrl);
        const data = await response.text();
        return {
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: data,
        };
      } catch (err) {
        return {
          statusCode: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: err.message }),
        };
      }
    }
  
    return { statusCode: 405, body: 'Method not allowed' };
  }
  