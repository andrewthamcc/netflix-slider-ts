import type { Movie } from './slider'

interface ContentProps {
  hasMoved: boolean
  itemsInRow: number
  lowestVisibleIndex: number
  movies: Movie[]
  totalItems: number
}

export function Content({
  hasMoved,
  itemsInRow,
  lowestVisibleIndex,
  movies,
  totalItems,
}: ContentProps) {
  const left = []
  const middle = []
  const right = []

  for (let i = 0; i < itemsInRow; i++) {
    // left
    if (hasMoved) {
      if (lowestVisibleIndex + i - itemsInRow < 0) {
        left.push(totalItems - itemsInRow + lowestVisibleIndex + i)
      } else {
        left.push(i + lowestVisibleIndex - itemsInRow) // issue here
      }
    }

    // middle
    if (i + lowestVisibleIndex >= totalItems) {
      middle.push(i + lowestVisibleIndex - totalItems)
    } else {
      middle.push(i + lowestVisibleIndex)
    }

    // right
    if (i + lowestVisibleIndex + itemsInRow >= totalItems) {
      right.push(i + lowestVisibleIndex + itemsInRow - totalItems)
    } else {
      right.push(i + lowestVisibleIndex + itemsInRow)
    }
  }

  const indexToDisplay = [...left, ...middle, ...right]

  // add on leading and trailing indexes for peek image when sliding
  if (hasMoved) {
    const trailingIndex =
      indexToDisplay[indexToDisplay.length - 1] === totalItems - 1
        ? 0
        : indexToDisplay[indexToDisplay.length - 1] + 1
    const leadingIndex =
      indexToDisplay[0] === 0 ? totalItems - 1 : indexToDisplay[0] - 1

    indexToDisplay.unshift(leadingIndex)
    indexToDisplay.push(trailingIndex)
  }

  const sliderContents = indexToDisplay.map((index) => (
    <div
      className="inline-block h-full px-1 transition-all duration-500 first-of-type:pl-0 last-of-type:pr-0 hover:scale-150"
      style={{
        width: `${100 / itemsInRow}%`,
      }}
      key={`${movies[index].id}-${index}`}
    >
      <div className="fixed bottom-4 left-4 flex flex-col items-start gap-px text-sm ">
        <p className="font-bold">{movies[index].title}</p>
        <p className="text-xs font-semibold">
          {new Date(movies[index].release_date).toLocaleDateString()}
        </p>
      </div>
      <img
        className="h-full w-full max-w-full"
        src={`http://image.tmdb.org/t/p/w780${movies[index].backdrop_path}`}
      />
    </div>
  ))

  // adds empty divs to take up appropriate spacing when slider at initial position
  if (!hasMoved) {
    for (let i = 0; i < itemsInRow; i++) {
      sliderContents.unshift(
        <div
          className="inline-block"
          style={{ width: `${100 / itemsInRow}%` }}
          key={i}
        />
      )
    }
  }

  return sliderContents
}
