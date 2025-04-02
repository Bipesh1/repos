"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { MdDeleteOutline } from "react-icons/md";
import { useState, useTransition } from 'react'
import { addedToWishlist } from "@/app/(protected)/actions/student";

export default function WishListDelete({id}:{
    id:string,
 }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const handleDelete = () => {
        startTransition(async () => {
            const values={wishlist:id}
            try {
                const response = await addedToWishlist(values)
                
                // Check if the response indicates success
                if (response?.status==200) {
                    setIsOpen(false)
                } else {
                    // If not successful, keep the dialog open and show an error
                    setError(response?.error || "Failed to remove from wishlist")
                }
            } catch (err) {
                // Handle any unexpected errors
                setError("An unexpected error occurred")
                console.error(err)
            }
        })
    }
    
    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <span className="flex text-red-500 cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <MdDeleteOutline className="text-lg"/>
                <p>Remove from wishlist</p>
            </span>
        </DialogTrigger>    
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>
            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}
            <Button 
                onClick={handleDelete} 
                disabled={isPending}
            >
                {isPending ? "Removing..." : "Yes, Remove"}
            </Button>
        </DialogContent>
    </Dialog>
    )
}