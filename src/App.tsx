import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './Routes'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './zustand/auth.store'

function App() {
  const isLoggedIn = useAuth((state) => !!state.token);
  const profile = useAuth((state) => state.profile);

  // Check if user needs to change password
  // useEffect(() => {
  //   // COMMENT THIS OUT or REMOVE IT - it's causing a second redirect
  //   // if (isLoggedIn && profile?.onboardingStep === "CHANGE_PASSWORD") {
  //   //   window.location.href = `/change-password?email=${encodeURIComponent(profile.email || '')}`;
  //   // }
  // }, [isLoggedIn, profile]);

  return (
    <BrowserRouter>
      <Toaster />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
