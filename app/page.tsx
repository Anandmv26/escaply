'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Inter } from 'next/font/google'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({ subsets: ['latin'], weight: '400', display: 'swap' })

export default function LandingPage() {
  return (
    <div className="relative h-screen bg-gradient-to-b from-pastel-sky to-pastel-beach overflow-hidden flex flex-col">
      {/* Joyful SVG background: clouds, sun, birds */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Sky gradient is handled by Tailwind */}
          {/* Sun */}
          <circle cx="1200" cy="100" r="60" fill="#FFF5E1" fillOpacity="0.7" />
          {/* Clouds */}
          <ellipse cx="300" cy="120" rx="90" ry="30" fill="#fff" fillOpacity="0.7" />
          <ellipse cx="400" cy="140" rx="60" ry="20" fill="#fff" fillOpacity="0.5" />
          <ellipse cx="1100" cy="180" rx="70" ry="22" fill="#fff" fillOpacity="0.6" />
          {/* Birds */}
          <path d="M200 80 Q210 70 220 80" stroke="#B8E0D2" strokeWidth="2" fill="none" />
          <path d="M220 80 Q230 70 240 80" stroke="#B8E0D2" strokeWidth="2" fill="none" />
          {/* Mountains */}
          <path d="M0 400 Q 360 320 720 400 T 1440 400 V600 H0Z" fill="#C3E6CB" />
          {/* Greenery */}
          <ellipse cx="200" cy="500" rx="120" ry="40" fill="#B8E0D2" />
          <ellipse cx="1240" cy="520" rx="100" ry="30" fill="#B8E0D2" />
          {/* Beach */}
          <ellipse cx="720" cy="570" rx="400" ry="60" fill="#FFF5E1" />
        </svg>
      </div>
      <div className="relative flex-1 flex flex-col justify-center items-center z-10 px-2 md:px-0">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1 
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-7xl text-gradient mb-2 drop-shadow-lg ${pacifico.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ letterSpacing: '0.01em', paddingTop: '0.25em', paddingBottom: '0.5em' }}
          >
            Escaply
          </motion.h1>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal mt-6 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Plan your next trip in 10 minutes
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-deep-slate mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            You tell us your constraints. We will give you a plan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/plan" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 shadow-md hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
              Start Planning
            </Link>
          </motion.div>
        </motion.div>
        {/* Features */}
        <motion.div 
          className="w-full max-w-5xl grid md:grid-cols-3 gap-6 mt-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="card text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-pastel-green rounded-full flex items-center justify-center mb-4 shadow-md">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Smart Destination</h3>
            <p className="text-deep-slate">AI-powered suggestions based on your budget and preferences</p>
          </div>
          <div className="card text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-pastel-blue rounded-full flex items-center justify-center mb-4 shadow-md">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Quick Planning</h3>
            <p className="text-deep-slate">Get a complete itinerary in minutes, not hours</p>
          </div>
          <div className="card text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-pastel-mountain rounded-full flex items-center justify-center mb-4 shadow-md">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Personalized</h3>
            <p className="text-deep-slate">Tailored to your travel style and constraints</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 