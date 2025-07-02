"use client"
import { selectUser } from "@/lib/features/Auth/authSlice"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Chat from "./components/chat_ui/Chat"

export default function IndexPage() {
  const user = useAppSelector(selectUser)
  const router = useRouter();
  useEffect(()=>{
    console.log(user)
  },[user])
  return(
  <>
  {!user && router.push('/auth/signin')}
  <div className="full-height">
    <Chat></Chat>
  </div>
  </>
  )
}
