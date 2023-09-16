import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto text-center">
      
        <p>&copy; {new Date().getFullYear()} <span className="text-lg font-bold italic">PHP <span className="text-xs">Hospital</span></span></p>
        <p>We are here to serve you with our best</p>
      </div>
    </footer>
  )
}
