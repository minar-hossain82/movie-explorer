const TVMAZE_BASE_URL = 'https://api.tvmaze.com'

async function fetchJson(url, signal, errorMessage) {
  let response

  try {
    response = await fetch(url, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error

    throw new Error(errorMessage)
  }

  if (!response.ok) {
    throw new Error(errorMessage)
  }

  try {
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') throw error

    throw new Error(errorMessage)
  }
}

async function getShows(signal) {
  return fetchJson(`${TVMAZE_BASE_URL}/shows`, signal, 'Unable to load shows. Please try again.')
}

async function searchShows(query, signal) {
  const searchParams = new URLSearchParams({ q: query })
  return fetchJson(
    `${TVMAZE_BASE_URL}/search/shows?${searchParams}`,
    signal,
    'Unable to search shows. Please try again.',
  )
}

async function getShowById(showId, signal) {
  return fetchJson(
    `${TVMAZE_BASE_URL}/shows/${showId}`,
    signal,
    'Unable to load show details. Please try again.',
  )
}

export { TVMAZE_BASE_URL, getShows, searchShows, getShowById }
