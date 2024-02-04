import { Slider } from './components'
import { useMovies } from './hooks/useMovies'

function App() {
  const [popular, { loading, error }] = useMovies()
  const [top, { loading: topLoading, error: errorTop }] = useMovies('top')
  const [upcoming, { loading: upcomingLoading, error: errorUpcoming }] =
    useMovies('upcoming')

  if (error || errorTop || errorUpcoming) {
    console.error(error)
    return (
      <div className="flex h-screen flex-col items-center bg-black text-white">
        <h1>Error</h1>
        <p>something has gone wrong</p>
      </div>
    )
  }

  if (loading || topLoading || upcomingLoading) {
    return (
      <div className="flex h-screen flex-col items-center bg-black text-white">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black py-4">
      <h1 className="text-center text-4xl font-bold text-white">
        <span className="text-red-500">Netflix</span> Slider
        <div className="flex flex-col gap-8 py-8">
          <div>
            <h2 className="px-[4%] text-left">Popular</h2>
            <Slider movies={popular} />
          </div>
          <div>
            <h2 className="px-[4%] text-left">Top Rated</h2>
            <Slider movies={top} />
          </div>
          <div>
            <h2 className="px-[4%] text-left">Upcoming</h2>
            <Slider movies={upcoming} />
          </div>
        </div>
      </h1>
    </div>
  )
}

export default App
