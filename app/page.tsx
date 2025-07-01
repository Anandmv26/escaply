'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-misty-cream via-sand to-sky-blue">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-gradient mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Escaply
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold text-charcoal mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Plan your next trip in 10 minutes
          </motion.h2>
          
          <motion.p 
            className="text-xl text-deep-slate mb-8 max-w-2xl mx-auto"
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
            <Link href="/plan" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Start Planning
            </Link>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="card text-center">
            <div className="w-16 h-16 bg-lagoon rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Smart Destination</h3>
            <p className="text-deep-slate">AI-powered suggestions based on your budget and preferences</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Quick Planning</h3>
            <p className="text-deep-slate">Get a complete itinerary in minutes, not hours</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-soft-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Personalized</h3>
            <p className="text-deep-slate">Tailored to your travel style and constraints</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-charcoal mb-4">
              Ready to escape the ordinary?
            </h3>
            <p className="text-deep-slate mb-6">
              Join thousands of travelers who've discovered their perfect trip with Escaply
            </p>
            <Link href="/plan" className="btn-secondary">
              Create Your Trip Plan
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 