import { useEffect, useState } from 'react'
import { Content } from './content'
import { Control } from './control'

export interface Movie {
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

interface SliderProps {
  movies: Movie[]
}

export function Slider({ movies }: SliderProps) {
  const [hasMoved, setHasMoved] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [movePercentage, setMovePercentage] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0)
  const [itemsInRow, setItemsInRow] = useState(5)

  useEffect(() => {
    function handleWindowResize() {
      if (window.innerWidth > 1440) {
        setItemsInRow(6)
      } else if (window.innerWidth >= 1000) {
        setItemsInRow(5)
      } else if (window.innerWidth < 1000) {
        setItemsInRow(4)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  function handleNext() {
    const totalItems = movies.length

    // get the new lowest visible index
    let newIndex: number
    if (lowestVisibleIndex === totalItems - itemsInRow) {
      newIndex = 0
    } else if (lowestVisibleIndex + itemsInRow > totalItems - itemsInRow) {
      newIndex = totalItems - itemsInRow
    } else {
      newIndex = lowestVisibleIndex + itemsInRow
    }

    // get the move percentage
    let newMovePercentage
    if (newIndex !== 0) {
      newMovePercentage = ((newIndex - lowestVisibleIndex) / itemsInRow) * 100
    } else {
      newMovePercentage = 100
    }

    setIsMoving(true)
    setDirection('right')
    setMovePercentage(newMovePercentage)

    setTimeout(() => {
      setLowestVisibleIndex(newIndex)
      setIsMoving(false)
    }, 750)

    // show the previous arrow
    if (!hasMoved) {
      setHasMoved(true)
    }
  }

  function handlePrevious() {
    const totalItems = movies.length

    // get the new lowest visible index
    let newIndex: number
    if (lowestVisibleIndex < itemsInRow && lowestVisibleIndex !== 0) {
      newIndex = 0
    } else if (lowestVisibleIndex - itemsInRow < 0) {
      newIndex = totalItems - itemsInRow
    } else {
      newIndex = lowestVisibleIndex - itemsInRow
    }

    // get the move percentage
    let newMovePercentage
    if (lowestVisibleIndex === 0) {
      newMovePercentage = 0
    } else if (lowestVisibleIndex - newIndex < itemsInRow) {
      newMovePercentage =
        ((itemsInRow - (lowestVisibleIndex - newIndex)) / itemsInRow) * 100
    } else {
      newMovePercentage = 0
    }

    setIsMoving(true)
    setDirection('left')
    setMovePercentage(newMovePercentage)

    setTimeout(() => {
      setLowestVisibleIndex(newIndex)
      setIsMoving(false)
    }, 750)
  }

  if (!movies.length) return <p>No movies...</p>

  let contentStyle: React.CSSProperties = {}
  if (isMoving) {
    let translate = ''
    if (direction === 'right') {
      translate = `translateX(-${100 + movePercentage + 100 / itemsInRow}%)`
    } else if (direction === 'left') {
      translate = `translateX(-${movePercentage + 100 / itemsInRow}%)`
    }

    contentStyle = {
      transform: translate,
      transitionDuration: '750ms',
    }
  } else {
    contentStyle = {
      transform: `translateX(-${100 + (hasMoved ? 100 / itemsInRow : 0)}%)`,
    }
  }

  return (
    <div className="relative flex px-[4%]">
      {hasMoved && <Control direction="left" handleClick={handlePrevious} />}
      <div className="whitespace-nowrap" style={contentStyle}>
        <Content
          hasMoved={hasMoved}
          itemsInRow={itemsInRow}
          lowestVisibleIndex={lowestVisibleIndex}
          movies={movies}
          totalItems={movies.length}
        />
      </div>

      <Control direction="right" handleClick={handleNext} />
    </div>
  )
}
