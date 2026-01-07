import Link from 'next/link'

export default function AdminHome() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      <ul style={{ marginTop: 30, lineHeight: 2 }}>
        <li>
          <Link href="/admin/blog">📝 Blog Generator</Link>
        </li>
        <li>
          <Link href="/admin/media">🖼️ Media Library</Link>
        </li>
        <li>
          <Link href="/admin/content">📄 Page Content</Link>
        </li>
        <li>
          <Link href="/admin/inquiries">📩 Inquiries</Link>
        </li>
      </ul>
    </div>
  )
}
