import { supabase } from '../lib/supabase';

const PREMIUM_FEATURES = [
  'pdf_export',
  'canva_integration',
  'calendar_export',
  'notion_export',
  'buffer_autopost',
  'advanced_analytics'
];

export const checkPremiumStatus = async (userId?: string): Promise<boolean> => {
  if (!userId) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error checking premium status:', error);
      return false;
    }

    return data?.is_premium || false;
  } catch (err) {
    console.error('Failed to check premium status:', err);
    return false;
  }
};

export const isPremiumFeature = (featureName: string): boolean => {
  return PREMIUM_FEATURES.includes(featureName);
};

export const getPremiumFeaturesList = (): string[] => {
  return [...PREMIUM_FEATURES];
};

export const getUserPremiumInfo = async (userId?: string) => {
  if (!userId) {
    return {
      isPremium: false,
      features: [],
      expiryDate: null
    };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_premium, premium_expires_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching premium info:', error);
      return {
        isPremium: false,
        features: [],
        expiryDate: null
      };
    }

    return {
      isPremium: data?.is_premium || false,
      features: data?.is_premium ? PREMIUM_FEATURES : [],
      expiryDate: data?.premium_expires_at || null
    };
  } catch (err) {
    console.error('Failed to fetch premium info:', err);
    return {
      isPremium: false,
      features: [],
      expiryDate: null
    };
  }
};
