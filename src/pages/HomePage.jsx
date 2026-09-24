import { FaArrowRight, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />

      <main className="relative flex flex-1 items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(245,158,11,0.18),transparent_24%),radial-gradient(circle_at_15%_75%,rgba(30,64,175,0.26),transparent_32%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#111827_100%)]" />
        <div className="absolute -right-24 top-16 size-96 rounded-full border border-amber-300/10 bg-amber-400/5 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 size-80 rounded-full border border-blue-300/10 bg-blue-500/10 blur-3xl" />

        <section className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200">
              <FaPlay className="size-3" aria-hidden="true" />
              Your next great watch starts here
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              Discover Your Next Favorite Movie
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Browse remarkable stories, unforgettable characters, and shows worth
              talking about. MovieExplorer makes finding your next watch feel cinematic.
            </p>
            <Link
              to="/movies"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-amber-400/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Explore Movies
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

// aaaaaaaaaaaaa
