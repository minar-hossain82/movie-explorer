const TVMAZE_BASE_URL = 'https://api.tvmaze.com'

async function getShows(signal) {
  const response = await fetch(`${TVMAZE_BASE_URL}/shows`, { signal })

  if (!response.ok) {
    throw new Error('Unable to load shows. Please try again.')
  }

  return response.json()
}

async function searchShows(query, signal) {
  const searchParams = new URLSearchParams({ q: query })
  const response = await fetch(`${TVMAZE_BASE_URL}/search/shows?${searchParams}`, { signal })

  if (!response.ok) {
    throw new Error('Unable to search shows. Please try again.')
  }

  return response.json()
}

async function getShowById(showId, signal) {
  const response = await fetch(`${TVMAZE_BASE_URL}/shows/${showId}`, { signal })

  if (!response.ok) {
    throw new Error('Unable to load show details. Please try again.')
  }

  return response.json()
}

export { TVMAZE_BASE_URL, getShows, searchShows, getShowById }
