"use client";

import React, { useState, useRef, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation'
import axios from '@/api/axios';

const REGISTER_URL = '/api/v1/auth/register';

const RegisterLayout = () => {
  const router = useRouter()
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [errMsg, setErrMsg] = useState('');

  const errRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, surname, email, password, role });
    if (name === '' || surname === '' || email === '' || password === '') {
      setErrMsg('Please fill all fields');
      return;
    }
    try{
        const response = await axios.post(REGISTER_URL, {email: email, password: password, firstname: name, lastname: surname},
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(JSON.stringify(response.data))
      const accessToken = response.data.accessToken
      const roles = response.data.roles
      setName('')
      setSurname('')
      setEmail('')
      setPassword('')
      router.push('/login')
      }catch(err){
        setErrMsg("Invalid credentials")
        errRef.current?.focus()
      }
  };

  return (
    <div className="flex align-center flex-col justify-center h-[100vh]">
      <p ref={errRef} className={errMsg ? "text-red-500" : "hidden"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 w-1/4 m-auto">
        <div className="flex align-middle flex-col">
          <Label htmlFor="name" className="text-center pb-3">Name</Label>
          <Input
            name="name"
            type="text"
            id="name"
            placeholder="John"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="flex align-middle flex-col">
          <Label htmlFor="surname" className="text-center pb-3">Surname</Label>
          <Input
            name="surname"
            type="text"
            id="surname"
            placeholder="Doe"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            required
          />
        </div>

        <div className="flex align-middle flex-col">
          <Label htmlFor="email" className="text-center pb-3">Email</Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="example@org.pl"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="flex align-middle flex-col">
          <Label htmlFor="password" className="text-center pb-3">Password</Label>
          <Input
            name="password"
            type="password"
            id="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <Button type="submit" className="w-1/2 m-auto">Register</Button>
        <a href="/login" className="text-right cursor-pointer">Already have an account? Login!</a>
      </form>
    </div>
  );
};

export default RegisterLayout;
