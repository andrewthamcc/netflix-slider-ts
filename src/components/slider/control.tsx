import { Icon } from '@iconify/react'
import ChevronLeft from '@iconify/icons-mdi/chevron-left'
import ChevronRight from '@iconify/icons-mdi/chevron-right'
import { clsx } from 'clsx'

interface ControlProps {
  direction: 'left' | 'right'
  handleClick: () => void
}

export function Control({ direction, handleClick }: ControlProps) {
  return (
    <div
      className={clsx(
        direction === 'right' && 'right-0',
        direction === 'left' && 'left-0',
        'absolute top-0 z-10 flex h-full w-[4%] items-center justify-center text-white opacity-0 transition-opacity duration-300 hover:bg-gray-800/70 hover:opacity-100'
      )}
    >
      <button
        className="text-6xl transition-transform duration-300 hover:scale-150 active:scale-125"
        onClick={handleClick}
      >
        <Icon icon={direction === 'right' ? ChevronRight : ChevronLeft} />
      </button>
    </div>
  )
}
