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
        temperature: 1.5,
      } as any);
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
  
  return `
You are a creative and resourceful travel planner for urban Indians. Your goal is to generate a unique, memorable, and practical ${duration_days}-day ${trip_type} trip from ${origin} in ${travel_month}, under ₹${budget_range}{styleText}.

Instructions:
- Choose a destination that is suitable for this trip type and budget.
- Based on the origin and destination, select a suitable mode of travel (e.g., flight, train, bus, self-drive) that fits within the budget.
- Calculate the **approximate round-trip travel cost** based on typical fares for that route and mode.
- Include **travel time and mode** in the plan (especially if it affects Day 1 or the last day).
- Deduct this cost from the overall budget and reflect it in both \`budget_summary\` and daily plans if applicable.
- For each day, create a detailed itinerary with morning, afternoon, and evening activities. Include at least one offbeat or local experience daily.
- Recommend at least two food places and two places to stay — one of which should be a hidden gem.
- Add a surprise element (quirky cafe, secret viewpoint, local event, etc.).
- Provide travel tips and avoid generic suggestions.
- Output only valid JSON in the format below. No explanations or sources.
- Generate exactly {duration_days} entries under "plan_days".

Output format:
{
  "destination": "Destination Name",
  "to_destination_travel": {
    "mode": "Train/Flight/Bus/Drive",
    "cost": 1200,
    "duration_hours": 5,
    "notes": "Sleeper train from Chennai to Coorg"
  },
  "return_travel": {
    "mode": "Train/Flight/Bus/Drive",
    "cost": 1200,
    "duration_hours": 6,
    "notes": "Evening bus from Coorg to Chennai"
  },
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
    "total": 10000,
    "stay": 4000,
    "travel": 2400,
    "food": 2000,
    "activities": 1600
  },
  "travel_tips": [
    "Tip 1",
    "Tip 2",
    "Tip 3"
  ]
}
  `;
}
