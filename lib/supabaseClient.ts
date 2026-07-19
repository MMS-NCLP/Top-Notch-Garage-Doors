import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase: SupabaseClient = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as SupabaseClient);

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  published_at: string;
};

export type Coupon = {
  id: string;
  title: string;
  description: string;
  code: string;
  expires_at: string;
  active: boolean;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  active: boolean;
};

export type Review = {
  id: string;
  name: string;
  city: string | null;
  rating: number;
  service_type: string | null;
  review_text: string;
  contractor_name: string | null;
  job_date: string | null;
  source: string;
  featured: boolean;
  created_at: string;
};

export type ReviewSubmission = {
  source: 'form';
  name: string;
  email?: string;
  city?: string;
  rating: number;
  service_type?: string;
  review_text: string;
  contractor_name?: string;
  job_date?: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) return [];
  return data ?? [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getActiveCoupons(): Promise<Coupon[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('active', true)
    .gte('expires_at', new Date().toISOString());
  if (error) return [];
  return data ?? [];
}

export async function getActivePromotions(): Promise<Promotion[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('active', true)
    .lte('starts_at', new Date().toISOString())
    .gte('ends_at', new Date().toISOString());
  if (error) return [];
  return data ?? [];
}

export async function getApprovedReviews(options?: {
  limit?: number;
  serviceType?: string;
  city?: string;
  featuredOnly?: boolean;
}): Promise<Review[]> {
  if (!supabase) return [];
  let query = supabase
    .from('reviews')
    .select('*')
    .eq('approved', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (options?.serviceType) {
    query = query.eq('service_type', options.serviceType);
  }
  if (options?.city) {
    query = query.ilike('city', `%${options.city}%`);
  }
  if (options?.featuredOnly) {
    query = query.eq('featured', true);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) return [];
  return data ?? [];
}

export async function submitReview(review: ReviewSubmission): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Service unavailable' };
  const { error } = await supabase
    .from('reviews_pending')
    .insert({
      source: review.source,
      name: review.name,
      email: review.email || null,
      city: review.city || null,
      rating: review.rating,
      service_type: review.service_type || null,
      review_text: review.review_text,
      contractor_name: review.contractor_name || null,
      job_date: review.job_date || null,
    });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
