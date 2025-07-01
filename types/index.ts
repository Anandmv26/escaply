export interface TripConstraints {
  origin: string;
  duration_days?: number;
  budget_range?: string;
  trip_type?: TripType;
  travel_month: string;
  travel_style?: TravelStyle;
}

export type TripType = 'chill' | 'explore' | 'adventure' | 'couple' | 'solo' | 'family';
export type TravelStyle = 'backpacker' | 'comfort' | 'premium';

export interface DayPlan {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  estimated_day_budget: number;
}

export interface AccommodationSuggestion {
  name: string;
  type: string;
  price_range: string;
  rating?: number;
}

export interface FoodRecommendation {
  name: string;
  cuisine: string;
  price_range: string;
  must_try: string[];
}

export interface BudgetSummary {
  total: number;
  stay: number;
  travel: number;
  food: number;
  activities: number;
}

export interface TripPlan {
  destination: string;
  to_destination_travel: {
    mode: string;
    cost: number;
    duration_hours: number;
    notes: string;
  };
  return_travel: {
    mode: string;
    cost: number;
    duration_hours: number;
    notes: string;
  };
  plan_days: DayPlan[];
  accommodation_suggestions: AccommodationSuggestion[];
  food_recommendations: FoodRecommendation[];
  budget_summary: BudgetSummary;
  travel_tips: string[];
}

export interface ApiResponse {
  success: boolean;
  data?: TripPlan;
  error?: string;
} 