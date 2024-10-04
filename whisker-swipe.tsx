'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const cats = [
  { id: 1, name: 'Whiskers', age: 3, breed: 'Siamese', image: '/placeholder.svg?height=400&width=300' },
  { id: 2, name: 'Luna', age: 2, breed: 'Persian', image: '/placeholder.svg?height=400&width=300' },
  { id: 3, name: 'Oliver', age: 4, breed: 'Maine Coon', image: '/placeholder.svg?height=400&width=300' },
  { id: 4, name: 'Milo', age: 1, breed: 'British Shorthair', image: '/placeholder.svg?height=400&width=300' },
  { id: 5, name: 'Bella', age: 5, breed: 'Sphynx', image: '/placeholder.svg?height=400&width=300' },
]

export default function WhiskerSwipe() {
  const [currentCat, setCurrentCat] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [lastSwipedRight, setLastSwipedRight] = useState<string | null>(null)

  const swipe = (direction: 'left' | 'right') => {
    setDirection(direction)
    if (direction === 'right') {
      setLastSwipedRight(cats[currentCat].name)
    }
    setTimeout(() => {
      setCurrentCat((prev) => (prev + 1) % cats.length)
      setDirection(null)
    }, 300)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-800">Whisker Swipe 😺</h1>
      <Card className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence>
            {direction === null && (
              <motion.div
                key={cats[currentCat].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={cats[currentCat].image}
                    alt={cats[currentCat].name}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h2 className="text-2xl font-bold text-white">{cats[currentCat].name}, {cats[currentCat].age}</h2>
                    <p className="text-white">{cats[currentCat].breed}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-4 space-x-4">
        <Button
          size="lg"
          variant="outline"
          className="bg-white hover:bg-red-100 text-red-500"
          onClick={() => swipe('left')}
        >
          <X className="w-6 h-6" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-white hover:bg-green-100 text-green-500"
          onClick={() => swipe('right')}
        >
          <Heart className="w-6 h-6" />
        </Button>
      </div>
      <AnimatePresence>
        {lastSwipedRight && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg"
          >
            <p className="font-bold">It's a match!</p>
            <p>You and {lastSwipedRight} liked each other</p>
            <Button variant="secondary" className="mt-2" onClick={() => setLastSwipedRight(null)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Send a meow
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
