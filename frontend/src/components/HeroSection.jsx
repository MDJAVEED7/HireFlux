import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const phrases = ["Starts Here", "Is Ready to Evolve"]

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    const speed = isDeleting ? 50 : 100

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? currentPhrase.substring(0, charIndex - 1)
        : currentPhrase.substring(0, charIndex + 1)

      setText(updatedText)
      setCharIndex(isDeleting ? charIndex - 1 : charIndex + 1)

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <br />
        <h1 className='text-5xl font-bold'>
          Your Future{' '}
          <span
            className='border-r-2 pr-1'
            style={{ color: '#4F9CF9', borderColor: '#FFE492' }}
          >
            {text}
          </span>
        </h1>
        <p style={{ color: '#FFFFFF' }}>
          Find jobs that match your passion, experience, and goals <br />
          let us help you turn applications into real success stories
        </p>
        <div
          className='flex w-[40%] shadow-lg pl-3 rounded-full items-center gap-4 mx-auto'
          style={{ border: '1px solid #4F9CF9' }}
        >
    <input
  type="text"
  placeholder="Find your dream jobs"
  onChange={(e) => setQuery(e.target.value)}
  className="w-full py-2 px-4 !text-black placeholder-black bg-transparent focus:outline-none"
/>

          <Button
            onClick={searchJobHandler}
            className="rounded-r-full"
            style={{ backgroundColor: '#4F9CF9' }}
          >
            <Search className='h-5 w-5 text-black' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
