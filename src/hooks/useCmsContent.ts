import { useState, useEffect } from 'react';
import { supabaseCms, type WebsiteEvent, type MentoringPackage, type SiteContent } from '../lib/supabaseCms';

export function useEvents() {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseCms
      .from('website_events')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        setEvents(data || []);
        setLoading(false);
      });
  }, []);

  return { events, loading };
}

export function useMentoringPackages() {
  const [packages, setPackages] = useState<MentoringPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseCms
      .from('mentoring_packages')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        setPackages(data || []);
        setLoading(false);
      });
  }, []);

  return { packages, loading };
}

export function useMentoringPackage(slug: string) {
  const [pkg, setPkg] = useState<MentoringPackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseCms
      .from('mentoring_packages')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
      .then(({ data }) => {
        setPkg(data);
        setLoading(false);
      });
  }, [slug]);

  return { pkg, loading };
}

export function usePageContent(pageSlug: string) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseCms
      .from('site_content')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('is_active', true)
      .then(({ data }) => {
        const map: Record<string, string> = {};
        (data || []).forEach((item: SiteContent) => {
          map[item.section_key] = item.content;
        });
        setContent(map);
        setLoading(false);
      });
  }, [pageSlug]);

  return { content, loading, get: (key: string, fallback: string) => content[key] || fallback };
}
