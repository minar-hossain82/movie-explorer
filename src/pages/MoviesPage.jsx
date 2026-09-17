import { useEffect, useState } from 'react'
import { FaExclamationTriangle, FaSearch } from 'react-icons/fa'
import { HiOutlineFilm, HiPlus, HiRefresh } from 'react-icons/hi'
import MovieCard from '../components/movies/MovieCard'
import MovieModal from '../components/movies/MovieModal'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { getShows, searchShows } from '../services/tvmaze'

const SHOWS_PER_PAGE = 12

function MoviesPage() {
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryKey, setRetryKey] = useState(0)
  const [visibleCount, setVisibleCount] = useState(SHOWS_PER_PAGE)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [searchRetryKey, setSearchRetryKey] = useState(0)
  const [selectedShow, setSelectedShow] = useState(null)
  const visibleShows = shows.slice(0, visibleCount)
  const hasMoreShows = visibleCount < shows.length
  const isSearchMode = searchTerm.trim().length > 0

  useEffect(() => {
    const controller = new AbortController()

    async function loadShows() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getShows(controller.signal)
        setShows(Array.isArray(data) ? data : [])
        setVisibleCount(SHOWS_PER_PAGE)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load shows. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadShows()

    return () => controller.abort()
  }, [retryKey])

  useEffect(() => {
    const query = searchTerm.trim()

    if (!query) {
      setSearchResults([])
      setSearchError('')
      setIsSearching(false)
      return undefined
    }

    const controller = new AbortController()
    setIsSearching(true)
    setSearchError('')
    setSearchResults([])

    const debounceTimer = window.setTimeout(async () => {
      try {
        const data = await searchShows(query, controller.signal)
        const results = Array.isArray(data)
          ? data.map((result) => result.show).filter(Boolean)
          : []
        setSearchResults(results)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setSearchError(fetchError.message || 'Unable to search shows. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) setIsSearching(false)
      }
    }, 400)

    return () => {
      window.clearTimeout(debounceTimer)
      controller.abort()
    }
  }, [searchTerm, searchRetryKey])

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_35%),linear-gradient(135deg,#0f172a,#020617)]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Browse the collection
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Explore Movies</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Discover television shows and find something new to watch tonight.
            </p>

            <div className="relative mt-8 max-w-2xl">
              <FaSearch
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search movies by title..."
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-4 pr-4 pl-11 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                aria-label="Search movies by title"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
          {!isSearchMode && isLoading && (
            <div className="flex min-h-72 flex-col items-center justify-center gap-4 text-slate-400">
              <span className="size-10 animate-spin rounded-full border-4 border-slate-700 border-t-amber-400" />
              <p>Loading shows...</p>
            </div>
          )}

          {!isSearchMode && !isLoading && error && (
            <div className="mx-auto flex min-h-72 max-w-lg flex-col items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center">
              <FaExclamationTriangle className="size-9 text-red-300" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-white">Something went wrong</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{error}</p>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                onClick={() => setRetryKey((current) => current + 1)}
              >
                <HiRefresh className="size-5" aria-hidden="true" />
                Try again
              </button>
            </div>
          )}

          {!isSearchMode && !isLoading && !error && shows.length === 0 && (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center">
              <HiOutlineFilm className="size-12 text-slate-600" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">No shows available</h2>
              <p className="mt-2 text-sm text-slate-400">Please check back again shortly.</p>
            </div>
          )}

          {!isSearchMode && !isLoading && !error && shows.length > 0 && (
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleShows.map((show) => (
                  <MovieCard key={show.id} show={show} onViewDetails={setSelectedShow} />
                ))}
              </div>

              {hasMoreShows && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/15 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                    onClick={() => setVisibleCount((current) => current + SHOWS_PER_PAGE)}
                  >
                    <HiPlus className="size-5" aria-hidden="true" />
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}

          {isSearchMode && isSearching && (
            <div className="flex min-h-72 flex-col items-center justify-center gap-4 text-slate-400">
              <span className="size-10 animate-spin rounded-full border-4 border-slate-700 border-t-amber-400" />
              <p>Searching for &quot;{searchTerm.trim()}&quot;...</p>
            </div>
          )}

          {isSearchMode && !isSearching && searchError && (
            <div className="mx-auto flex min-h-72 max-w-lg flex-col items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center">
              <FaExclamationTriangle className="size-9 text-red-300" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-white">Search unavailable</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{searchError}</p>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                onClick={() => setSearchRetryKey((current) => current + 1)}
              >
                <HiRefresh className="size-5" aria-hidden="true" />
                Try again
              </button>
            </div>
          )}

          {isSearchMode && !isSearching && !searchError && searchResults.length === 0 && (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center">
              <HiOutlineFilm className="size-12 text-slate-600" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">No shows found</h2>
              <p className="mt-2 text-sm text-slate-400">
                Try a different title or check the spelling.
              </p>
            </div>
          )}

          {isSearchMode && !isSearching && !searchError && searchResults.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.map((show) => (
                <MovieCard key={show.id} show={show} onViewDetails={setSelectedShow} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {selectedShow && <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />}
    </div>
  )
}

export default MoviesPage
