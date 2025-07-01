import { NextRequest, NextResponse } from 'next/server';
import { TripConstraints, TripPlan } from '@/types';
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const body: TripConstraints = await request.json();
    
    // Validate required fields
    if (!body.origin || !body.duration_days || !body.budget_range || !body.trip_type || !body.travel_month) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Construct the Gemini prompt
    const prompt = constructPrompt(body);

    // Set up Gemini client
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const groundingTool = { googleSearch: {} };
    const config = { tools: [groundingTool] };

    // Call Gemini 1.5 Flash with grounding
    let geminiResponse;
    try {
      geminiResponse = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
        contents: prompt,
        config,
      });
    } catch (err: any) {
      console.error("Gemini API error:", err, JSON.stringify(err));
      return NextResponse.json(
        { success: false, error: "Failed to generate trip plan (Gemini error)", details: err?.message || String(err) },
        { status: 500 }
      );
    }

    const content = geminiResponse.text;
    if (!content) {
      throw new Error('No response from Gemini');
    }

    // Log the raw Gemini response for debugging
    console.log('Raw Gemini response:', content);

    // Parse the JSON response
    let tripPlan: TripPlan;
    try {
      // Remove Markdown code block if present
      const cleaned = content
        .replace(/```json\s*/i, '')
        .replace(/```/g, '')
        .trim();
      // Try to extract the first JSON object from the response
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON object found in Gemini response');
      }
      tripPlan = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', content);
      throw new Error('Invalid response format from Gemini');
    }

    return NextResponse.json({
      success: true,
      data: tripPlan
    });

  } catch (error) {
    console.error('Error generating trip plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate trip plan' },
      { status: 500 }
    );
  }
}

function constructPrompt(constraints: TripConstraints): string {
  const { origin, duration_days, budget_range, trip_type, travel_month, travel_style } = constraints;
  
  return `You are a travel planner for urban Indians. Create a ${duration_days}-day ${trip_type} trip from ${origin} in ${travel_month} under ₹${budget_range}${travel_style ? ` with a ${travel_style} travel style` : ''}.

Include:
- Destination suggestion (reachable and suitable for the budget and trip type)
- Day-wise itinerary (with morning, afternoon, evening slots)
- Local food and stay suggestions
- Budget breakdown per day

Output as structured JSON with this exact format:
{
  "destination": "Destination Name",
  "plan_days": [
    {
      "day": 1,
      "title": "Day Title",
      "morning": "Morning activity description",
      "afternoon": "Afternoon activity description", 
      "evening": "Evening activity description",
      "estimated_day_budget": 3000
    }
  ],
  "accommodation_suggestions": [
    {
      "name": "Hotel/Homestay Name",
      "type": "Hotel/Homestay/Resort",
      "price_range": "₹2000-3000 per night",
      "rating": 4.2
    }
  ],
  "food_recommendations": [
    {
      "name": "Restaurant Name",
      "cuisine": "Local/Continental/etc",
      "price_range": "₹300-500 per person",
      "must_try": ["Dish 1", "Dish 2"]
    }
  ],
  "budget_summary": {
    "total": 9500,
    "stay": 4000,
    "travel": 2500,
    "food": 2000,
    "activities": 1000
  },
  "travel_tips": [
    "Tip 1",
    "Tip 2"
  ]
}

Make sure the destination is reachable from ${origin} within the budget and suitable for a ${trip_type} trip. Keep all suggestions practical and budget-friendly.`;
} 