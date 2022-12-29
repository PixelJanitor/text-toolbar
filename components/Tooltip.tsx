import * as RadixTooltip from '@radix-ui/react-tooltip'
import { m, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Props = {
  text: string
  children: React.ReactNode
}

const Tooltip: React.FC<Props> = ({ text, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={1000} onOpenChange={(open) => setIsOpen(open)}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <AnimatePresence>
          {isOpen && (
            <RadixTooltip.Portal forceMount className='z-top'>
              <RadixTooltip.Content forceMount className='z-top' sideOffset={6}>
                <m.div
                  initial={{ scale: 0.9, opacity: 0, y: 2 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.05 }
                  }}
                  exit={{ scale: 0.98, opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
                  className='rounded bg-gray-900 py-1 px-2 text-xs font-semibold tracking-tight text-white shadow-lg shadow-black/25'
                >
                  {text}
                </m.div>
              </RadixTooltip.Content>
            </RadixTooltip.Portal>
          )}
        </AnimatePresence>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip
