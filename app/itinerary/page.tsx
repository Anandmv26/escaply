'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, DollarSign, Utensils, Bed, Lightbulb, Download } from 'lucide-react';
import Link from 'next/link';
import { TripPlan } from '@/types';

export default function ItineraryPage() {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);

  useEffect(() => {
    const storedPlan = sessionStorage.getItem('tripPlan');
    if (storedPlan) {
      setTripPlan(JSON.parse(storedPlan));
    }
  }, []);

  if (!tripPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-misty-cream via-sand to-sky-blue flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-4">No Trip Plan Found</h1>
          <p className="text-deep-slate mb-6">Please generate a trip plan first</p>
          <Link href="/plan" className="btn-primary">
            Create New Plan
          </Link>
        </div>
      </div>
    );
  }

  const downloadItinerary = () => {
    const content = `
Escaply Trip Plan
================

Destination: ${tripPlan.destination}

ITINERARY
---------
${tripPlan.plan_days.map(day => `
Day ${day.day}: ${day.title}
Morning: ${day.morning}
Afternoon: ${day.afternoon}
Evening: ${day.evening}
Estimated Budget: ₹${day.estimated_day_budget}
`).join('\n')}

ACCOMMODATION SUGGESTIONS
-------------------------
${tripPlan.accommodation_suggestions.map(acc => `
• ${acc.name} (${acc.type})
  Price Range: ${acc.price_range}
  ${acc.rating ? `Rating: ${acc.rating}/5` : ''}
`).join('\n')}

FOOD RECOMMENDATIONS
--------------------
${tripPlan.food_recommendations.map(food => `
• ${food.name}
  Cuisine: ${food.cuisine}
  Price Range: ${food.price_range}
  Must Try: ${food.must_try.join(', ')}
`).join('\n')}

BUDGET SUMMARY
--------------
Total: ₹${tripPlan.budget_summary.total}
• Stay: ₹${tripPlan.budget_summary.stay}
• Travel: ₹${tripPlan.budget_summary.travel}
• Food: ₹${tripPlan.budget_summary.food}
• Activities: ₹${tripPlan.budget_summary.activities}

TRAVEL TIPS
-----------
${tripPlan.travel_tips.map(tip => `• ${tip}`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `escaply-trip-plan-${tripPlan.destination.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-misty-cream via-sand to-sky-blue py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/plan" className="inline-flex items-center text-lagoon hover:text-teal mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Planning
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-charcoal mb-2">
                Your Trip to {tripPlan.destination}
              </h1>
              <p className="text-deep-slate">Here's your personalized itinerary</p>
            </div>
            <button
              onClick={downloadItinerary}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </motion.div>

        {/* Itinerary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Day-wise Itinerary */}
          <div className="card">
            <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-teal" />
              Day-wise Itinerary
            </h2>
            <div className="space-y-6">
              {tripPlan.plan_days.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-l-4 border-teal pl-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-charcoal">
                      Day {day.day}: {day.title}
                    </h3>
                    <span className="text-sm bg-teal text-white px-3 py-1 rounded-full">
                      ₹{day.estimated_day_budget}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-deep-slate mb-1">🌅 Morning</h4>
                      <p className="text-charcoal">{day.morning}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-deep-slate mb-1">☀️ Afternoon</h4>
                      <p className="text-charcoal">{day.afternoon}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-deep-slate mb-1">🌙 Evening</h4>
                      <p className="text-charcoal">{day.evening}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Accommodation & Food */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Accommodation */}
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <Bed className="w-6 h-6 text-teal" />
                Where to Stay
              </h2>
              <div className="space-y-4">
                {tripPlan.accommodation_suggestions.map((acc, index) => (
                  <div key={index} className="border border-sand rounded-xl p-4">
                    <h3 className="font-semibold text-charcoal mb-1">{acc.name}</h3>
                    <p className="text-sm text-deep-slate mb-2">{acc.type}</p>
                    <p className="text-sm text-teal font-medium">{acc.price_range}</p>
                    {acc.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-deep-slate">{acc.rating}/5</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Food Recommendations */}
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <Utensils className="w-6 h-6 text-teal" />
                Food & Dining
              </h2>
              <div className="space-y-4">
                {tripPlan.food_recommendations.map((food, index) => (
                  <div key={index} className="border border-sand rounded-xl p-4">
                    <h3 className="font-semibold text-charcoal mb-1">{food.name}</h3>
                    <p className="text-sm text-deep-slate mb-2">{food.cuisine}</p>
                    <p className="text-sm text-teal font-medium mb-2">{food.price_range}</p>
                    <div>
                      <p className="text-sm font-medium text-deep-slate mb-1">Must Try:</p>
                      <div className="flex flex-wrap gap-1">
                        {food.must_try.map((dish, dishIndex) => (
                          <span key={dishIndex} className="text-xs bg-lagoon text-white px-2 py-1 rounded-full">
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Budget Summary */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-teal" />
              Budget Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-deep-slate">Accommodation</span>
                    <span className="font-semibold text-charcoal">₹{tripPlan.budget_summary.stay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-deep-slate">Travel</span>
                    <span className="font-semibold text-charcoal">₹{tripPlan.budget_summary.travel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-deep-slate">Food</span>
                    <span className="font-semibold text-charcoal">₹{tripPlan.budget_summary.food}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-deep-slate">Activities</span>
                    <span className="font-semibold text-charcoal">₹{tripPlan.budget_summary.activities}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal mb-2">
                  ₹{tripPlan.budget_summary.total}
                </div>
                <p className="text-deep-slate">Total Estimated Cost</p>
              </div>
            </div>
          </motion.div>

          {/* Travel Tips */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-teal" />
              Travel Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tripPlan.travel_tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-charcoal">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/plan" className="btn-primary text-lg px-8 py-4">
            Plan Another Trip
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 