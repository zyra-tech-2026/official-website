# Contact form with EmailJS

This document describes the exact EmailJS schema and submission approach used by this app so it can be reproduced in another Vite + React + TypeScript app.

## How it works

The browser sends a JSON request directly to the EmailJS REST API:

```text
React form
  -> TanStack Query mutation
  -> Axios POST to EmailJS
  -> EmailJS service + template
  -> destination inbox
```

The implementation does **not** use `@emailjs/browser` and does not require a custom backend. Axios calls `https://api.emailjs.com/api/v1.0/email/send` directly. TanStack Query supplies the pending/success/error lifecycle, and Sonner displays the result to the user.

## Exact data schema

The form state uses this TypeScript shape:

```ts
export interface ContactPayload {
  name: string
  email: string
  company: string
  project: string
  stage: string
}
```

The fields map to EmailJS template variables as follows:

| Form field | EmailJS variable | Required in the form | Value sent when empty |
|---|---|---:|---|
| `name` | `{{from_name}}` | Yes | N/A |
| `email` | `{{from_email}}` | Yes | N/A |
| `company` | `{{company}}` | No | `Not provided` |
| `project` | `{{project}}` | Yes | N/A |
| `stage` | `{{stage}}` | No | `Not specified` |

The current stage choices are:

```ts
const stages = ['Just an idea', 'Pre-launch', 'Post-launch', 'Scaling']
```

Keep the variable names exactly the same in the form adapter and the EmailJS template. The form's HTML `name` attributes are useful for semantics, but EmailJS receives `template_params`, not the HTML form itself.

## 1. Configure EmailJS

In the EmailJS dashboard:

1. Add an email service and copy its **Service ID**.
2. Create an email template and copy its **Template ID**.
3. Copy the account's **Public Key**.
4. Configure the template's destination address to the inbox that should receive contact requests.
5. Set the template's reply-to address to `{{from_email}}`. This makes the email client's Reply button address the person who submitted the form.

A template using the exact schema can look like this:

```text
Subject: New project inquiry from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Company / organization: {{company}}
Stage: {{stage}}

What they are building:
{{project}}
```

The names inside `{{...}}` must match the five variables in the schema table. The destination email address should be configured in EmailJS rather than accepted from the browser.

## 2. Add environment variables

Create a local `.env` file based on `.env.example`:

```dotenv
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Add the same variables in the hosting provider's environment-variable settings, then rebuild/redeploy the app. Vite substitutes these values at build time, so changing them requires a new build.

Only use the EmailJS **public** key here. Variables prefixed with `VITE_` are included in client-side code and are not secrets. Never put an EmailJS private key or email-account password in them. Configure EmailJS domain restrictions and rate-limiting/security options for the production domain.

## 3. Install the dependencies

```bash
npm install axios @tanstack/react-query sonner
```

If the target app already has its own async-state and notification solution, only Axios is essential to reproducing the request itself.

## 4. Add the EmailJS adapter

Create `src/lib/emailjs.ts` with the same adapter used in this app:

```ts
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
```

The EmailJS REST request body has four top-level keys:

```json
{
  "service_id": "from VITE_EMAILJS_SERVICE_ID",
  "template_id": "from VITE_EMAILJS_TEMPLATE_ID",
  "user_id": "from VITE_EMAILJS_PUBLIC_KEY",
  "template_params": {
    "from_name": "Ada Lovelace",
    "from_email": "ada@example.com",
    "company": "Analytical Engines Ltd",
    "project": "A short description of the project",
    "stage": "Pre-launch"
  }
}
```

`user_id` is EmailJS's REST API field name for the public key.

## 5. Register the shared providers

TanStack Query and Sonner are registered once at the app root:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="bottom-right" richColors closeButton />
    </QueryClientProvider>
  </StrictMode>,
)
```

## 6. Connect the form

The reusable submission logic is:

```tsx
import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { sendContactEmail, type ContactPayload } from './lib/emailjs'

const emptyForm: ContactPayload = {
  name: '',
  email: '',
  company: '',
  project: '',
  stage: '',
}

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(emptyForm)

  const { mutate, isPending } = useMutation({
    mutationFn: sendContactEmail,
    onSuccess: () => {
      toast.success('Message sent!', {
        description: "We'll get back to you within 24 hours.",
      })
      setForm(emptyForm)
    },
    onError: () => {
      toast.error('Something went wrong.', {
        description: 'Please try again or email us directly.',
      })
    },
  })

  function update(field: keyof ContactPayload, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutate(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        name="name"
        value={form.name}
        onChange={(event) => update('name', event.target.value)}
      />

      <input
        required
        type="email"
        name="email"
        value={form.email}
        onChange={(event) => update('email', event.target.value)}
      />

      <input
        name="company"
        value={form.company}
        onChange={(event) => update('company', event.target.value)}
      />

      <textarea
        required
        name="project"
        value={form.project}
        onChange={(event) => update('project', event.target.value)}
      />

      {['Just an idea', 'Pre-launch', 'Post-launch', 'Scaling'].map((stage) => (
        <label key={stage}>
          <input
            type="radio"
            name="stage"
            value={stage}
            checked={form.stage === stage}
            onChange={() => update('stage', stage)}
          />
          {stage}
        </label>
      ))}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
```

The production screen additionally records a `contact_form_submit` analytics event inside `onSuccess`. That event is optional and deliberately fires only after EmailJS accepts the request.

## Validation and behavior

The current implementation relies on native browser validation:

- `name`, `email`, and `project` are required.
- `email` uses `type="email"`.
- `company` and `stage` are optional and receive readable fallback values.
- The submit button is disabled and displays `Sending...` while the request is pending.
- State resets only after a successful request, preserving the user's input if sending fails.

For a public, high-traffic form, consider adding schema validation, maximum lengths, a honeypot or CAPTCHA, and server-side proxying. A client-only EmailJS form cannot by itself provide strong abuse prevention.

## Verification checklist

1. Start the app with `npm run dev` after setting the local environment variables.
2. Submit all five fields and confirm the success toast appears.
3. Confirm the email arrives at the configured destination inbox.
4. Verify all five values render in the email and Reply targets the submitted address.
5. Submit without `company` or `stage` and verify the fallback text appears.
6. Check the browser Network panel for a successful POST to `/api/v1.0/email/send`.
7. Test the deployed production domain after adding its environment variables and EmailJS domain restriction.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Request returns `400` | A service ID, template ID, public key, or template variable is wrong | Compare the dashboard IDs and variable names with this document |
| Request returns `403` | The public key or allowed-domain configuration rejects the request | Verify the public key and add the current domain in EmailJS |
| Request succeeds but values are blank | Template variables do not match `template_params` | Use `from_name`, `from_email`, `company`, `project`, and `stage` exactly |
| Reply goes to the site owner | Reply-To is not mapped | Set Reply-To to `{{from_email}}` in the EmailJS template |
| Works locally but not after deployment | Hosting variables were not added before the build | Add all three variables and redeploy |
| Duplicate submissions are possible after completion | Only in-flight clicks are disabled | Add throttling/idempotency or stronger abuse protection if required |

## Files in this app

- `src/lib/emailjs.ts` contains the REST adapter and schema.
- `src/screens/ContactScreen.tsx` contains the controlled form and mutation lifecycle.
- `src/main.tsx` registers `QueryClientProvider` and `Toaster`.
- `.env.example` documents the required configuration keys.

