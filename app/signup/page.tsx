"use client"; 
import React, { use } from 'react';
import { InputName, InputEmail, InputPassword, InputConfirmPassword } from '../../components/ui/input';

function handleSignup(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export default function SignupPage() {
  return <div>Signup Page
      <form action="" onSubmit={handleSignup}>
      <InputName value="" onChange={() => {}} />
      <InputEmail value="" onChange={() => {}} />
      <InputPassword value="" onChange={() => {}} />
      <InputConfirmPassword value="" onChange={() => {}} />
    <button className='secundary-button' type="submit">Sign Up</button>
    </form>
  </div>; 
}