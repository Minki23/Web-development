"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { storeToken } from '../../api/auth';
import axios from "../../api/axios";
const LOGIN_URL = '/api/v1/auth/authenticate'


function LoginLayout(){
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLDivElement>(null)

  const [user, setUser] = useState("")
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  },[user, pwd])

  
  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    // const email = formData.get('email')
    // const password = formData.get('password')
    const email = user
    const password = pwd
    try{
      const res = await fetch('http://localhost:8090/api/v1/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: "include"
    });
    
    if (!res.ok) {
      setErrMsg("Invalid credentials")
    }
    const data = await res.json();
    console.log(data)
    storeToken(data.token);
    if(data.role == "USER")
      router.push('/home')
    else
      router.push('/home-admin')
    setUser('')
    setPwd('')
    }catch(err){
      setErrMsg("Invalid credentials")
      errRef.current?.focus()
    }
  }

  return (
    <>
      { success ? (
      <section>
        <h1>You are logged in</h1>
        <br />
        <p> 
          <a href="/profile">Go to profile</a>
        </p>
      </section>
      ) : (
    <div className="flex align-center flex-col justify-center h-[100vh]">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 w-1/4 m-auto">
        <div className="flex align-middle flex-col">
          <p ref = {errRef} className={errMsg ? "text-red-500 text-center mb-2" : "hidden"} aria-live="assertive">{errMsg}</p>
          <Label htmlFor="email" className="text-center pb-3">Email</Label>
          <Input
            name="email"
            type="email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            placeholder="example@org.pl"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>
        
        <div className="flex align-middle flex-col pt-7">
          <Label htmlFor="password" className="text-center pb-3">Hasło</Label>
          <Input
            name="password"
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            placeholder="********"
            required
          />
        </div>
        <Button type="submit" className="w-1/2 m-auto">Login</Button>
        <a className="text-right cursor-pointer" href="/register">Register now!</a>
      </form>
    </div>
      )}
    </>
  )
}
export default LoginLayout;