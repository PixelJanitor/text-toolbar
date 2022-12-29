import Icon from '@/components/Icon'
import Tooltip from '@/components/Tooltip'
import { m, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  children: React.ReactNode
  handleSelection: (type: string, text: string) => void
}

const ActionableText: React.FC<Props> = ({ children, handleSelection }) => {
  const toolsRef = useRef<HTMLDivElement>(null)

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, width: 0 })
  const [isShowingTools, setIsShowingTools] = useState(false)
  const [selectionText, setSelectionText] = useState('')

  const handleMouseUp = () => {
    const selection = window.getSelection()

    if (selection && !selection.isCollapsed) {
      const selectionRange = selection.getRangeAt(0)
      const hightlightedText: string = selection.toString().trim()

      const { x, y, width } = selectionRange.getBoundingClientRect()

      if (!width) {
        setIsShowingTools(false)
      }
      setCoordinates({ x, y, width })
      setIsShowingTools(true)
      setSelectionText(hightlightedText)
    }
  }

  const clearSelection = () => {
    const selection = window.getSelection()

    if (selection) {
      if (selection.empty) {
        setIsShowingTools(false)
        selection.empty()
      } else if (selection.removeAllRanges) {
        setIsShowingTools(false)
        selection.removeAllRanges()
      }
    }
  }

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent | Event | PointerEvent) => {
      if (isShowingTools && toolsRef.current) {
        if (!toolsRef.current.contains(event.target as Node)) {
          setIsShowingTools(false)
        } else {
          event.preventDefault()
        }
      }
    }

    const onResize = () => {
      if (isShowingTools) {
        const selection = window.getSelection()
        const selectionRange = selection?.getRangeAt(0)
        const { x, y, width } = selectionRange!.getBoundingClientRect()
        setCoordinates({ x, y, width })
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('resize', onResize)
    }
  }, [isShowingTools])

  return (
    <span onMouseUp={handleMouseUp}>
      {children}

      <AnimatePresence>
        {isShowingTools && (
          <m.div
            initial={{ scale: 0.9, y: -8, opacity: 0 }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1
            }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{
              default: { type: 'spring', stiffness: 800, damping: 25 },
              opacity: { duration: 0.15 }
            }}
            ref={toolsRef}
            className='absolute z-top flex justify-center'
            style={{
              width: coordinates.width,
              left: coordinates.x,
              top: coordinates.y - 38
            }}
          >
            <ActionTextToolbar
              handleSelection={handleSelection}
              clearSelection={clearSelection}
              selectedText={selectionText}
            />
          </m.div>
        )}
      </AnimatePresence>
    </span>
  )
}

export default ActionableText

type ActionTextToolbarProps = {
  clearSelection: () => void
  handleSelection: (type: string, text: string) => void
  selectedText: string
}

const ActionTextToolbar: React.FC<ActionTextToolbarProps> = ({ clearSelection, selectedText, handleSelection }) => {
  const [focused, setFocused] = useState<number>(0)

  const layout = {
    duration: 0.15,
    ease: 'easeOut'
  }

  const handleReplyTo = () => {
    handleSelection('reply', selectedText)
    clearSelection()
  }

  const handleQuoteText = () => {
    handleSelection('quote', selectedText)
    clearSelection()
  }

  const handleCreateTodo = () => {
    clearSelection()
  }

  const handleCopySnippet = () => {
    toast.success('Copied to clipboard')
    clearSelection()
  }

  return (
    <div
      className='flex transform-gpu rounded-lg border bg-primary p-sm shadow-lg shadow-black/25'
      onMouseLeave={() => setFocused(0)}
    >
      <Tooltip text='Reply'>
        <button
          className='relative flex rounded p-1.5 flex-center'
          onMouseEnter={() => setFocused(1)}
          onFocus={() => setFocused(1)}
          onClick={handleReplyTo}
        >
          <div className='z-1'>
            <Icon name='comment' />
          </div>
          <AnimatePresence>
            {focused === 1 && (
              <m.div
                layoutId='highlight'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15, ease: 'linear' } }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: 'linear' } }}
                transition={{ layout }}
                className='absolute inset-0 rounded bg-gray-100'
              />
            )}
          </AnimatePresence>
        </button>
      </Tooltip>

      <Tooltip text='Quote text'>
        <button
          className='relative flex rounded p-1.5 flex-center'
          onMouseEnter={() => setFocused(2)}
          onFocus={() => setFocused(2)}
          onClick={handleQuoteText}
        >
          <div className='z-1'>
            <Icon name='quote' />
          </div>
          <AnimatePresence>
            {focused === 2 && (
              <m.div
                layoutId='highlight'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15, ease: 'linear' } }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: 'linear' } }}
                transition={{ layout }}
                className='absolute inset-0 rounded bg-gray-100'
              />
            )}
          </AnimatePresence>
        </button>
      </Tooltip>

      <Tooltip text='Create todo'>
        <button
          className='relative flex rounded p-1.5 flex-center'
          onMouseEnter={() => setFocused(3)}
          onFocus={() => setFocused(3)}
          onClick={handleCreateTodo}
        >
          <div className='z-1'>
            <Icon name='todo-list' />
          </div>
          <AnimatePresence>
            {focused === 3 && (
              <m.div
                layoutId='highlight'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15, ease: 'linear' } }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: 'linear' } }}
                transition={{ layout }}
                className='absolute inset-0 rounded bg-gray-100'
              />
            )}
          </AnimatePresence>
        </button>
      </Tooltip>

      <Tooltip text='Copy snippet'>
        <button
          className='relative flex rounded p-1.5 flex-center'
          onMouseEnter={() => setFocused(4)}
          onFocus={() => setFocused(4)}
          onClick={handleCopySnippet}
        >
          <div className='z-1'>
            <Icon name='clipboard' />
          </div>
          <AnimatePresence>
            {focused === 4 && (
              <m.div
                layoutId='highlight'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15, ease: 'linear' } }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: 'linear' } }}
                transition={{ layout }}
                className='absolute inset-0 rounded bg-gray-100'
              />
            )}
          </AnimatePresence>
        </button>
      </Tooltip>
    </div>
  )
}
