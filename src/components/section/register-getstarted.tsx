"use client"

import { checkUser } from '@/app/(protected)/actions/user'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function RegisterGetstarted() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await checkUser()
        setUser(response.data)
      } catch (error) {
        console.error("Error checking user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [])

  if (loading) return null

  return (
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6 py-6">
      {!user && (
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-x-5">
          <Button className="bg-blue-800 hover:bg-blue-800/80 rounded-full px-8 py-3 text-sm sm:text-base">
            <Link href="/courseadvice" className="text-center">
              Find Me
            </Link>
          </Button>
          <Button className="bg-secondary hover:bg-secondary/80 rounded-full py-3 text-sm sm:text-base">
            <Link href="/register" className="text-center">
              Get Started
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
