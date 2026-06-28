import axios from 'axios'

const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send'

export interface ContactPayload {
  name: string
  email: string
  company: string
  project: string
  stage: string
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  await axios.post(
    EMAILJS_URL,
    {
      service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: payload.name,
        from_email: payload.email,
        company: payload.company || 'Not provided',
        project: payload.project,
        stage: payload.stage || 'Not specified',
      },
    },
    { headers: { 'Content-Type': 'application/json' } },
  )
}
