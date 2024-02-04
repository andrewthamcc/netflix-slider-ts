import { useEffect, useState } from 'react'

interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type UseMovies = [
  movies: Movie[],
  { loading: boolean; error: Error | undefined },
]

const queryType = {
  pop: 'popular',
  top: 'top_rated',
  upcoming: 'upcoming',
} as const
type UseMoviesParam = keyof typeof queryType | undefined

export function useMovies(param: UseMoviesParam = undefined): UseMovies {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  useEffect(() => {
    async function getMovies() {
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${!param ? 'popular' : queryType[param]}`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        )
        const data = await res.json()
        setMovies(data.results)
      } catch (error) {
        console.error(error)
        if (error instanceof Error) setError(error)
      } finally {
        setLoading(false)
      }
    }

    if (!movies.length) getMovies()
  }, [movies])

  return [movies, { loading, error }]
}
