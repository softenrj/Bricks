"use client"

import { useEffect, useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { setUser } from "@/service/api.user"
import { setUserdata } from "@/store/Reducers/user"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UserProfileUpdate({ open, onOpenChange }: Props) {
    const user = useAppSelector(state => state.user)

    const [penname, setPenname] = useState("")
    const [bio, setBio] = useState("")
    const [image, setImage] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (open && user) {
            setPenname(user.penname ?? "")
            setBio(user.bio ?? "")
            setImage(user.profile ?? "")
            setFile(null)
        }
    }, [open, user])

    const hasChange = useMemo(() => {
        return (
            penname !== (user?.penname ?? "") ||
            bio !== (user?.bio ?? "") ||
            file !== null
        )
    }, [penname, bio, file, user])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (!f) return
        setFile(f)
        const url = URL.createObjectURL(f)
        setImage(url)
    }

    const handleSubmit = async () => {
        if (!hasChange) return
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("penname", penname)
            formData.append("bio", bio)
            if (file) formData.append("image", file)

            const newUser = await setUser(formData);
            if (newUser) {
                dispatch(setUserdata(newUser))
            }
            onOpenChange(false)
        } catch (err) {
            toast.error("Failed to update profile")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className=" bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl text-white p-6 flex flex-col gap-6"
            >
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                        Edit Profile
                    </DialogTitle>
                </DialogHeader>

                {/* Profile Image */}
                <div className="flex flex-col gap-3 items-center">
                    <div className="relative w-[110px] h-[110px] rounded-full border border-white/20 shadow-md">
                        <Image
                            src={image || "/placeholder.png"}
                            alt="profile"
                            fill
                            className="object-cover rounded-full"
                        />
                        {file && (
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs bg-white/80 text-black px-2 rounded-md">
                                Preview
                            </span>
                        )}
                    </div>
                    <label
                        className=" cursor-pointer text-sm px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-all border border-white/10"
                    >
                        Change Photo
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>

                {/* Pen Name */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-300">Pen Name</label>
                    <input
                        className=" bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30 transition"
                        value={penname}
                        accept="/**image"
                        onChange={(e) => setPenname(e.target.value)}
                        placeholder="Enter pen name..."
                    />
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-300">Bio</label>
                    <textarea
                        rows={4}
                        className=" bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30 transition resize-none"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell something about you..."
                    />
                </div>

                <Button
                    disabled={!hasChange || loading}
                    onClick={handleSubmit}
                    className=" w-full font-medium bg-white text-black hover:bg-white/80 transition">
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
