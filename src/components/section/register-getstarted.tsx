"use client"

import { checkUser } from '@/app/(protected)/actions/user'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function RegisterGetstarted() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await checkUser()
        setUser(response.data)
      } catch (error) {
        console.error("Error checking user:", error)
        setUser(null)
      } finally {
        setLoading(false) // Set loading to false when done
      }
    }
    getUser()
  }, [])

  // Don't render buttons until loading is complete
  if (loading) return null

  return (
    <div className="grid grid-cols-2 w-1/2 mx-auto gap-x-5">
      {!user && (
        <>
          <Button className="bg-blue-800 hover:bg-blue-800/80 rounded-full">
            <Link href="/register">Register</Link>
          </Button>
          <Button className="bg-secondary hover:bg-secondary/80 px-14 md:px-0 rounded-full">
            <Link href="/register">Get Started</Link>
          </Button>
        </>
      )}
    </div>
  )
}