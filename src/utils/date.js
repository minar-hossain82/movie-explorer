const dateFormatters = {
  short: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
  long: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
}

function formatReleaseDate(date, { fallback, format = 'short' } = {}) {
  if (!date) return fallback

  const parsedDate = new Date(`${date}T00:00:00`)

  if (Number.isNaN(parsedDate.getTime())) return date

  return (dateFormatters[format] ?? dateFormatters.short).format(parsedDate)
}

export { formatReleaseDate }
