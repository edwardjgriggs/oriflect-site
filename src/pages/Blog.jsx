import { useState } from 'react'
import { Link } from 'react-router-dom'

const posts = [
  {
    id: 1,
    featured: true,
    category: 'Strategy',
    date: 'Nov 12, 2024',
    title: 'The Architecture of Autonomous Supply Chains',
    excerpt:
      'Exploring how generative models and predictive analytics are restructuring global logistics from the ground up. A roadmap for the next decade of automation.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABOKj-SiHUSn99qRrBlF_e6uhTw1fI4jvp1bv1YQpATqp9CBidkws4Do-dnI5MQ8_Uzlc3QXX4dYhGJnIjG0PghNeVXp9f1sctdhe4lfp-2fWPtAaCuD-gfLGNaJ6fGbiFf3rxcIcItrLtroNUShj2bNq_bZDZF2zd3y-qtJdQdE4OTMQZFAoNb5a7_jWPVYAzmnPwoeBtHe1SrcI9kIUhQscH5MhC92hrBD-vAUAXYWSjhaBQhW8ExAJjj44pu83kXqutW4VVhWw1',
  },
  {
    id: 2,
    featured: false,
    category: 'Implementation',
    date: 'Oct 28, 2024',
    title: 'Beyond the Hype: Practical LLM Deployment for SMBs',
    excerpt:
      'A critical look at the operational costs and security considerations of deploying large language models in private infrastructure.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhgTXAKDOu4spmWGLoB_GO1jFCG2Cf2VxaDdeujkvky5Fs9fUI0ryTP7oHMD7wPkc0qzr4BYUzSPV-U78oDaio44hOC3uPquiKkBm3NG9h9QYeFUSu8YDrXe9yGmiA0paa8nqad5Chy96v4UyeAQ0_cYtEfhQ49Ay4c7k8_D9-1uRnlzowjsOcugjshssI9LUkMPCkMti2YDbvGnT94iXeCI6WtbTsGm0aPDf0S2zLw7w2RfKDl8m8g7n5KUbHjmD_mVC5N46gX1p',
  },
  {
    id: 3,
    featured: false,
    category: 'Security',
    date: 'Oct 14, 2024',
    title: 'The Ethics of Algorithmic Transparency',
    excerpt:
      'Navigating the regulatory landscape of EU AI Act and ensuring your proprietary models remain compliant without losing competitive edge.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyfqIKMRY3VO5QJfaCpUCYHaJMDRHQi4xI4rl05qyfDriOJUEXAg5CKxHWZjbMgBCpwZZWIJLnQ_28KQ8x4S_ZbUuN8W53YSFEDAWPHzUv4NB7Ty_2csFWh3TRDs_mFBCuIwFUIgOy6D8NkQsPbvMnXi5sBNHjCX1WJhoHmvUIPYY19q2vDZbwymJkh9W6sHa51YJANU9DDAETqxHKyDA6wOMkcRDhYtFxA9HqZcV3m_uN0FFKpK-7UZvXAZf4fX8Amx0x41AR1blO',
  },
  {
    id: 4,
    featured: false,
    category: 'Audit',
    date: 'Sep 30, 2024',
    title: 'Data Hygiene: The Foundation of AI Success',
    excerpt:
      'Why 90% of AI projects fail due to poor data pipeline architecture and how to build a resilient data culture in your organization.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9x4tn2q-RZvEZUwD2ooRzDFnf565GRCXjbruOZIDT0sgC0uju4ZTwaqTDBJsCsVCw1UweSGRliG1dZ6JXFwwGLQ6mjF4_ENmEfLaokNxbzGbbjTUMwW_Dr8rWVqTIMJ9xT8s_xTZ63hBEhc8jktT3smkxTFE-2AUBelMeZICWpJ8NfTWqgVKsXfBy020cSwb8JojIQb4p0-UW715tvRbqOCNqs6aZm7ti8LKqqFG_ZwTCisEy55n0QV0FpFbawSMSqb_G4cmeGxOh',
  },
  {
    id: 5,
    featured: false,
    category: 'Strategy',
    date: 'Sep 15, 2024',
    title: 'Building Your AI-First Culture Before the Tools Arrive',
    excerpt:
      'Technology adoption fails when culture lags behind. Here\'s how to prepare your team for an AI-integrated future before the first model goes live.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABOKj-SiHUSn99qRrBlF_e6uhTw1fI4jvp1bv1YQpATqp9CBidkws4Do-dnI5MQ8_Uzlc3QXX4dYhGJnIjG0PghNeVXp9f1sctdhe4lfp-2fWPtAaCuD-gfLGNaJ6fGbiFf3rxcIcItrLtroNUShj2bNq_bZDZF2zd3y-qtJdQdE4OTMQZFAoNb5a7_jWPVYAzmnPwoeBtHe1SrcI9kIUhQscH5MhC92hrBD-vAUAXYWSjhaBQhW8ExAJjj44pu83kXqutW4VVhWw1',
  },
  {
    id: 6,
    featured: false,
    category: 'Implementation',
    date: 'Aug 28, 2024',
    title: 'RAG vs Fine-Tuning: Choosing the Right Approach for Your Data',
    excerpt:
      'A practical decision framework for SMBs trying to understand when to use retrieval-augmented generation versus fine-tuning a base model.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhgTXAKDOu4spmWGLoB_GO1jFCG2Cf2VxaDdeujkvky5Fs9fUI0ryTP7oHMD7wPkc0qzr4BYUzSPV-U78oDaio44hOC3uPquiKkBm3NG9h9QYeFUSu8YDrXe9yGmiA0paa8nqad5Chy96v4UyeAQ0_cYtEfhQ49Ay4c7k8_D9-1uRnlzowjsOcugjshssI9LUkMPCkMti2YDbvGnT94iXeCI6WtbTsGm0aPDf0S2zLw7w2RfKDl8m8g7n5KUbHjmD_mVC5N46gX1p',
  },
]

export default function Blog() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featured = posts[0]
  const grid = posts.slice(1)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <div className="pt-[72px]">
      {/* Header */}
      <header className="pt-24 pb-16 px-8 border-b border-outline-variant/10 bg-surface">
        <div className="max-w-screen-xl mx-auto border-l-4 border-primary pl-8">
          <span className="font-label text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
            Intelligence Repository
          </span>
          <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-on-surface">
            Blog
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Practical AI insights and architectural deep-dives for the modern SMB.
            Bridging the gap between raw data and strategic advantage.
          </p>
        </div>
      </header>

      <div className="px-8 pb-24 max-w-screen-xl mx-auto">
        {/* Featured post */}
        <section className="mt-20 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-outline-variant/20 bg-surface-container-low group overflow-hidden">
            <div className="lg:col-span-7 h-[320px] lg:h-auto overflow-hidden">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </div>
            <div className="lg:col-span-5 p-10 md:p-12 flex flex-col justify-center bg-surface-container-low">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary-container text-primary font-label text-[10px] tracking-widest uppercase border border-primary/20">
                  Featured
                </span>
                <span className="font-label text-[10px] text-on-tertiary-container uppercase tracking-widest">
                  {featured.date}
                </span>
              </div>
              <h2 className="font-headline text-2xl md:text-3xl font-bold mb-6 text-on-surface group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="font-body text-on-surface-variant mb-8 leading-relaxed">
                {featured.excerpt}
              </p>
              <a
                href="#"
                className="flex items-center gap-2 font-label text-sm text-primary uppercase tracking-widest group/link"
              >
                Read full insight
                <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {grid.map((post) => (
            <article
              key={post.id}
              className="bg-surface-container-low border-b-2 border-transparent hover:border-primary transition-all duration-300 flex flex-col group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-label text-[10px] text-primary uppercase tracking-widest">
                    {post.category}
                  </span>
                  <span className="font-label text-[10px] text-on-tertiary-container uppercase tracking-widest">
                    {post.date}
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4 leading-tight text-on-surface group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant mb-8 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 font-label text-xs text-primary uppercase tracking-widest group/link"
                  >
                    Read more
                    <span className="material-symbols-outlined text-xs group-hover/link:translate-x-1 transition-transform">
                      east
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-20 flex justify-center items-center gap-8">
          <button className="opacity-30 cursor-not-allowed flex items-center gap-2 font-label text-xs uppercase tracking-[0.2em]">
            <span className="material-symbols-outlined text-sm">west</span> Prev
          </button>
          <div className="flex gap-4">
            <span className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary font-label text-xs">
              01
            </span>
            <span className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer font-label text-xs">
              02
            </span>
            <span className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer font-label text-xs">
              03
            </span>
          </div>
          <button className="hover:text-primary flex items-center gap-2 font-label text-xs uppercase tracking-[0.2em] transition-colors">
            Next <span className="material-symbols-outlined text-sm">east</span>
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <section className="bg-surface-container-lowest py-24 px-8 border-y border-outline-variant/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-on-surface">
            Subscribe to the Architect's Digest
          </h2>
          <p className="font-body text-on-surface-variant mb-10 max-w-xl mx-auto leading-relaxed">
            Bi-weekly technical summaries of AI advancements and their specific impact on
            enterprise strategy. No fluff, just architecture.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-3 text-primary font-label uppercase tracking-widest text-sm">
              <span className="material-symbols-outlined">check_circle</span>
              You're on the list. See you in the digest.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-0 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Corporate email address"
                className="flex-grow bg-surface border border-outline-variant/30 text-on-surface focus:border-primary focus:ring-0 px-6 py-4 font-body outline-none placeholder:text-on-surface-variant/40"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary px-8 py-4 font-label font-bold uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
