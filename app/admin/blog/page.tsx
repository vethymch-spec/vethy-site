import { supabaseServer } from '@/lib/supabaseServer'
import Link from 'next/link'

export default async function AdminBlogPage() {
  const { data: blogs } = await supabaseServer
    .from('blogs')
    .select('id, title, slug, published, created_at')
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: 40 }}>
      <h1>Blog Management</h1>

      <div style={{ margin: '20px 0' }}>
        <Link href="/admin/blog/new">
          ➕ Create New Blog
        </Link>
      </div>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: 20,
        }}
      >
        <thead>
          <tr>
            <th align="left">Title</th>
            <th>Status</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td align="center">
                {blog.published ? '✅ Published' : '📝 Draft'}
              </td>
              <td>{blog.slug}</td>
              <td>
                <Link href={`/admin/blog/edit/${blog.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
