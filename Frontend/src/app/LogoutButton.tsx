"use client"
import { removeToken } from "@/api/auth"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
function LogoutButton(){
  const router = useRouter()
  const logout = () =>{
    removeToken()
    router.push("/")
  }
  return(
  <Button className="absolute top-2 left-2" onClick={logout}> Wyloguj </Button>
  )
}
export {LogoutButton}