// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "./cors.ts"
import { SmtpClient } from 'https://deno.land/x/denomailer@0.12.0/mod.ts'
const client = new SmtpClient();

console.log("Hello from Functions!")

serve(async (req) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const { to, subject, body } = await req.json()
    console.log(to, subject, body)
    const data = { message: "Email Sent" }
    fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SENDGRID_API')}`,
        'Content-Type': 'application/json'
      },
      // body: '{"personalizations": [{"to": [{"email": "test@example.com"}]}],"from": {"email": "test@example.com"},"subject": "Sending with SendGrid is Fun","content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]}',
      body: JSON.stringify({
        'personalizations': [
          {
            'to': [
              {
                'email': to
              }
            ]
          }
        ],
        'from': {
          'email': 'uconnoutingclub@gmail.com'
        },
        'subject': subject,
        'content': [
          {
            'type': 'text/plain',
            'value': body
          }
        ]
      })
    });
    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      },
    )
  } catch (error) {
    console.log(error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      }
    )
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
 //  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  // --header 'Content-Type: application/json' \
   //--data '{"name":"Functions"}'
