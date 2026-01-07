import { supabaseServer } from '@/lib/supabaseServer'

import Link from 'next/link'

export const metadata = {
  title: 'Blog | Vethy Parking Air Conditioner',
  description: 'Industry insights and guides about parking air conditioners.',
}

export default async function BlogListPage() {
  const { data: blogs } = await supabase
    .from('blogs')
    .select('id, title, slug, cover_image, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <h1>Blog</h1>

      {blogs?.map((blog) => (
        <div key={blog.id} style={{ marginTop: 40 }}>
          {blog.cover_image && (
            <img
              src={blog.cover_image}
              alt={blog.title}
              style={{ width: '100%', maxHeight: 360, objectFit: 'cover' }}
            />
          )}

          <h2 style={{ marginTop: 16 }}>
            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  )
}
