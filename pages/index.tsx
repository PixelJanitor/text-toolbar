import Head from 'next/head'
import Image from 'next/image'
import ActionableText from '../components/ActionableText'
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [isQuote, setIsQuote] = useState(false)
  const [isReply, setIsReply] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [attachmentType, setAttachmentType] = useState('')

  const [commentText, setCommentText] = useState('')

  const placeholder = () => {
    if (isQuote) {
      return 'Reply with quote...'
    } else if (isReply) {
      return 'Reply to snippet...'
    } else {
      return 'Reply...'
    }
  }

  const handleClearAttachments = () => {
    setAttachmentType('')
    setSelectedText('')
    setIsQuote(false)
    setIsReply(false)
  }

  const handleSelection = (type: string, text: string) => {
    setAttachmentType(type)
    setSelectedText(text)
    setIsQuote(type === 'quote')
    setIsReply(type === 'reply')
  }

  useEffect(() => {
    if ((textareaRef.current && isQuote) || (textareaRef.current && isReply)) {
      textareaRef.current.focus()
    }
  }, [isQuote, isReply])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex h-full min-h-screen flex-center'>
        <div className='max-w-md space-y-10'>
          <div className='flex gap-3'>
            <div className='pt-1'>
              <div className='h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                <Image src='/images/avatars/nick.jpg' alt='Nick Holden' width={128} height={128} />
              </div>
            </div>

            <div className=''>
              <div className='flex gap-2'>
                <div className='font-semibold'>Nick Holden</div>
                <div className='pt-1.5 text-xs font-medium tracking-tight text-secondary'>4 min ago</div>
              </div>

              <ActionableText handleSelection={handleSelection}>
                <p>
                  Looks awesome! Inbox approach to notifications feels right. Love the decisions you talked through
                  around layout and URLs.
                  <br />
                  <br />
                  I also like the &quot;commented on your post&quot; description of why I&apos;m receiving a
                  notification (it&apos;s clear why I&apos;m receiving it), although I wonder if it makes sense to add
                  more context around where that action happened (kinda tricky without post titles).
                  <br />
                  <br />
                  Also curious about the timestamp: do you prefer absolute times to relative times (5 mins ago)? Are
                  seconds necessary/helpful?
                </p>
              </ActionableText>
            </div>
          </div>

          <div className='relative'>
            {isReply && (
              <div className='-mb-5 translate-x-4 pl-5'>
                <div className='relative rounded border bg-secondary px-4 pb-8 pt-3 text-sm text-secondary'>
                  <div className='absolute -inset-px bg-gradient-to-t from-white to-white/0'></div>
                  <div className='z-1'>{selectedText}</div>
                </div>
              </div>
            )}

            <div className='space-y-3'>
              <textarea
                ref={textareaRef}
                className={cn(
                  'z-1 block w-full resize-none rounded border px-3 py-2 shadow transition focus:border-blue-500 focus:shadow-input-focus focus:ring-0',
                  { 'pt-18': isQuote }
                )}
                placeholder={placeholder()}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className='flex items-center justify-between gap-2'>
                {attachmentType && (
                  <button
                    onClick={handleClearAttachments}
                    className='group relative flex h-8 items-center justify-center overflow-hidden rounded-md px-3 text-sm font-semibold shadow-sm shadow-black/20 ring-1 ring-black/[.05] transition'
                  >
                    <div className='absolute inset-0 bg-gradient-to-t from-gray-100 via-white to-white opacity-0 transition-opacity group-hover:opacity-50' />
                    <span className='z-1'>Remove {attachmentType}</span>
                  </button>
                )}
                <div>{/* Spacer for conditional */}</div>
                <button
                  className={cn(
                    'flex h-8 items-center justify-between rounded-md bg-gray-900 px-4 text-sm font-semibold text-white transition',
                    {
                      'pointer-event-none opacity-25': !commentText
                    }
                  )}
                >
                  Post
                </button>
              </div>
            </div>

            {isQuote && (
              <div className='absolute inset-x-2 top-2 z-1 rounded-sm border border-dashed border-gray-200 bg-secondary px-2 py-2 text-sm text-secondary'>
                <div className='flex gap-2'>
                  <div className='w-1 shrink-0 rounded-lg bg-gray-200'></div>
                  <div>{selectedText}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
