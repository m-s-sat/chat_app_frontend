"use client"
// import Signin from "./components/auth/Signin";

import { selectUser } from "@/lib/features/Auth/authSlice"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function IndexPage() {
  const user = useAppSelector(selectUser)
  const router = useRouter();
  useEffect(()=>{
    console.log(user)
  },[user])
  return(
  <>
  {!user && router.push('/auth/signin')}
    <div>
      this is the page
    </div>
  </>
  )
}
