import { useEffect, useId, useRef, useState } from 'react'
import { FaCalendarAlt, FaExternalLinkAlt, FaGlobe, FaRegClock, FaRegStar } from 'react-icons/fa'
import { HiOutlinePhotograph, HiX } from 'react-icons/hi'
import { getShowById } from '../../services/tvmaze'
import { formatReleaseDate } from '../../utils/date'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function cleanSummary(summary) {
  if (!summary) return 'No summary is available for this show.'

  return summary.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function getSafeExternalUrl(url) {
  try {
    const parsedUrl = new URL(url)

    return ['http:', 'https:'].includes(parsedUrl.protocol) ? parsedUrl.href : null
  } catch {
    return null
  }
}

function MovieModal({ show, onClose }) {
  const [showDetails, setShowDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [hasPosterLoadError, setHasPosterLoadError] = useState(false)
  const dialogRef = useRef(null)
  const previouslyFocusedElementRef = useRef(null)
  const dialogTitleId = useId()

  useEffect(() => {
    const controller = new AbortController()
    const previousOverflow = document.body.style.overflow

    previouslyFocusedElementRef.current = document.activeElement

    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      const focusableElements = dialog?.querySelectorAll(FOCUSABLE_SELECTOR)

      if (!dialog || !focusableElements?.length) {
        event.preventDefault()
        dialog?.focus()
        return
      }

      const firstFocusableElement = focusableElements[0]
      const lastFocusableElement = focusableElements[focusableElements.length - 1]

      if (
        event.shiftKey &&
        (document.activeElement === firstFocusableElement || !dialog.contains(document.activeElement))
      ) {
        event.preventDefault()
        lastFocusableElement.focus()
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastFocusableElement || !dialog.contains(document.activeElement))
      ) {
        event.preventDefault()
        firstFocusableElement.focus()
      }
    }

    async function loadDetails() {
      setIsLoading(true)
      setError('')
      setHasPosterLoadError(false)

      try {
        const data = await getShowById(show.id, controller.signal)
        setShowDetails(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load show details. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadDetails()
    window.addEventListener('keydown', handleKeyDown)
    const focusTimer = window.requestAnimationFrame(() => dialogRef.current?.focus())

    return () => {
      controller.abort()
      window.removeEventListener('keydown', handleKeyDown)
      window.cancelAnimationFrame(focusTimer)
      document.body.style.overflow = previousOverflow

      if (previouslyFocusedElementRef.current instanceof HTMLElement) {
        previouslyFocusedElementRef.current.focus()
      }
    }
  }, [show.id, onClose])

  const displayedShow = showDetails || show
  const posterUrl = displayedShow.image?.original || displayedShow.image?.medium
  const hasPoster = posterUrl && !hasPosterLoadError
  const runtime = displayedShow.runtime ?? displayedShow.averageRuntime
  const officialSiteUrl = getSafeExternalUrl(displayedShow.officialSite)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/60"
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
          <p
            id={dialogTitleId}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300"
          >
            Show details
          </p>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            aria-label="Close show details"
            onClick={onClose}
          >
            <HiX className="size-6" aria-hidden="true" />
          </button>
        </div>

        {isLoading && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 text-slate-400">
            <span className="size-10 animate-spin rounded-full border-4 border-slate-700 border-t-amber-400" />
            <p>Loading show details...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
            <h2 className="text-xl font-bold text-white">Details unavailable</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{error}</p>
            <button
              type="button"
              className="mt-6 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="overflow-y-auto p-5 sm:p-7">
            <div className="grid gap-7 md:grid-cols-[220px_1fr]">
              <div className="mx-auto w-full max-w-[280px] md:mx-0">
                <div className="aspect-[2/3] overflow-hidden rounded-xl bg-slate-800 shadow-lg shadow-black/30">
                  {hasPoster ? (
                    <img
                      src={posterUrl}
                      alt={`${displayedShow.name} poster`}
                      className="size-full object-cover"
                      onError={() => setHasPosterLoadError(true)}
                    />
                  ) : (
                    <div className="flex size-full flex-col items-center justify-center gap-3 px-6 text-center text-slate-400">
                      <HiOutlinePhotograph className="size-12 text-slate-600" aria-hidden="true" />
                      <span className="text-sm font-medium">Poster unavailable</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {displayedShow.name || 'Untitled show'}
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <FaRegStar className="text-amber-400" aria-hidden="true" />
                    <span>Rating: {displayedShow.rating?.average ?? 'Not rated'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-amber-400" aria-hidden="true" />
                    <span>
                      Premiered:{' '}
                      {formatReleaseDate(displayedShow.premiered, {
                        fallback: 'Not available',
                        format: 'long',
                      })}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaRegClock className="text-amber-400" aria-hidden="true" />
                    <span>Runtime: {runtime ? `${runtime} min` : 'Not available'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaGlobe className="text-amber-400" aria-hidden="true" />
                    <span>Language: {displayedShow.language || 'Not available'}</span>
                  </p>
                  <p className="sm:col-span-2">Status: {displayedShow.status || 'Not available'}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Genres</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {displayedShow.genres?.length ? (
                      displayedShow.genres.map((genre) => (
                        <span key={genre} className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
                          {genre}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-400">Not specified</span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Overview</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">
                    {cleanSummary(displayedShow.summary)}
                  </p>
                </div>

                {officialSiteUrl && (
                  <a
                    href={officialSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-lg border border-amber-300/40 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-400 hover:text-slate-950"
                  >
                    Official website
                    <FaExternalLinkAlt className="size-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5 text-right">
              <button
                type="button"
                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default MovieModal
