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
import { useState, useTransition } from 'react'
import { checkUser } from "@/app/(protected)/actions/user"
import { editStudent, fetchStudentById } from "@/app/(protected)/actions/student"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export default function UniversityStatusUpdate({ id }: { id: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()
    const [userData, setUserData] = useState<any>(null)
    const [selectedUniversity, setSelectedUniversity] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const handleOpenChange = async (open: boolean) => {
        setIsOpen(open)
        if (open) {
            try {
                const response = await fetchStudentById(id)
                if (response?.data) {
                    setUserData(response.data)
                    if (response.data.university?.length > 0) {
                        setSelectedUniversity(response.data.university[0].id)
                    }
                } else {
                    setError("Failed to load user data")
                }
            } catch (err) {
                setError("Failed to fetch user information")
                console.error(err)
            }
        } else {
            // Reset state when dialog closes
            setUserData(null)
            setSelectedUniversity("")
            setStatus("")
            setError(null)
        }
    }

    const handleStatusUpdate = () => {
        if (!selectedUniversity || !status) {
            setError("Please select both university and status")
            return
        }

        startTransition(async () => {
            try {
                const response = await editStudent(
                    {universityId:selectedUniversity,status:status},id
                )
                
                if (response.status==200) {
                    setIsOpen(false)
                    // Optionally refresh data or show success message
                } else {
                    setError(response?.error || "Update failed")
                }
            } catch (err) {
                setError("An unexpected error occurred")
                console.error(err)
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Update Status
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Update University Status</DialogTitle>
                    <DialogDescription>
                        View and update application status for this student
                    </DialogDescription>
                </DialogHeader>

                {!userData ? (
                    <div className="flex justify-center py-4">
                        {error ? (
                            <span className="text-red-500">{error}</span>
                        ) : (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {userData.university?.length > 0 ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Applied Universities</label>
                                    <Select 
                                        value={selectedUniversity} 
                                        onValueChange={setSelectedUniversity}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select university" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {userData.university.map((uni: any) => (
                                                <SelectItem key={uni.id} value={uni.id}>
                                                    {uni.name} (Current: {uni.status || "No status"})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Update Status</label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="applied">Applied</SelectItem>
                                            <SelectItem value="under_review">Under Review</SelectItem>
                                            <SelectItem value="accepted">Accepted</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                            <SelectItem value="waitlisted">Waitlisted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">No universities applied yet</p>
                        )}
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <Button 
                        variant="outline" 
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleStatusUpdate}
                        disabled={isPending || !selectedUniversity || !status}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : 'Update Status'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}