'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const { error } = await supabase.from('inquiries').insert([
      {
        name: form.name,
        email: form.email,
        country: form.country,
        message: form.message,
      },
    ])

    if (error) {
      setResult('Submission failed. Please try again later.')
    } else {
      setResult('Thank you! Your inquiry has been sent.')
      setForm({ name: '', email: '', country: '', message: '' })
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-slate-900 p-8 rounded-xl"
        >
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-slate-800"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-slate-800"
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 rounded bg-slate-800"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-slate-900 font-semibold rounded"
          >
            {loading ? 'Sending...' : 'Submit Inquiry'}
          </button>

          {result && (
            <p className="text-center text-slate-300 mt-4">
              {result}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}
