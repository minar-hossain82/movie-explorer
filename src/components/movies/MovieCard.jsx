import { useState } from 'react'
import { FaCalendarAlt, FaRegStar } from 'react-icons/fa'
import { HiOutlinePhotograph } from 'react-icons/hi'

function formatReleaseDate(date) {
  if (!date) return 'Release date unavailable'

  const formattedDate = new Date(`${date}T00:00:00`)

  if (Number.isNaN(formattedDate.getTime())) return date

  return formattedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function MovieCard({ show, onViewDetails }) {
  const [posterFailed, setPosterFailed] = useState(false)
  const posterUrl = show.image?.medium || show.image?.original
  const hasPoster = posterUrl && !posterFailed
  const rating = show.rating?.average

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:shadow-amber-950/30">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        {hasPoster ? (
          <img
            src={posterUrl}
            alt={`${show.name} poster`}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setPosterFailed(true)}
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-800 to-slate-950 px-6 text-center text-slate-400">
            <HiOutlinePhotograph className="size-12 text-slate-600" aria-hidden="true" />
            <span className="text-sm font-medium">Poster unavailable</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 to-transparent" />
      </div>

      <div className="p-5">
        <h2 className="truncate text-lg font-bold text-white" title={show.name}>
          {show.name || 'Untitled show'}
        </h2>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <span className="flex min-w-0 items-center gap-2 text-slate-400">
            <FaCalendarAlt className="shrink-0 text-amber-400" aria-hidden="true" />
            <span className="truncate">{formatReleaseDate(show.premiered)}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 font-semibold text-amber-300">
            <FaRegStar aria-hidden="true" />
            {rating ?? 'N/A'}
          </span>
        </div>
        <button
          type="button"
          className="mt-5 w-full rounded-lg border border-amber-300/40 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-400 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          onClick={() => onViewDetails(show)}
        >
          See Details
        </button>
      </div>
    </article>
  )
}

export default MovieCard
