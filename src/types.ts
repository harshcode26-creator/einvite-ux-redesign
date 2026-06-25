export type BillingCycle = 'monthly' | 'yearly';

export interface PlanInfo {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: {
    monthly: number;
    yearly: number; // Price per month when paid yearly
    monthlyOriginal?: number;
    yearlyOriginal?: number; // Price per month original when paid yearly
  };
  features: string[];
  allFeaturesCount: string;
  buttonText: string;
  isPopular: boolean;
  isRecommended?: boolean;
  isOutstanding?: boolean;
  badge?: string;
  saveText?: string;
  highlightedFeaturesCount: number;
}

export interface FeatureComparison {
  name: string;
  icon: string;
  free: boolean | string;
  interactive: boolean | string;
  personal: boolean | string;
  outstanding: boolean | string;
}
