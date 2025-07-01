'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, Car } from 'lucide-react';
import Link from 'next/link';
import { TripConstraints, TripType, TravelStyle } from '@/types';
import toast from 'react-hot-toast';

export default function PlanPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TripConstraints>({
    origin: '',
    duration_days: 3,
    budget_range: '5000-10000',
    trip_type: 'chill',
    travel_month: '',
    travel_style: 'comfort'
  });

  const tripTypes: { value: TripType; label: string; icon: string }[] = [
    { value: 'chill', label: 'Chill', icon: '🌴' },
    { value: 'explore', label: 'Explore', icon: '🗺️' },
    { value: 'adventure', label: 'Adventure', icon: '🏔️' },
    { value: 'couple', label: 'Couple', icon: '💕' },
    { value: 'solo', label: 'Solo', icon: '🧳' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' }
  ];

  const travelStyles: { value: TravelStyle; label: string; description: string }[] = [
    { value: 'backpacker', label: 'Backpacker', description: 'Budget-friendly, basic amenities' },
    { value: 'comfort', label: 'Comfort', description: 'Good hotels, balanced experience' },
    { value: 'premium', label: 'Premium', description: 'Luxury stays, premium experiences' }
  ];

  const budgetRanges = [
    '2000-5000',
    '5000-10000',
    '10000-20000',
    '20000-50000',
    '50000+'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.origin || !formData.travel_month) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Store the trip plan in sessionStorage for the itinerary page
        sessionStorage.setItem('tripPlan', JSON.stringify(result.data));
        router.push('/itinerary');
      } else {
        toast.error(result.error || 'Failed to generate trip plan');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-misty-cream via-sand to-sky-blue py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center text-lagoon hover:text-teal mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-charcoal mb-2">Plan Your Trip</h1>
          <p className="text-deep-slate">Tell us your preferences and we'll create the perfect itinerary</p>
        </motion.div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Origin City */}
          <div>
            <label className="form-label flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Origin City *
            </label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              placeholder="e.g., Bangalore, Mumbai, Delhi"
              className="input-field"
              required
            />
          </div>

          {/* Trip Duration */}
          <div>
            <label className="form-label">Trip Duration (Nights) *</label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 7].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setFormData({ ...formData, duration_days: days })}
                  className={`py-3 px-4 rounded-xl border-2 transition-all ${
                    formData.duration_days === days
                      ? 'border-teal bg-teal text-white'
                      : 'border-stone bg-white text-charcoal hover:border-lagoon'
                  }`}
                >
                  {days} {days === 1 ? 'Night' : 'Nights'}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="form-label flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Budget Range *
            </label>
            <div className="grid grid-cols-1 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget_range: range })}
                  className={`py-3 px-4 rounded-xl border-2 transition-all text-left ${
                    formData.budget_range === range
                      ? 'border-teal bg-teal text-white'
                      : 'border-stone bg-white text-charcoal hover:border-lagoon'
                  }`}
                >
                  ₹{range}
                </button>
              ))}
            </div>
          </div>

          {/* Trip Type */}
          <div>
            <label className="form-label flex items-center gap-2">
              <Users className="w-4 h-4" />
              Trip Type *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tripTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, trip_type: type.value })}
                  className={`py-3 px-4 rounded-xl border-2 transition-all ${
                    formData.trip_type === type.value
                      ? 'border-teal bg-teal text-white'
                      : 'border-stone bg-white text-charcoal hover:border-lagoon'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-sm font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Month */}
          <div>
            <label className="form-label flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Travel Month *
            </label>
            <select
              value={formData.travel_month}
              onChange={(e) => setFormData({ ...formData, travel_month: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select a month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Style */}
          <div>
            <label className="form-label flex items-center gap-2">
              <Car className="w-4 h-4" />
              Travel Style
            </label>
            <div className="grid grid-cols-1 gap-3">
              {travelStyles.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, travel_style: style.value })}
                  className={`py-4 px-4 rounded-xl border-2 transition-all text-left ${
                    formData.travel_style === style.value
                      ? 'border-teal bg-teal text-white'
                      : 'border-stone bg-white text-charcoal hover:border-lagoon'
                  }`}
                >
                  <div className="font-medium">{style.label}</div>
                  <div className="text-sm opacity-80">{style.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Generating Your Trip Plan...' : 'Generate Trip Plan'}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
} 