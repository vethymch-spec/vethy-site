'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BlogGeneratorPage() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function generateBlog() {
    if (!topic) {
      alert('Please enter a blog topic')
      return
    }

    setLoading(true)
    setMessage('')

    const res = await fetch('/api/generate-blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    })

    const data = await res.json()

    if (data.error) {
      setMessage('❌ Failed to generate blog')
    } else {
      setMessage('✅ Blog generated and saved as draft')
      setTopic('')
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: 40, maxWidth: 700 }}>
      <h1>AI Blog Generator</h1>

      <p>Enter one blog topic. Do NOT write the article yourself.</p>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="How to choose a parking air conditioner for long-haul trucks"
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          marginTop: 12,
        }}
      />

      <button
        onClick={generateBlog}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: '12px 24px',
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        {loading ? 'Generating…' : 'Generate Blog'}
      </button>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  )
}
