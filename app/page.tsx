import { supabase } from '../lib/supabaseClient'


export default async function Home() {
  let products: any[] = []
  let errorMsg = ''

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      errorMsg = error.message
    } else {
      products = data || []
    }
  } catch (err: any) {
    errorMsg = err.message || 'Unknown error'
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold leading-tight">
          R410A System Parking Air Conditioner
        </h1>
        <p className="mt-6 text-xl text-slate-300 max-w-3xl">
          High-efficiency parking air conditioning solutions powered by
          twin-rotor compressor technology, engineered for the global market.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="px-4 py-2 border border-slate-600 rounded-full text-sm">
            R410A System
          </span>
          <span className="px-4 py-2 border border-slate-600 rounded-full text-sm">
            Twin-rotor Compressor
          </span>
          <span className="px-4 py-2 border border-slate-600 rounded-full text-sm">
            Global Market
          </span>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-10">
            Parking AC Products
          </h2>

          {/* 错误兜底 */}
          {errorMsg && (
            <div className="mb-6 text-red-400">
              Data error: {errorMsg}
            </div>
          )}

          {/* 空数据兜底 */}
          {!errorMsg && products.length === 0 && (
            <div className="text-slate-400">
              No products available.
            </div>
          )}

          {/* 产品列表 */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-slate-700 rounded-xl p-6 bg-slate-950"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {product.name}
                </h3>

                <p className="text-slate-400 mb-4">
                  {product.short_desc}
                </p>

                <ul className="space-y-2 text-sm text-slate-300">
                  {product.highlights?.map(
                    (item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold">
          Looking for a Reliable Parking AC Manufacturer?
        </h2>
        <p className="mt-4 text-slate-400">
          OEM & bulk supply solutions for distributors and fleet partners.
        </p>

        <a
          href="/contact"
          className="inline-block mt-8 px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg"
        >
          Contact Us
        </a>
      </section>
    </main>
  )
}
